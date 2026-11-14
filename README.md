# capi-animation-engine

<p align="center">
  <a href="https://github.com/frederico-kluser/capi-animation-engine/actions/workflows/ci.yml"><img src="https://github.com/frederico-kluser/capi-animation-engine/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://github.com/frederico-kluser/capi-animation-engine/releases"><img src="https://img.shields.io/github/v/release/frederico-kluser/capi-animation-engine" alt="GitHub release"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg" alt="Node >= 20.0.0"></a>
</p>

> Motor vetorial React/SVG a 60 fps para o personagem Capi e Âncora, sincronizado ao relógio de áudio com instruções movement.json encriptadas (ChaCha20-ARX) e blindagem anti-engenharia-reversa.

## Instalação

```bash
npm install capi-animation-engine react react-dom
```

**Requisitos de runtime:**
- **Node.js**: `>= 20.0.0`
- **React / React DOM**: `>= 18.2.0`
- **Remotion** *(opcional, apenas para o entrypoint `capi-animation-engine/remotion`)*: `>= 4.0.0`

## Uso

### 1. Player Web ao vivo com `movement.json` encriptado e áudio embutido (`<AnchorLivePlayer>`)

O componente `<AnchorLivePlayer>` aceita diretamente tanto um objeto `EmbedTalkData` como um envelope encriptado `EncryptedMovementEnvelope` (`movement.json`). O áudio (`.m4a` AAC) já vai **embutido e cifrado dentro do próprio `movement.json`** (`audio.dataBase64`), pelo que **não é necessário passar `audioUrl` externo** (embora `audioUrl` continue aceite como sobreposição opcional). O player sincroniza poses, visemas de lip-sync, piscadas e micro-movimento ao `currentTime` do áudio a 60 fps, com suporte a estado `thinking` (idle orgânico) e modificadores visuais em tempo real:

```tsx
import { useEffect, useState } from 'react';
import { AnchorLivePlayer, type EncryptedMovementEnvelope } from 'capi-animation-engine/web';

export function CapiStage({
  movementUrl,
  audioUrl,
  thinking = false,
}: {
  movementUrl: string;
  audioUrl?: string;
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
        audioUrl={audioUrl}
        thinking={thinking}
        autoPlay
        character="capybara"
        outfit={{ preset: 'mundodev', glasses: 'mundodev-glasses', headphones: 'mundodev-headphones' }}
        background={{ kind: 'studio' }}
      />
    </div>
  );
}
```

### 2. Renderização SVG determinística frame-a-frame (`<Anchor>`)

Para controlar diretamente o personagem em qualquer frame ou estado resolvido:

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
// JSON.stringify(encryptedEnvelope) não expõe "timeline", "tracks", "pose" nem o áudio

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

Mesmo quando o `movement.json` vem assinado e encriptado, `<AnchorLivePlayer>` permite sobrepor em tempo real o personagem (`'capybara' | 'anchor' | 'donkey'`), vestuário (`outfit`) e cenário (`background`):

```tsx
<AnchorLivePlayer
  movement={encryptedMovement}
  audioUrl="/media/fala-01.m4a"
  character="capybara"
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
| `character` | `anchor` (o âncora), `capybara` (a Capi), `donkey` (o burro — as orelhas presas à cabeça desde 2026-11-03) |
| `outfit.top` | 17 roupas: `suit`, `hoodie`, `tshirt`, `polo`, `sweater`, `shirt`, `blazer`, `bomber`, `turtleneck`, `jersey`, `vest`, `cardigan`, `denimJacket`, `leatherJacket`, `flannel`, `labCoat`, `trackJacket` |
| `outfit.topColor` | 15 cores: `navy`, `black`, `grey`, `white`, `lilac`, `burgundy`, `coral`, `mustard`, `teal`, `orange`, `red`, `pink`, `camel`, `sky`, `denim` |
| `outfit.preset` | 7 visuais prontos (a cabeça e a roupa): `mundodev`, `casual`, `streamer`, `sporty`, `tech`, `scientist` (a bata de laboratório), `biker` (o casaco de cabedal) |

### 5. O que o motor desenha (o catálogo de 2026-11-03)

- **113 poses** (51 com ciclo próprio), 26 formas de luva e 13 objetos na mão, nos três personagens.
- **Digitar no portátil** — as 27 poses `laptop*` (três modelos: o portátil, o «alien» e o ThinkPad): as duas mãos digitam POR TRÁS da tampa ao ritmo de uma pessoa (≈ 116 ms por tecla, 150–250 ms entre teclas, a mão do Enter a viajar e a cabeça a acenar no Enter), o rato, o clique e ler o ecrã com os olhos nele; o ciclo dura **enquanto a pose durar** (`PoseLoop.sustain`, `PoseLoop.taps`) e o portátil entra e sai pelo colo, fechado (`PropPose.carry`), em vez de aparecer do nada.
- **Comer e mastigar** — 5 comidas (`sandwich`, `apple`, `cupcake`, `coxinha`, `popcorn`) no prato da mesa do podcast e na mão (`prop: { id, hand, bites }`): cada dentada corta a comida no instante em que a boca fecha; as bocas `bite`, `chew` (com ciclo próprio a 1,57 Hz, o maxilar a ir para o lado, os dois últimos ciclos a encolher antes de engolir) e `chewOpen`; no podcast a ação `eat` (pegar → dentada → mastigar → engolir → pousar mordida), só enquanto o lugar ouve; no modo fala `snackHold` e `snackBite`.
- **29 expressões** (16 novas: `proud`, `delighted`, `relieved`, `amazed`, `smug`, `mischievous`, `determined`, `focused`, `confused`, `nervous`, `embarrassed`, `sympathetic`, `annoyed`, `disgusted`, `bored`, `sleepy`), com a pálpebra de cima (`EyeShape.lid`), e 24 bocas (12 expressivas, 3 delas de comer, + 12 visemas).
- **A cabeça Redonda**: a cabeça do âncora tem os cantos redondos (raio 90 — a forma `rounder`, a única: `HEAD_SHAPES`, `HEAD_SHAPE_IDS`); a fita dos auscultadores segue-os. A capivara e o burro ficam com a deles.
- **A câmara com os dois** (podcast): o plano a dois na interrupção, no riso partilhado e na pergunta que passa a vez, um teto de tempo sem os dois por estilo; quem ouve olha para quem fala; o ecrã dividido nunca corta o microfone de mesa ao meio; o zoom de corte escala à volta da cara.

```tsx
import { Anchor } from 'capi-animation-engine';

// o âncora (a cabeça Redonda) a comer uma maçã já mordida, com cara de orgulho
<Anchor
  expression="proud"
  pose={{ base: 'snackBite', prop: { id: 'apple', hand: 'right', bites: 1 } }}
/>
```

### 6. Quem escolhe os gestos, a cara e a câmara: o diretor Jev (no estúdio)

Desde 2026-11-03, quando o estúdio gera uma fala ou um podcast (`$S movement`, `$S video`), quem escolhe **frase a frase** a pose, a expressão, a reação de quem ouve e a intenção de câmara é o **diretor Jev** (`typesafe/jev-1.13`, decisões tipadas pelo OpenRouter): ≈ 0,4 s por frase em vez de 30–40 s, com 95,8 % de acerto no modo fala e 90,2 % no podcast contra rótulos escritos à mão (o benchmark em `prompts/eval/director/` no estúdio). O modelo de linguagem continua a escrever as falas e a estrutura; `--director llm` volta aos prompts numa geração. O `movement.json` leva o resultado — o motor desenha-o igual, venha de quem vier.

## Documentação e Arquitetura

A documentação principal e referência de integração encontram-se neste repositório ([github.com/frederico-kluser/capi-animation-engine#readme](https://github.com/frederico-kluser/capi-animation-engine#readme)).

### Subpath Exports

| Entrypoint | Importação | Responsabilidade |
| :--- | :--- | :--- |
| `.` | `capi-animation-engine` | Motor core (`resolveAnchor`, `compileTimeline`, `sampleTimeline`), componente `<Anchor>`, catálogos (`CHARACTERS`, `POSES`, `EXPRESSIONS`, `FACTORY_SCENARIOS`) e utilitários de embed. |
| `./web` | `capi-animation-engine/web` | Players web React (`<AnchorLivePlayer>`, `<AnchorPlayer>`, `<AnchorTalkPlayer>`, `<AnchorPodcastPlayer>`, `<AnchorReviewPlayer>`), relógio de áudio a 60 fps (`useLiveClock`) e criptografia AEAD (`encryptMovementData`, `decryptMovementData`, `readEmbedData`). |
| `./remotion` | `capi-animation-engine/remotion` | Adaptadores determinísticos para composições Remotion (`<AnchorRemotion>`, `<AnchorTalk>`, `<AnchorPodcast>`, `<AnchorReview>`, `useAnchorState`). |
| `./export` | `capi-animation-engine/export` | Serialização direta para string SVG pura (`renderAnchorSvg`) sem necessidade de DOM no navegador. |
| `./node` | `capi-animation-engine/node` | Utilitários Node.js para geração de folhas de contacto SVG/HTML e inspeção de poses em disco. |

### Envelope `capi-encrypted-movement` (AEAD ChaCha20-ARX)

Os ficheiros `movement.json` produzidos para consumo no player web usam o formato autenticado `capi-encrypted-movement` (`v1`, algoritmo `chacha20-arx-v1`):
- **Confidencialidade de instruções**: a árvore completa de `timeline`, `tracks`, `cues`, `pose`, `speech` (visemas) e metadados de mídia é cifrada com stream cipher ARX de 20 rondas derivado de chave interna ofuscada + nonce aleatório de 96 bits (`iv`).
- **Integridade AEAD**: cada envelope carrega uma tag de autenticação de 128 bits (`tag`) calculada em tempo constante sobre o cabeçalho canónico, `iv` e `payload`. Qualquer modificação de 1 caractere em `payload`, `iv` ou `tag` faz `decryptMovementData` e `readEmbedData` devolverem `{ ok: false }` sem lançar exceções não tratadas.

### Motor de Renderização Blindado & Pipeline de Ofuscação

- **Determinismo a 60 fps**: cinemática inversa de braços (`solveElbow`), mistura de expressões faciais (`mixExpression`, `mixMouth`), respiração e micro-movimentos (`sampleAutoIdle`, `sampleMicroMotion`) são funções puras do tempo/frame.
- **Distribuição blindada (`dist/`)**: o pacote público distribui exclusivamente os 279 módulos `.js` ofuscados (com cofres de strings XOR/base64, control-flow mangling e remoção total de comentários) acompanhados dos 278 ficheiros de definição de tipos `.d.ts`, sem ficheiros `.ts`/`.tsx` crus nem sourcemaps (`.map`), validados continuamente por `scripts/verify-dist.mjs`.

### Skill Global para Agentes de IA (`skills/capi-engine-agent-skill`)

Este repositório inclui a skill global [`capi-engine-agent-skill`](skills/capi-engine-agent-skill/SKILL.md), registada por symlink em todas as raízes globais de skills (`~/.agents/skills`, `~/.dsh/skills`, `~/.claude/skills`, etc.), que ensina qualquer agente a instalar o motor em projetos web e a invocar localmente o estúdio para gerar tanto o `movement.json` criptografado com áudio embutido (`capi-engine.sh movement`) quanto vídeos renderizados (`capi-engine.sh video`).

## Contribuição

Contribuições seguem o fluxo GitHub Flow com Commits Convencionais e validação obrigatória de integridade da build (`npm run lint && npm test`). Consulte:
- [Guia de Contribuição (`CONTRIBUTING.md`)](CONTRIBUTING.md)
- [Código de Conduta (`CODE_OF_CONDUCT.md`)](CODE_OF_CONDUCT.md)

## Versão e estado

- **Versão atual**: `v1.0.0` ([Releases](https://github.com/frederico-kluser/capi-animation-engine/releases))
- **Estado**: `stable`
- **Política de versões suportadas e reporte de vulnerabilidades**: consulte [`SECURITY.md`](SECURITY.md) e [`CHANGELOG.md`](CHANGELOG.md).

## Licença

<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>

Distribuído sob a licença MIT. Consulte [`LICENSE`](LICENSE) para o texto legal completo.
