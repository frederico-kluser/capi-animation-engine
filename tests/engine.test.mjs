import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  EMBED_DATA_VERSION,
  EMBED_FORMAT,
  EMBED_KINDS,
} from '../dist/contracts/embed.js';
import {
  decryptMovementData,
  embedAudioInMovement,
  ENCRYPTED_MOVEMENT_ALG,
  ENCRYPTED_MOVEMENT_FORMAT,
  ENCRYPTED_MOVEMENT_VERSION,
  encryptMovementData,
  extractEmbeddedAudio,
  isEncryptedMovement,
  unwrapMovementData,
} from '../dist/core/embed/crypto.js';
import {
  embedClockText,
  embedFrameAt,
  embedFrameCount,
  readEmbedData,
  resolveEmbedAudioSrc,
  stageFit,
} from '../dist/core/embed/data.js';
import { resolveAnchor } from '../dist/core/resolve-anchor.js';
import { compileTimeline, sampleTimeline } from '../dist/core/timeline/index.js';
import { CHARACTERS, outfitFor, refusedSlots, resolveCharacter, wearsSlot } from '../dist/presets/characters.js';
import { STOCK_PERSONAS } from '../dist/presets/cast.js';
import { EXPRESSIONS, MOUTHS, POSES, POSE_LOOPS } from '../dist/presets/index.js';
import { FACTORY_SCENARIOS } from '../dist/presets/scenarios.js';
import { HEAD_SHAPES } from '../dist/presets/head-shapes.js';
import { CHARACTER_EXTRAS, CHARACTER_IDS, FACE_KIT_IDS, WEARABLE_SLOTS } from '../dist/contracts/character.js';
import { HAIR_COLOR_IDS, HAIR_IDS, TOP_IDS, TOP_COLOR_IDS, OUTFIT_PRESET_IDS } from '../dist/contracts/outfit.js';
import { FOOD_PROP_IDS } from '../dist/contracts/pose.js';
import { DIRECTOR_IDS } from '../dist/core/decide/director/ids.js';
import { THUMB_FONT } from '../dist/core/thumbs/type.js';

const ROOT_DIR = fileURLToPath(new URL('..', import.meta.url));
const DIST_DIR = join(ROOT_DIR, 'dist');
const PKG = JSON.parse(readFileSync(join(ROOT_DIR, 'package.json'), 'utf8'));

/** Os módulos de dist/ alcançáveis por imports estáticos a partir de uma entrada, e quem importa pacotes de fora. */
function importGraph(entryRel) {
  const seen = new Set();
  const external = new Map();
  const queue = [resolve(DIST_DIR, entryRel)];
  while (queue.length) {
    const file = queue.shift();
    if (seen.has(file) || !existsSync(file)) continue;
    seen.add(file);
    const src = readFileSync(file, 'utf8');
    for (const m of src.matchAll(/(?:import|export)\s*(?:[^'"]*?from\s*)?["']([^"']+)["']/g)) {
      const spec = m[1];
      if (spec.startsWith('.')) queue.push(resolve(dirname(file), spec));
      else external.set(spec, relative(DIST_DIR, file).split(sep).join('/'));
    }
  }
  return { modules: seen.size, external };
}

function walkFiles(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkFiles(full));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

function flipChar(str, index = 0) {
  const ch = str[index];
  const replacement = ch === 'A' ? 'B' : 'A';
  return str.slice(0, index) + replacement + str.slice(index + 1);
}

const SAMPLE_TALK_MOVEMENT = {
  format: EMBED_FORMAT,
  version: EMBED_DATA_VERSION,
  kind: 'talk',
  title: 'Capi Demo',
  lang: 'pt-BR',
  durationMs: 2400,
  fps: 60,
  profile: 'landscape-16x9',
  frame: { aspect: '16:9', width: 1920, height: 1080 },
  background: { kind: 'studio' },
  audio: { src: 'audio.m4a', type: 'audio/mp4', durationMs: 2400 },
  character: 'capybara',
  timeline: {
    durationMs: 2400,
    tracks: [
      {
        kind: 'pose',
        cues: [
          { atMs: 0, pose: 'neutral' },
          { atMs: 800, pose: 'explainOpen' },
        ],
      },
      {
        kind: 'expression',
        cues: [{ atMs: 0, expression: 'warm' }],
      },
      {
        kind: 'speech',
        cues: [
          { startMs: 100, endMs: 280, viseme: 'A', intensity: 0.9 },
          { startMs: 280, endMs: 480, viseme: 'O', intensity: 0.8 },
          { startMs: 480, endMs: 650, viseme: 'rest', intensity: 0 },
        ],
      },
    ],
  },
};

describe('capi-animation-engine · Encriptação AEAD ChaCha20-ARX (movement.json)', () => {
  it('faz round-trip completo com encryptMovementData, decryptMovementData e readEmbedData', () => {
    const envelope = encryptMovementData(SAMPLE_TALK_MOVEMENT);
    assert.equal(isEncryptedMovement(envelope), true);
    assert.equal(envelope.format, ENCRYPTED_MOVEMENT_FORMAT);
    assert.equal(envelope.version, ENCRYPTED_MOVEMENT_VERSION);
    assert.equal(envelope.alg, ENCRYPTED_MOVEMENT_ALG);
    assert.equal(typeof envelope.iv, 'string');
    assert.equal(typeof envelope.tag, 'string');
    assert.equal(typeof envelope.payload, 'string');

    const dec = decryptMovementData(envelope);
    assert.equal(dec.ok, true);
    assert.equal(dec.encrypted, true);
    assert.deepEqual(dec.data, SAMPLE_TALK_MOVEMENT);

    const unwrapped = unwrapMovementData(envelope);
    assert.deepEqual(unwrapped, SAMPLE_TALK_MOVEMENT);

    const checked = readEmbedData(envelope);
    assert.equal(checked.ok, true);
    assert.equal(checked.data.kind, 'talk');
    assert.equal(checked.data.character, 'capybara');
    assert.equal(checked.data.durationMs, 2400);
  });

  it('oculta totalmente instruções em texto claro no JSON serializado de movement.json', () => {
    const envelope = encryptMovementData(SAMPLE_TALK_MOVEMENT);
    const serialized = JSON.stringify(envelope);

    for (const forbiddenToken of [
      'timeline',
      'tracks',
      'pose',
      'audio.m4a',
      'explainOpen',
      'capybara',
      'landscape-16x9',
    ]) {
      assert.equal(
        serialized.includes(forbiddenToken),
        false,
        `token sensível "${forbiddenToken}" não pode aparecer em texto claro no envelope encriptado`
      );
    }
  });

  it('rejeita adulteração de 1 caractere em payload, iv ou tag sem lançar exceção', () => {
    const envelope = encryptMovementData(SAMPLE_TALK_MOVEMENT);

    const badPayload = { ...envelope, payload: flipChar(envelope.payload, 2) };
    const resPayload = decryptMovementData(badPayload);
    assert.equal(resPayload.ok, false);

    const badIv = { ...envelope, iv: flipChar(envelope.iv, 1) };
    const resIv = decryptMovementData(badIv);
    assert.equal(resIv.ok, false);

    const badTag = { ...envelope, tag: flipChar(envelope.tag, 0) };
    const resTag = decryptMovementData(badTag);
    assert.equal(resTag.ok, false);

    const embedCheck = readEmbedData(badPayload);
    assert.equal(embedCheck.ok, false);
    assert.ok(Array.isArray(embedCheck.problems) && embedCheck.problems.length > 0);
  });

  it('embute e cifra o áudio dentro do próprio movement.json encriptado (sem precisar de audio.m4a externo)', () => {
    const sampleAudioBytes = new Uint8Array([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x4d, 0x34, 0x41, 0x20]);
    const envelope = encryptMovementData(SAMPLE_TALK_MOVEMENT, {
      seedHint: 'capi-embedded-audio',
      audioBytes: sampleAudioBytes,
      audioMimeType: 'audio/mp4',
    });
    const serialized = JSON.stringify(envelope);
    assert.equal(serialized.includes('AAAAGGZ0eXBNNEEg'), false, 'base64 do áudio não pode vazar em texto claro');
    assert.equal(serialized.includes('dataBase64'), false, 'chave dataBase64 não pode vazar em texto claro');

    const extracted = extractEmbeddedAudio(envelope);
    assert.ok(extracted);
    assert.equal(extracted.dataBase64, 'AAAAGGZ0eXBNNEEg');
    assert.equal(extracted.dataUri, 'data:audio/mp4;base64,AAAAGGZ0eXBNNEEg');
    assert.deepEqual(Array.from(extracted.audioBytes), Array.from(sampleAudioBytes));

    const checked = readEmbedData(envelope);
    assert.equal(checked.ok, true);
    assert.equal(resolveEmbedAudioSrc(checked.data.audio), 'data:audio/mp4;base64,AAAAGGZ0eXBNNEEg');

    const withAudio = embedAudioInMovement(SAMPLE_TALK_MOVEMENT, sampleAudioBytes, 'audio/mp4');
    assert.equal(withAudio.audio.dataBase64, 'AAAAGGZ0eXBNNEEg');
  });

  it('o movement.json leva qualquer um dos 9 personagens (cifrado, sem o nome em claro)', () => {
    for (const character of CHARACTER_IDS) {
      const envelope = encryptMovementData({ ...SAMPLE_TALK_MOVEMENT, character }, { seedHint: `elenco-${character}` });
      assert.equal(JSON.stringify(envelope).includes(`"${character}"`), false, `"${character}" não pode ir em claro`);
      const checked = readEmbedData(envelope);
      assert.equal(checked.ok, true, `${character}: ${JSON.stringify(checked.problems ?? [])}`);
      assert.equal(checked.data.character, character);
    }
  });
});

describe('capi-animation-engine · Motor Determinístico, Presets e Timeline', () => {
  it('resolveAnchor é 100% determinístico para o mesmo input e suporta capybara/anchor', () => {
    const input = {
      character: 'capybara',
      pose: 'neutral',
      expression: 'warm',
      frame: 30,
      fps: 60,
    };
    const stateA = resolveAnchor(input);
    const stateB = resolveAnchor(input);
    assert.deepEqual(stateA, stateB);
    assert.ok(stateA.pose);
    assert.ok(stateA.face);
  });

  it('expõe catálogos completos de CHARACTERS, POSES, EXPRESSIONS e FACTORY_SCENARIOS', () => {
    assert.ok(CHARACTERS.capybara);
    assert.ok(CHARACTERS.anchor);
    assert.equal(CHARACTERS.capybara.id, 'capybara');
    assert.equal(resolveCharacter('capybara'), 'capybara');
    assert.ok(Object.keys(POSES).length > 20);
    assert.ok(Object.keys(EXPRESSIONS).length >= 5);
    assert.ok(Object.keys(MOUTHS).length >= 10);
    assert.ok(FACTORY_SCENARIOS.length > 0);
    assert.deepEqual(EMBED_KINDS, ['talk', 'podcast', 'review']);
  });

  it('o catálogo de 2026-11-03: digitar, comer, 29 expressões, 17 roupas, as formas da cabeça e o diretor', () => {
    for (const id of ['laptopType', 'laptopMouse', 'laptopThink', 'snackHold', 'snackBite']) assert.ok(POSES[id], `pose ${id}`);
    assert.equal(Object.keys(EXPRESSIONS).length, 29);
    for (const id of ['proud', 'amazed', 'mischievous', 'embarrassed', 'sleepy']) assert.ok(EXPRESSIONS[id], `expressão ${id}`);
    for (const id of ['bite', 'chew', 'chewOpen']) assert.ok(MOUTHS[id], `boca ${id}`);
    assert.ok(TOP_IDS.length >= 17, 'as 17 roupas de 2026-11-03 continuam');
    assert.ok(TOP_COLOR_IDS.length >= 15, 'as 15 cores de 2026-11-03 continuam');
    assert.ok(OUTFIT_PRESET_IDS.includes('scientist') && OUTFIT_PRESET_IDS.includes('biker'));
    assert.deepEqual([...FOOD_PROP_IDS], ['sandwich', 'apple', 'cupcake', 'coxinha', 'popcorn']);
    assert.deepEqual(Object.keys(HEAD_SHAPES), ['rounder'], 'fica só a cabeça Redonda');
    assert.equal(CHARACTERS.anchor.headShape, 'rounder', 'a cabeça do âncora é a Redonda');
    assert.deepEqual([...DIRECTOR_IDS], ['llm', 'jev']);

    // o exemplo do README (sem React: só o estado resolvido): uma maçã já mordida à boca, cara de orgulho
    const state = resolveAnchor({ expression: 'proud', pose: { base: 'snackBite', prop: { id: 'apple', hand: 'right', bites: 1 } } });
    assert.equal(state.pose.prop?.id, 'apple');
    assert.equal(state.pose.prop?.bites, 1);
    assert.deepEqual(HEAD_SHAPES.rounder, { radius: 90 }, 'os cantos de 90');
  });

  it('o catálogo de 2026-11-14: nove personagens, rostos de ave e de retrato, peças recusadas e 11 poses', () => {
    assert.deepEqual([...CHARACTER_IDS].slice(0, 9), ['anchor', 'capybara', 'donkey', 'dog', 'cat', 'parrot', 'monkey', 'lion', 'einstein'], 'os nove de 2026-11-14, pela mesma ordem');
    assert.deepEqual(Object.keys(CHARACTERS), [...CHARACTER_IDS], 'uma ficha por personagem');
    assert.deepEqual([...FACE_KIT_IDS], ['human', 'capybara', 'bird', 'portrait']);
    assert.deepEqual([...CHARACTER_EXTRAS], ['ears', 'mane']);
    assert.deepEqual([...WEARABLE_SLOTS], ['hair', 'hat', 'glasses', 'headphones', 'top']);
    assert.equal(CHARACTERS.parrot.face, 'bird', 'o papagaio tem bico');
    assert.equal(CHARACTERS.einstein.face, 'portrait', 'o Einstein é um retrato');
    assert.equal(CHARACTERS.einstein.eyes, 'pupil');
    assert.equal(CHARACTERS.einstein.humanoid, true);
    assert.ok(CHARACTERS.lion.extras.includes('mane'), 'o leão tem juba');

    // a regra das peças recusadas: o leão não usa boné (a juba); um animal não usa cabelo; os acessórios ficam
    assert.equal(typeof refusedSlots('lion').hat, 'string');
    assert.equal(wearsSlot('lion', 'hat'), false);
    assert.equal(wearsSlot('lion', 'glasses'), true);
    const warnings = [];
    assert.deepEqual(outfitFor({ hat: 'cap', glasses: 'round' }, 'lion', warnings), { hat: 'none', glasses: 'round' });
    assert.equal(warnings.length, 1, 'avisa da peça recusada');
    assert.equal(outfitFor({ hair: 'curly', glasses: 'round' }, 'capybara').hair, 'none', 'cabelo só em humanoides');
    assert.equal(outfitFor({ hair: 'curly' }, 'einstein').hair, 'curly', 'o retrato é humanoide');

    // as bases são os ids do motor; as personas (leao, gato…) são do estúdio e caem no âncora com aviso
    assert.equal(resolveCharacter('lion'), 'lion');
    const unknown = [];
    assert.equal(resolveCharacter('leao', unknown), 'anchor');
    assert.equal(unknown.length, 1);

    for (const id of ['explainOneHand', 'explainWide', 'presentBoth', 'steeple', 'sizeWide', 'pointToSelf', 'brushOff', 'fingerWag', 'tapTemple', 'pointAside', 'raiseLevel']) {
      assert.ok(POSES[id], `pose ${id}`);
    }
    assert.ok(Object.keys(POSES).length >= 124, 'as 124 poses de 2026-11-14 continuam');
    for (const id of ['brushOff', 'fingerWag', 'tapTemple']) assert.ok(POSE_LOOPS[id], `ciclo ${id}`);
    assert.ok(HAIR_IDS.includes('wild') && HAIR_COLOR_IDS.includes('white'), 'o cabelo do Einstein');

    // as 8 personas de base: uma por base desenhada (menos o retrato), com ids únicos
    assert.equal(STOCK_PERSONAS.length, 8);
    assert.equal(new Set(STOCK_PERSONAS.map((p) => p.id)).size, 8);
    for (const p of STOCK_PERSONAS) assert.ok(CHARACTER_IDS.includes(p.base), `${p.id} → ${p.base}`);

    // o estado resolvido é determinístico em todos os personagens, com as poses novas
    for (const character of CHARACTER_IDS) {
      const input = { character, pose: 'fingerWag', expression: 'mischievous', frame: 37, fps: 60 };
      assert.deepEqual(resolveAnchor(input), resolveAnchor(input), `${character} determinístico`);
    }
  });

  it('o catálogo de 2026-11-26 (v1.3.0): 14 personagens, 153 poses, 74 ciclos, 31 mãos e a Capi redesenhada', () => {
    assert.deepEqual([...CHARACTER_IDS], ['anchor', 'capybara', 'donkey', 'dog', 'cat', 'parrot', 'monkey', 'lion', 'einstein', 'torvalds', 'lovelace', 'turing', 'unclebob', 'knuth']);
    for (const id of ['torvalds', 'lovelace', 'turing', 'unclebob', 'knuth']) {
      assert.equal(CHARACTERS[id].face, 'portrait', `${id} é um retrato`);
      assert.equal(CHARACTERS[id].humanoid, true, `${id} é humanoide`);
    }
    assert.deepEqual(CHARACTERS.capybara.extras, ['ears', 'mane'], 'a Capi ganhou o topete e os tufos (juba)');
    assert.equal(Object.keys(POSES).length, 153);
    assert.equal(Object.keys(POSE_LOOPS).length, 74);
    for (const id of ['pointDown', 'pointBack', 'fingerGuns', 'comeHere', 'blahBlah', 'moneyRub', 'snapFingers', 'grabIdea', 'boom', 'countFive',
      'tada', 'whoa', 'bow', 'groove', 'drumRoll', 'rollOn', 'checkWatch', 'wipeBrow', 'lookAhead', 'chopDown', 'soSoHand', 'rubHandsUp',
      'frameShot', 'pinchPrecise', 'lowerLevel', 'moveOver', 'tableCountOne', 'tableCountTwo', 'tableCountFour', 'tableCountFive']) {
      assert.ok(POSES[id], `pose ${id}`);
    }
    assert.equal(Object.keys(EXPRESSIONS).length, 29);
    assert.equal(Object.keys(MOUTHS).length, 24);
    assert.equal(TOP_IDS.length, 18);
    assert.ok(TOP_IDS.includes('victorianDress'));
    assert.equal(TOP_COLOR_IDS.length, 16);
    assert.ok(TOP_COLOR_IDS.includes('mauve'));
    for (const id of ['sweptBack', 'victorianBraids', 'neatPart', 'sideSwept', 'baldCrown']) assert.ok(HAIR_IDS.includes(id), `cabelo ${id}`);
    for (const id of ['ash', 'deepBrown', 'ivory']) assert.ok(HAIR_COLOR_IDS.includes(id), `cor de cabelo ${id}`);
    assert.equal(STOCK_PERSONAS.length, 8);

    // a Capi do elenco (óculos redondos, blazer camelo) a dar dois gestos novos é determinística
    for (const pose of ['checkWatch', 'drumRoll', 'tada']) {
      const input = { character: 'capybara', outfit: { glasses: 'round', top: 'blazer', topColor: 'camel' }, pose, expression: 'friendly', frame: 41, fps: 60 };
      assert.deepEqual(resolveAnchor(input), resolveAnchor(input), `capybara ${pose} determinístico`);
    }
  });

  it('compila e amostra timelines a 60fps com compileTimeline e sampleTimeline', () => {
    const compiled = compileTimeline(SAMPLE_TALK_MOVEMENT.timeline);
    assert.equal(compiled.__compiled, true);
    assert.equal(compiled.durationMs, 2400);

    const sampleStart = sampleTimeline(compiled, 0);
    const sampleSpeech = sampleTimeline(compiled, 200);
    assert.equal(sampleStart.timeMs, 0);
    assert.ok(sampleSpeech.speech);
    assert.equal(sampleSpeech.speech.active, true);

    assert.equal(embedFrameCount(2400, 60), 144);
    assert.equal(embedFrameAt(1200, 2400, 60), 72);
    assert.equal(embedClockText(65000), '1:05');
    const fit = stageFit({ width: 1920, height: 1080 }, { width: 1920, height: 1080 });
    assert.deepEqual(fit, { scale: 1, x: 0, y: 0 });
  });
});

describe('capi-animation-engine · Blindagem Anti-Engenharia-Reversa (dist/)', () => {
  it('dist/ contém exatamente 445 ficheiros .js ofuscados, 444 .d.ts e zero .map/.ts/.tsx', () => {
    const files = walkFiles(DIST_DIR);
    const jsFiles = files.filter((f) => f.endsWith('.js'));
    const dtsFiles = files.filter((f) => f.endsWith('.d.ts'));
    const mapFiles = files.filter((f) => f.endsWith('.map'));
    const rawTsFiles = files.filter(
      (f) => (f.endsWith('.ts') && !f.endsWith('.d.ts')) || f.endsWith('.tsx')
    );

    assert.equal(jsFiles.length, 445, 'esperados 445 ficheiros .js em dist/');
    assert.equal(dtsFiles.length, 444, 'esperados 444 ficheiros .d.ts em dist/');
    assert.equal(mapFiles.length, 0, 'zero ficheiros .map permitidos em dist/');
    assert.equal(rawTsFiles.length, 0, 'zero ficheiros .ts/.tsx crus permitidos em dist/');

    for (const jsFile of jsFiles) {
      const code = readFileSync(jsFile, 'utf8');
      assert.ok(code.length > 0, `ficheiro vazio: ${jsFile}`);
      assert.equal(
        code.includes('sourceMappingURL'),
        false,
        `sourceMappingURL proibido em ${jsFile}`
      );
    }
  });
});

describe('capi-animation-engine · Entradas e assets do pacote', () => {
  it('./web, ./export e ./node não precisam do Remotion; só ./node usa built-ins do Node', () => {
    const web = importGraph('web.js');
    assert.equal(web.modules, 1, 'dist/web.js é um único bundle');
    assert.deepEqual([...web.external.keys()].sort(), ['react', 'react/jsx-runtime'].filter((k) => web.external.has(k)).sort());
    for (const entry of ['web.js', 'export/index.js', 'node/index.js']) {
      const { external } = importGraph(entry);
      for (const spec of external.keys()) {
        assert.equal(spec === 'remotion' || spec.startsWith('@remotion/'), false, `${entry} não pode importar ${spec} (via ${external.get(spec)})`);
      }
    }
    for (const entry of ['index.js', 'web.js', 'export/index.js']) {
      const nodeBuiltins = [...importGraph(entry).external.keys()].filter((s) => s.startsWith('node:'));
      assert.deepEqual(nodeBuiltins, [], `${entry} tem de correr no browser`);
    }
    // a entrada raiz reexporta os leitores web, e esses importam o Remotion: o README di-lo (instalar remotion para ".")
    assert.ok(importGraph('index.js').external.has('remotion'), 'se isto mudar, atualizar a secção «Requisitos» do README');
  });

  it('assets/fonts traz a letra das miniaturas (Anton, SIL OFL 1.1) exposta em ./assets/*', () => {
    const ttf = readFileSync(join(ROOT_DIR, 'assets', 'fonts', 'Anton-Regular.ttf'));
    assert.ok(ttf.length > 100_000, 'a fonte inteira');
    assert.deepEqual([...ttf.subarray(0, 4)], [0x00, 0x01, 0x00, 0x00], 'cabeçalho TrueType');
    const license = readFileSync(join(ROOT_DIR, 'assets', 'fonts', 'OFL-Anton.txt'), 'utf8');
    assert.match(license, /SIL Open Font License, Version 1\.1/);
    assert.ok(PKG.files.includes('assets'), 'package.json files inclui assets');
    assert.equal(PKG.exports['./assets/*'], './assets/*');
    assert.ok(THUMB_FONT.startsWith("'CapiThumb', Anton"), 'o @font-face que o ThumbView espera');
  });
});
