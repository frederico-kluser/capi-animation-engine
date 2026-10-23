# Integração Web Completa (`capi-animation-engine`)

## 1. Subpath Exports do Pacote

| Entrypoint | Importação | O que entrega |
| :--- | :--- | :--- |
| `.` | `capi-animation-engine` | Motor core (`resolveAnchor`, `compileTimeline`, `sampleTimeline`), `<Anchor>`, catálogos (`CHARACTERS`, `POSES`, `EXPRESSIONS`, `FACTORY_SCENARIOS`) e criptografia/embed (`encryptMovementData`, `embedAudioInMovement`, `extractEmbeddedAudio`, `decryptMovementData`, `readEmbedData`, `resolveEmbedAudioSrc`). |
| `./web` | `capi-animation-engine/web` | Players web React (`<AnchorLivePlayer>`, `<AnchorPlayer>`, `<AnchorTalkPlayer>`, `<AnchorPodcastPlayer>`, `<AnchorReviewPlayer>`), relógio a 60 fps (`useLiveClock`, `usePlayerClock`) e utilitários de `movement.json` encriptado. |
| `./remotion` | `capi-animation-engine/remotion` | Componentes Remotion (`<AnchorRemotion>`, `<AnchorTalk>`, `<AnchorPodcast>`, `<AnchorReview>`, `useAnchorState`). |
| `./export` | `capi-animation-engine/export` | Serialização pura para string SVG (`renderAnchorSvg`) sem DOM. |
| `./node` | `capi-animation-engine/node` | Utilitários Node.js para folhas de contacto SVG/HTML. |

---

## 2. Como Funciona o `movement.json` Criptografado com Áudio Embutido

Quando geras um movimento pelo terminal (`capi-engine.sh movement "A fala." --out ./movement.json`), o ficheiro produzido tem o formato autenticado `capi-encrypted-movement`:

```json
{
  "format": "capi-encrypted-movement",
  "version": 1,
  "alg": "CAPI-CHA20-ARX1",
  "iv": "<16 bytes base64>",
  "tag": "<16 bytes MAC AEAD base64>",
  "payload": "<ciphertext ChaCha20-ARX base64 contendo timeline + poses + visemas + câmara + áudio .m4a em base64>"
}
```

- **Áudio embutido no JSON**: dentro do `payload` cifrado, `audio.dataBase64` guarda os bytes do `.m4a` (AAC 96 kbps, 48 kHz) e `audio.type` guarda `"audio/mp4"`.
- **Zero ficheiros externos**: o `<AnchorLivePlayer movement={movement} />` desencripta o envelope em memória, verifica a tag MAC de 128 bits em tempo constante e monta automaticamente `src="data:audio/mp4;base64,..."` no `<audio>` de relógio.
- **Retrocompatibilidade total**: se passares `audioUrl="/caminho/audio.m4a"` explicitamente ao `<AnchorLivePlayer>`, esse URL sobrepõe o áudio embutido.

---

## 3. API de Criptografia e Áudio Embutido (`capi-animation-engine/web`)

```ts
import {
  embedAudioInMovement,
  encryptMovementData,
  extractEmbeddedAudio,
  decryptMovementData,
  readEmbedData,
  resolveEmbedAudioSrc,
} from 'capi-animation-engine/web';

// 1. Embutir bytes de áudio (.m4a) e encriptar num único passo:
const envelope = encryptMovementData(talkEmbedData, {
  seedHint: 'aula-01',
  audioBytes: mp4Uint8Array,
  audioMimeType: 'audio/mp4',
});

// 2. Ou embutir primeiro no objeto EmbedTalkData e encriptar depois:
const withAudio = embedAudioInMovement(talkEmbedData, mp4Uint8Array, 'audio/mp4');
const envelope2 = encryptMovementData(withAudio, 'aula-01');

// 3. Inspecionar/extrair o áudio embutido de um movement.json (encriptado ou não):
const audioInfo = extractEmbeddedAudio(envelope);
// -> { src, type: 'audio/mp4', bytes, dataBase64, dataUri: 'data:audio/mp4;base64,...', audioBytes: Uint8Array }

// 4. Validar e desencriptar com verificação AEAD:
const check = readEmbedData(envelope);
if (check.ok) {
  const audioSrc = resolveEmbedAudioSrc(check.data.audio); // data:audio/mp4;base64,...
}
```

---

## 4. Props Completas do `<AnchorLivePlayer>`

| Prop | Tipo | Omissão | Descrição |
| :--- | :--- | :--- | :--- |
| `movement` | `EmbedTalkData \| EncryptedMovementEnvelope \| null` | *(obrigatório)* | O `movement.json` (encriptado ou em memória); `null` deixa o Capi vivo em repouso (`idle`). |
| `audioUrl` | `string \| null \| undefined` | `undefined` | Opcional! Se omitido ou `null`, usa o áudio embutido dentro do `movement.json` (`audio.dataBase64`). |
| `thinking` | `boolean` | `false` | Quando `true`, entra na pose viva de pensamento a 30 fps (sem tocar fala). |
| `autoPlay` | `boolean` | `false` | Regra de ouro: `false` nunca chama `play()` sozinho; `true` inicia a reprodução quando há áudio. |
| `character` | `'capybara' \| 'anchor' \| 'donkey'` | o do `movement` | Troca o personagem em tempo real sobre o mesmo movimento. |
| `outfit` | `OutfitInput` | o do `movement` | Troca roupa/óculos/auscultadores/chapéu em tempo real (`{ preset: 'mundodev' }`, `{ top: 'hoodie', topColor: 'lilac' }`). |
| `background` | `EmbedBackground` | o do `movement` | `{ kind: 'transparent' }`, `{ kind: 'studio' }`, `{ kind: 'color', color: '#0f172a' }`, `{ kind: 'image', src }`. |
| `maxFps` | `number` | `60` | Limita os frames desenhados por segundo (ex.: `30` em dispositivos móveis). |
| `onPlay` / `onPause` / `onEnded` | `() => void` | — | Callbacks do ciclo de vida do áudio/animação. |
| `ref` | `Ref<AnchorPlayerHandle>` | — | Métodos imperativos: `.play()`, `.pause()`, `.toggle()`, `.seek(ms)`, `.getTimeMs()`, `.isPlaying()`. |
