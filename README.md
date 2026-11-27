# capi-animation-engine

<p align="center">
  <a href="https://github.com/frederico-kluser/capi-animation-engine/actions/workflows/ci.yml"><img src="https://github.com/frederico-kluser/capi-animation-engine/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://www.npmjs.com/package/capi-animation-engine"><img src="https://img.shields.io/npm/v/capi-animation-engine" alt="npm"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://github.com/frederico-kluser/capi-animation-engine/releases"><img src="https://img.shields.io/github/v/release/frederico-kluser/capi-animation-engine" alt="GitHub release"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg" alt="Node >= 20.0.0"></a>
</p>

> Motor vetorial React/SVG a 60 fps do Capi e do elenco — âncora, capivara, burro, cachorro, gato, papagaio, macaco, leão e o retrato do Einstein —, sincronizado ao relógio de áudio com instruções `movement.json` encriptadas (ChaCha20-ARX), o áudio embutido no próprio JSON e blindagem anti-engenharia-reversa.

## Instalação

```bash
npm install capi-animation-engine react react-dom

# só para a entrada raiz (<Anchor>, resolveAnchor, catálogos) ou para ./remotion:
npm install remotion
```

**Requisitos de runtime:**
- **Node.js**: `>= 20.0.0`
- **React / React DOM**: `>= 18.2.0`
- **Remotion** `>= 4.0.0`: **dispensável** em `capi-animation-engine/web` (o leitor, um único bundle com o Remotion trocado por um stub), `./export` e `./node`; **necessário** na entrada raiz `capi-animation-engine` (que reexporta também os leitores web, presos aos adaptadores Remotion) e em `./remotion`.

## Uso

### 1. Player Web ao vivo com `movement.json` encriptado e áudio embutido (`<AnchorLivePlayer>`)

O componente `<AnchorLivePlayer>` aceita diretamente tanto um objeto `EmbedTalkData` como um envelope encriptado `EncryptedMovementEnvelope` (`movement.json`). O áudio (`.m4a` AAC) já vai **embutido e cifrado dentro do próprio `movement.json`** (`audio.dataBase64`), pelo que **não é necessário passar `audioUrl` externo** (embora `audioUrl` continue aceite como sobreposição opcional). O player sincroniza poses, visemas de lip-sync, piscadas e micro-movimento ao `currentTime` do áudio a 60 fps, com suporte a estado `thinking` (idle orgânico) e modificadores visuais em tempo real:

```tsx
import { useEffect, useState } from 'react';
import { AnchorLivePlayer, type EncryptedMovementEnvelope } from 'capi-animation-engine/web';

export function CapiStage({
  movementUrl,
  thinking = false,
}: {
  movementUrl: string;
  thinking?: boolean;
}) {
  const [movement, setMovement] = useState<EncryptedMovementEnvelope | null>(null);

  useEffect(() => {
    fetch(movementUrl)
      .then((res) => res.json())
      .then((data) => setMovement(data));
  }, [movementUrl]);

  return (
    <div style={{ width: '100%', maxWidth: 960, aspectRatio: '16 / 9' }}>
      <AnchorLivePlayer
        movement={movement}
        thinking={thinking}
        character="lion"
        outfit={{ preset: 'mundodev' }}
        background={{ kind: 'studio' }}
      />
    </div>
  );
}
```

O som nunca arranca sozinho ao montar (`autoPlay={false}` por omissão): começa no clique de quem vê, ou com `autoPlay` depois de uma interação.

### 2. Renderização SVG determinística frame-a-frame (`<Anchor>`, `renderAnchorSvg`)

Para controlar diretamente o personagem em qualquer frame ou estado resolvido (entrada raiz — requer `remotion` instalado):

```tsx
import { Anchor, resolveAnchor } from 'capi-animation-engine';

export function CapiAvatar() {
  const state = resolveAnchor({
    character: 'capybara',
    pose: 'explainOpen',
    expression: 'warm',
    outfit: { preset: 'tech', glasses: 'round' },
    frame: 45,
    fps: 60,
  });

  return <Anchor state={state} width={480} height={480} title="Capi" />;
}
```

Sem Remotion, o mesmo desenho sai em string SVG pura (servidor, Node, testes) por `./export`:

```ts
import { renderAnchorSvg } from 'capi-animation-engine/export';

const svg = renderAnchorSvg({ character: 'einstein', pose: 'tapTemple', expression: 'focused', width: 480, height: 384 });
```

### 3. Encriptação com áudio embutido e leitura autenticada do `movement.json` (`encryptMovementData` / `embedAudioInMovement` / `readEmbedData`)

O motor protege o payload de coreografia, visemas, timeline e o próprio áudio (`.m4a` em base64) num envelope autenticado AEAD (`capi-encrypted-movement`), impedindo inspeção em texto claro ou adulteração de instruções:

```ts
import {
  embedAudioInMovement,
  encryptMovementData,
  extractEmbeddedAudio,
  decryptMovementData,
  isEncryptedMovement,
  readEmbedData,
  resolveEmbedAudioSrc,
} from 'capi-animation-engine/web';

// 1. Embutir o áudio (.m4a) e encriptar num único envelope AEAD ChaCha20-ARX
const encryptedEnvelope = encryptMovementData(talkEmbedData, {
  seedHint: 'aula-01',
  audioBytes: mp4AudioUint8Array,
  audioMimeType: 'audio/mp4',
});
console.log(isEncryptedMovement(encryptedEnvelope)); // true
// JSON.stringify(encryptedEnvelope) não expõe "timeline", "tracks", "pose", o personagem nem o áudio

// 2. Validar e desencriptar automaticamente no cliente ou servidor
const check = readEmbedData(encryptedEnvelope);
if (check.ok) {
  console.log(check.data.character, check.data.durationMs);
  console.log(resolveEmbedAudioSrc(check.data.audio)); // data:audio/mp4;base64,...
}

// 3. Extrair metadados e bytes do áudio embutido, ou verificar integridade AEAD
const audioInfo = extractEmbeddedAudio(encryptedEnvelope);
const result = decryptMovementData(encryptedEnvelope);
if (!result.ok) {
  console.error(result.problems);
}
```

### 4. Modificadores em tempo real (`character`, `outfit`, `background`)

Mesmo quando o `movement.json` vem assinado e encriptado, `<AnchorLivePlayer>` permite sobrepor em tempo real o personagem (qualquer um dos 9), o visual (`outfit`) e o cenário (`background`):

```tsx
<AnchorLivePlayer
  movement={encryptedMovement}
  character="cat"
  outfit={{
    top: 'hoodie',
    topColor: 'teal',
    glasses: 'sunglasses',
    hat: 'capBackwards',
  }}
  background={{
    kind: 'color',
    color: '#0f172a',
  }}
/>
```

| Modificador | Valores |
| :--- | :--- |
| `character` | 14 personagens — `anchor`, `capybara`, `donkey`, `dog`, `cat`, `parrot`, `monkey`, `lion`, `einstein`, `torvalds`, `lovelace`, `turing`, `unclebob`, `knuth` (ver a tabela seguinte) |
| `outfit.top` | 18 roupas (inclui `victorianDress`): `suit`, `hoodie`, `tshirt`, `polo`, `sweater`, `shirt`, `blazer`, `bomber`, `turtleneck`, `jersey`, `vest`, `cardigan`, `denimJacket`, `leatherJacket`, `flannel`, `labCoat`, `trackJacket` |
| `outfit.topColor` | 16 cores (inclui `mauve`): `navy`, `black`, `grey`, `white`, `lilac`, `burgundy`, `coral`, `mustard`, `teal`, `orange`, `red`, `pink`, `camel`, `sky`, `denim` |
| `outfit.preset` | 7 visuais prontos (a cabeça e a roupa): `mundodev`, `casual`, `streamer`, `sporty`, `tech`, `scientist` (a bata de laboratório), `biker` (o casaco de cabedal) |
| `outfit.hair` / `hairColor` | 8 cabelos (`none`, `tuft`, `spiky`, `curly`, `sidePart`, `bun`, `mundodev-flame`, `wild`) e 7 cores — **só em humanoides** (`anchor`, `einstein`) |
| `outfit.glasses` · `hat` · `headphones` | `none`, `round`, `square`, `sunglasses`, `mundodev-glasses` · `none`, `cap`, `capBackwards` · `none`, `over`, `headset`, `mundodev-headphones` |

### 5. O elenco: 14 personagens, o mesmo corpo

Todos partilham o corpo, as poses, as expressões, os visemas e as animações; muda o que se vê — o desenho do rosto, as cores, a forma da cabeça e os elementos presos a ela. O `movement.json` leva a **base** (o id abaixo); trocar de personagem não regenera nada.

| `character` | Nome | Rosto · olhos | Extras | Veste |
| :--- | :--- | :--- | :--- | :--- |
| `anchor` | Âncora (o predefinido) | `human` · olhos escuros que deslizam | — (cabeça Redonda, cantos de 90) | cabelo e todos os acessórios |
| `capybara` | Capivara | `capybara` (focinho) · ponto de luz | orelhas | acessórios sim, cabelo não |
| `donkey` | Burro (refeito em 2026-11-14) | `capybara` · ponto de luz | orelhas compridas, topete | acessórios sim, cabelo não |
| `dog` | Cachorro | `capybara` · ponto de luz | orelhas caídas | acessórios sim, cabelo não |
| `cat` | Gato | `capybara` (riscas, bigodes) · ponto de luz | orelhas em bico | acessórios sim, cabelo não |
| `parrot` | Papagaio (arara vermelha) | `bird` (bico que abre com a boca) · ponto de luz | penacho | acessórios sim, cabelo não |
| `monkey` | Macaco | `capybara` (máscara) · ponto de luz | orelhas de lado | acessórios sim, cabelo não |
| `lion` | Leão | `capybara` · ponto de luz | juba, orelhas | óculos e auscultadores sim; **cabelo e boné não** (a juba) |
| `einstein` | Einstein (retrato) | `portrait` (globo, íris, pálpebras, rugas, bigode) · pupila | — | tudo; sem cabelo no visual, o dele (`wild`, branco) |

A regra das **peças recusadas** é uma só e vale no desenho e nos avisos: pedida, uma peça que o personagem não veste fica de fora com aviso e o resto do visual mantém-se.

```ts
import { outfitFor, refusedSlots, wearsSlot, CHARACTER_IDS } from 'capi-animation-engine';

const avisos: string[] = [];
outfitFor({ hat: 'cap', glasses: 'round' }, 'lion', avisos); // { hat: 'none', glasses: 'round' }
// avisos[0]: 'o boné não serve a "lion" — "cap" ignorado: a juba não deixa usar boné (o resto do visual fica)'
wearsSlot('lion', 'glasses'); // true
refusedSlots('capybara');     // { hair: 'o cabelo só serve a personagens humanoides' }
```

No estúdio, cada base dá **personas** do elenco (nome, estilos, voz): Índice, Capi, Burro, Cachorro, Gato, Papagaio, Macaco e Leão, mais o Einstein; ao gerar, o `movement.json` sai sempre com a base delas.

### 6. O que o motor desenha (o catálogo de 2026-11-14)

- **154 poses** (75 com ciclo próprio), 31 formas de luva e 13 objetos na mão, nos catorze personagens (v1.2.0: mais 30 poses — `pointDown`, `checkWatch`, `drumRoll`, `tada`, `groove`, `wipeBrow`… — e as mãos `spread`, `beckon`, `beak`, `rub`, `snap`). **11 poses novas**: `explainOneHand`, `explainWide`, `presentBoth`, `steeple` (mãos em tenda), `sizeWide`, `pointToSelf`, `brushOff`, `fingerWag`, `tapTemple`, `pointAside`, `raiseLevel` — `brushOff`, `fingerWag` e `tapTemple` com ciclo.
- **Mãos de cinco dedos** refeitas, com a viragem da mão, braços e corpo refeitos.
- **Digitar no portátil** — as 27 poses `laptop*` (três modelos: o portátil, o «alien» e o ThinkPad): as duas mãos digitam por trás da tampa ao ritmo de uma pessoa (cada tecla ≈ 116 ms carregada, ≈ 150–176 ms entre teclas dentro da palavra, ≈ 5,8 teclas/s), o clique e ler o ecrã com os olhos nele; o ciclo dura **enquanto a pose durar** e o portátil entra e sai pelo colo. Com o portátil na mesa, **o rato está sempre à vista**.
- **Comer e mastigar** — 5 comidas (`sandwich`, `apple`, `cupcake`, `coxinha`, `popcorn`) na mesa do podcast e na mão (`prop: { id, hand, bites }`), as bocas `bite`, `chew` e `chewOpen`, a ação `eat` no podcast e `snackHold`/`snackBite` no modo fala.
- **29 expressões** (16 de 2026-11-03: `proud`, `delighted`, `relieved`, `amazed`, `smug`, `mischievous`, `determined`, `focused`, `confused`, `nervous`, `embarrassed`, `sympathetic`, `annoyed`, `disgusted`, `bored`, `sleepy`) e 24 bocas (12 expressivas + 12 visemas).
- **A câmara com os dois** (podcast): o plano a dois na interrupção, no riso partilhado e na pergunta que passa a vez; quem ouve olha para quem fala.
- **Review**: a TV fora da frente dos personagens e o foco na imagem (`placeReviewFocus`, `reviewFocusCrop`).
- **Legendas para o YouTube**: `captionsToYouTubeSrt` / `youtubeSrt` (`.srt` no formato que o YouTube lê).

```tsx
import { Anchor } from 'capi-animation-engine';

// o leão a abanar o dedo («nada disso»), com cara de maroto
<Anchor character="lion" pose="fingerWag" expression="mischievous" />
```

### 7. Quem escolhe os gestos, a cara e a câmara: o diretor Jev (no estúdio)

Desde 2026-11-03, quando o estúdio gera uma fala ou um podcast (`$S movement`, `$S video`), quem escolhe **frase a frase** a pose, a expressão, a reação de quem ouve e a intenção de câmara é o **diretor Jev** (`typesafe/jev-1.13`, decisões tipadas pelo OpenRouter): ≈ 0,4 s por frase em vez de 30–40 s, com 95,8 % de acerto no modo fala e 90,2 % no podcast contra rótulos escritos à mão. O modelo de linguagem continua a escrever as falas e a estrutura; `--director llm` volta aos prompts numa geração. O `movement.json` leva o resultado — o motor desenha-o igual, venha de quem vier.

### 8. Assets: a letra das miniaturas (`capi-animation-engine/assets/*`)

O desenho de miniaturas do estúdio (`ThumbView`, módulo interno em `capi-animation-engine/render/ThumbView`) usa a **Anton** com o nome CSS `'CapiThumb'` (pilha de reserva: Anton, Impact, Arial Black…). O pacote traz o ficheiro e a licença em `assets/fonts/`:

```ts
// no browser (Vite): o URL do ficheiro do pacote
import antonUrl from 'capi-animation-engine/assets/fonts/Anton-Regular.ttf?url';

document.fonts.add(await new FontFace('CapiThumb', `url(${antonUrl})`).load());
```

```ts
// em Node (render sem rede): embutir como @font-face
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const ttf = createRequire(import.meta.url).resolve('capi-animation-engine/assets/fonts/Anton-Regular.ttf');
const fontFace = `@font-face{font-family:'CapiThumb';src:url(data:font/ttf;base64,${readFileSync(ttf).toString('base64')}) format('truetype')}`;
```

A Anton é distribuída sob a **SIL Open Font License 1.1** ([`assets/fonts/OFL-Anton.txt`](assets/fonts/OFL-Anton.txt)); o resto do pacote é MIT.

## Documentação e Arquitetura

A documentação principal e referência de integração encontram-se neste repositório ([github.com/frederico-kluser/capi-animation-engine#readme](https://github.com/frederico-kluser/capi-animation-engine#readme)).

### Subpath Exports

| Entrypoint | Importação | Responsabilidade |
| :--- | :--- | :--- |
| `.` | `capi-animation-engine` | Motor core (`resolveAnchor`, `compileTimeline`, `sampleTimeline`), componente `<Anchor>`, catálogos (`CHARACTERS`, `CHARACTER_IDS`, `POSES`, `EXPRESSIONS`, `FACTORY_SCENARIOS`), a regra das peças recusadas (`outfitFor`, `refusedSlots`, `wearsSlot`), legendas, review e utilitários de embed. Requer `remotion`. |
| `./web` | `capi-animation-engine/web` | Players web React (`<AnchorLivePlayer>`, `<AnchorPlayer>`, `<AnchorTalkPlayer>`, `<AnchorPodcastPlayer>`, `<AnchorReviewPlayer>`), relógio de áudio a 60 fps (`useLiveClock`) e criptografia AEAD (`encryptMovementData`, `decryptMovementData`, `readEmbedData`). Bundle único, sem Remotion. |
| `./remotion` | `capi-animation-engine/remotion` | Adaptadores determinísticos para composições Remotion (`<AnchorRemotion>`, `<AnchorTalk>`, `<AnchorPodcast>`, `<AnchorReview>`, `useAnchorState`). |
| `./export` | `capi-animation-engine/export` | Serialização direta para string SVG pura (`renderAnchorSvg`) sem DOM e sem Remotion. |
| `./node` | `capi-animation-engine/node` | Utilitários Node.js para geração de folhas de contacto SVG/HTML e inspeção de poses em disco. |
| `./assets/*` | `capi-animation-engine/assets/fonts/Anton-Regular.ttf` | Ficheiros estáticos (hoje: a letra das miniaturas e a sua licença OFL). |

Os caminhos profundos `capi-animation-engine/<módulo>` (o `./*` do `exports`, com tipos) abrem os módulos internos — por exemplo `core/thumbs`, `core/youtube`, `core/cta`, `presets/cast` — para usos avançados; a API estável é a das entradas acima, e os módulos internos podem mudar em versões MINOR.

### Envelope `capi-encrypted-movement` (AEAD ChaCha20-ARX)

Os ficheiros `movement.json` produzidos para consumo no player web usam o formato autenticado `capi-encrypted-movement` (`v1`, algoritmo `CAPI-CHA20-ARX1`):
- **Confidencialidade de instruções**: a árvore completa de `timeline`, `tracks`, `cues`, `pose`, `speech` (visemas), o personagem, o áudio e os metadados de mídia é cifrada com stream cipher ARX de 20 rondas derivado de chave interna ofuscada + nonce aleatório de 96 bits (`iv`).
- **Integridade AEAD**: cada envelope carrega uma tag de autenticação de 128 bits (`tag`) calculada em tempo constante sobre o cabeçalho canónico, `iv` e `payload`. Qualquer modificação de 1 caractere em `payload`, `iv` ou `tag` faz `decryptMovementData` e `readEmbedData` devolverem `{ ok: false }` sem lançar exceções não tratadas.
- **Compatível para trás**: o formato não mudou desde a `v1.0.0` (`anchor-embed` v1 dentro do envelope v1); um `movement.json` da `v1.0.0` (com o áudio à parte, em `audio.src`) lê-se igual, e um novo pode trazer qualquer um dos 9 personagens e o áudio embutido.

### Motor de Renderização Blindado & Pipeline de Ofuscação

- **Determinismo a 60 fps**: cinemática inversa de braços (`solveElbow`), mistura de expressões faciais (`mixExpression`, `mixMouth`), respiração e micro-movimentos (`sampleAutoIdle`, `sampleMicroMotion`) são funções puras do tempo/frame; o próprio build é determinístico (recompilar o mesmo estúdio dá os mesmos bytes).
- **Distribuição blindada (`dist/`)**: o pacote público distribui exclusivamente os 425 módulos `.js` ofuscados (com cofres de strings XOR/base64, control-flow mangling e remoção total de comentários) acompanhados dos 352 ficheiros de definição de tipos `.d.ts`, sem ficheiros `.ts`/`.tsx` crus nem sourcemaps (`.map`), validados continuamente por `scripts/verify-dist.mjs` e por `tests/engine.test.mjs`.

### Skill Global para Agentes de IA (`skills/capi-engine-agent-skill`)

Este repositório inclui a skill global [`capi-engine-agent-skill`](skills/capi-engine-agent-skill/SKILL.md), registada por symlink nas raízes globais de skills (`~/.agents/skills`, `~/.claude/skills`, etc.), que ensina qualquer agente a instalar o motor em projetos web e a invocar localmente o estúdio para gerar tanto o `movement.json` criptografado com áudio embutido (`capi-engine.sh movement`) quanto vídeos renderizados (`capi-engine.sh video`), e a refazer este pacote a partir do estúdio (`capi-engine.sh build-engine`).

## Contribuição

Contribuições seguem o fluxo GitHub Flow com Commits Convencionais e validação obrigatória de integridade da build (`npm run lint && npm test`). Consulte:
- [Guia de Contribuição (`CONTRIBUTING.md`)](CONTRIBUTING.md)
- [Código de Conduta (`CODE_OF_CONDUCT.md`)](CODE_OF_CONDUCT.md)

## Versão e estado

- **Versão atual**: `v1.2.0` ([Releases](https://github.com/frederico-kluser/capi-animation-engine/releases) · [npm](https://www.npmjs.com/package/capi-animation-engine))
- **Estado**: `stable`
- **Política de versões suportadas e reporte de vulnerabilidades**: consulte [`SECURITY.md`](SECURITY.md) e [`CHANGELOG.md`](CHANGELOG.md).

## Licença

<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>

Distribuído sob a licença MIT. Consulte [`LICENSE`](LICENSE) para o texto legal completo. A letra Anton em `assets/fonts/` segue a SIL Open Font License 1.1.
