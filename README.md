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
- **Distribuição blindada (`dist/`)**: o pacote público distribui exclusivamente os 269 módulos `.js` ofuscados (com cofres de strings XOR/base64, control-flow mangling e remoção total de comentários) acompanhados dos 268 ficheiros de definição de tipos `.d.ts`, sem ficheiros `.ts`/`.tsx` crus nem sourcemaps (`.map`), validados continuamente por `scripts/verify-dist.mjs`.

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
