import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  EMBED_DATA_VERSION,
  EMBED_FORMAT,
  EMBED_KINDS,
} from '../dist/contracts/embed.js';
import {
  decryptMovementData,
  ENCRYPTED_MOVEMENT_ALG,
  ENCRYPTED_MOVEMENT_FORMAT,
  ENCRYPTED_MOVEMENT_VERSION,
  encryptMovementData,
  isEncryptedMovement,
  unwrapMovementData,
} from '../dist/core/embed/crypto.js';
import {
  embedClockText,
  embedFrameAt,
  embedFrameCount,
  readEmbedData,
  stageFit,
} from '../dist/core/embed/data.js';
import { resolveAnchor } from '../dist/core/resolve-anchor.js';
import { compileTimeline, sampleTimeline } from '../dist/core/timeline/index.js';
import { CHARACTERS, resolveCharacter } from '../dist/presets/characters.js';
import { EXPRESSIONS, MOUTHS, POSES } from '../dist/presets/index.js';
import { FACTORY_SCENARIOS } from '../dist/presets/scenarios.js';

const ROOT_DIR = fileURLToPath(new URL('..', import.meta.url));
const DIST_DIR = join(ROOT_DIR, 'dist');

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
  it('dist/ contém exatamente 269 ficheiros .js ofuscados, 268 .d.ts e zero .map/.ts/.tsx', () => {
    const files = walkFiles(DIST_DIR);
    const jsFiles = files.filter((f) => f.endsWith('.js'));
    const dtsFiles = files.filter((f) => f.endsWith('.d.ts'));
    const mapFiles = files.filter((f) => f.endsWith('.map'));
    const rawTsFiles = files.filter(
      (f) => (f.endsWith('.ts') && !f.endsWith('.d.ts')) || f.endsWith('.tsx')
    );

    assert.equal(jsFiles.length, 269, 'esperados 269 ficheiros .js em dist/');
    assert.equal(dtsFiles.length, 268, 'esperados 268 ficheiros .d.ts em dist/');
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
