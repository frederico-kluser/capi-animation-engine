---
name: capi-engine-agent-skill
version: "1.0.0"
description: >-
  Skill ÚNICA e GLOBAL do motor capi-animation-engine: instala e configura o motor vetorial
  React/SVG a 60 fps em qualquer projeto web (<AnchorLivePlayer>, <Anchor>, <AnchorPlayer>,
  Remotion) e chama LOCALMENTE o estúdio (animated-chaneel / capi-animation-studio) pelo
  terminal com TODAS as opções, vozes, tons, roupas, cenários e prompts para gerar tanto o
  BRUTO EM JSON CRIPTOGRAFADO (movement.json AEAD ChaCha20-ARX com o ÁUDIO .m4a EMBUTIDO dentro
  do próprio JSON criptografado, sem precisar de HTML pré-renderizado nem de ficheiro de áudio
  externo) quanto vídeos renderizados (.mp4/.webm/.mov) ou vistas seladas. Use SEMPRE que o
  pedido mencionar instalar/configurar o motor do Capi num site/app web, AnchorLivePlayer,
  capi-animation-engine, movement.json criptografado com áudio embutido, ou criar vídeos/falas/podcasts
  do Capi/âncora via terminal.
---

# capi-engine-agent-skill — Instalar o motor Capi em projetos web e gerar animações/vídeos pelo terminal

Esta é a **única skill** necessária para:
1. **Instalar e configurar o motor `capi-animation-engine`** em qualquer projeto web (React, Next.js, Vite, Electron, Remotion).
2. **Gerar animações e vídeos do Capi / Âncora pelo terminal** chamando localmente o estúdio (`/home/ondokai/Projects/animated-chaneel`) com **todas as opções, vozes, tons, cenários e prompts** — podendo sair como:
   - **O bruto em JSON criptografado (`movement.json`) com o ÁUDIO EMBUTIDO dentro do JSON** (`capi-encrypted-movement`, ChaCha20-ARX + MAC AEAD de 128 bits): **não é um HTML pré-renderizado nem precisa de `audio.m4a` separado** — é um único JSON criptografado que o `<AnchorLivePlayer movement={movement} />` do `capi-animation-engine` desenha em SVG a 60 fps sincronizado ao áudio que já vem embutido e cifrado lá dentro;
   - **O vídeo renderizado (`.mp4`, `.webm`, `.mov`)**;
   - **A vista selada (`anchor-view.js`)** quando for pedido um bundle isolado.

## 1. Contrato do CLI da Skill (funciona de qualquer pasta)

```bash
S=~/.agents/skills/capi-engine-agent-skill/scripts/capi-engine.sh
```

| Comando | O que faz | Gasta API? |
| :--- | :--- | :--- |
| `$S where` | Verifica o motor (`capi-animation-engine`), o estúdio local (`animated-chaneel`), Node 20+, dependências, `ffmpeg`, Chrome e `OPENROUTER_API_KEY`. | Não |
| `$S install [pasta-projeto]` | Instala `capi-animation-engine` num projeto web (via pacote local ou npm), confere `react`/`react-dom` e imprime o componente `<AnchorLivePlayer>` pronto a colar. | Não |
| `$S movement "A fala." --out ./movement.json [opções]` | **Padrão para o motor web**: gera a fala (voz + alinhamento acústico + coreografia LLM) e exporta o **`movement.json` encriptado (ChaCha20-ARX) com o áudio `.m4a` EMBUTIDO no JSON**. | Sim (salvo `--no-llm --fake-tts` ou `--from`) |
| `$S movement --script roteiro.json --out ./movement.json [opções]` | Gera um episódio de **podcast** e exporta o `movement.json` encriptado com o áudio misturado embutido no JSON. | Sim |
| `$S movement --from out/talk/<execução> --out ./movement.json [opções]` | Re-exporta uma execução já existente para `movement.json` encriptado com áudio embutido (permite trocar `--character`, `--outfit`, `--scenario`, `--short` a custo zero). | **Não** |
| `$S video "A fala." --out ./video.mp4 [opções]` | Gera e renderiza o **vídeo bruto (`.mp4` / `.webm` / `.mov`)** pelo estúdio local (também aceita `--script <roteiro.json>`, `--video <review.mp4>` ou `--from <execução>`). | Sim (no `--from`, só renderiza) |
| `$S view "A fala." --out ./pasta-vista [opções]` | Gera a vista selada (`anchor-view.js`) e valida com `$S check <pasta-vista>`. | Sim |
| `$S build-engine` | Compila `packages/anchor` no estúdio, ofusca os 279 módulos JS (AST scramble + Terser), sincroniza para `/home/ondokai/Projects/capi-animation-engine/dist/` e roda `lint` + `test`. | Não |
| `$S list` | Lista todas as execuções prontas em `out/talk`, `out/podcast` e `out/review`. | Não |
| `$S voices` · `tones` · `outfits` · `scenarios` · `characters` · `profiles` · `models` | Lista todas as opções disponíveis no estúdio. | Não |
| `$S help` | Mostra a ajuda completa com todas as flags de geração, voz, corpo, câmara e exportação. | Não |

Para abrir o **estúdio** (o playground com todas as APIs: Fala, Podcast, Review, Criar, Vozes, Cenários) nesta máquina: `npm --prefix <pasta do estúdio> start` — termina quem já estiver na porta 5180, arranca, confere cada API e abre o browser (`-- --port <n>`, `-- --no-open`).

Em todos os comandos de geração:
- `--dry-run`: calcula o plano, duração estimada e custo sem gastar API nem escrever ficheiros.
- `--no-llm --fake-tts`: ensaia o pipeline inteiro 100% offline e a custo zero (voz sintética + coreografia de reserva).
- `--json`: emite uma linha JSON final no `stdout` (`{"type":"result",...}`) com o caminho exato gerado, bytes, duração e metadados.

---

## 2. Instalar e Configurar o Motor num Projeto Web (`capi-animation-engine`)

### Passo 1 — Instalar o pacote no projeto web

```bash
# Pelo script da skill (instala a partir do repo local /home/ondokai/Projects/capi-animation-engine ou registry):
~/.agents/skills/capi-engine-agent-skill/scripts/capi-engine.sh install .

# Ou diretamente com npm:
npm install /home/ondokai/Projects/capi-animation-engine react react-dom
```

### Passo 2 — Renderizar o JSON criptografado com áudio embutido (`<AnchorLivePlayer>`)

O `movement.json` gerado por `$S movement` já traz **a coreografia (poses, expressões, olhar, câmara, legendas, visemas) E o áudio `.m4a` (AAC) embutidos e cifrados dentro do mesmo `payload` ChaCha20-ARX**. Não é preciso passar `audioUrl` externo (embora `audioUrl` continue aceite se quiser sobrepor o som):

```tsx
import { useEffect, useState } from 'react';
import { AnchorLivePlayer, type EncryptedMovementEnvelope } from 'capi-animation-engine/web';

export function CapiStage({
  movementUrl = '/capi/movement.json',
  thinking = false,
}: {
  movementUrl?: string;
  thinking?: boolean;
}) {
  const [movement, setMovement] = useState<EncryptedMovementEnvelope | null>(null);

  useEffect(() => {
    fetch(movementUrl)
      .then((res) => res.json())
      .then((data: EncryptedMovementEnvelope) => setMovement(data));
  }, [movementUrl]);

  return (
    <div style={{ width: '100%', maxWidth: 960, aspectRatio: '16 / 9' }}>
      <AnchorLivePlayer
        movement={movement}
        thinking={thinking}
        character="capybara"
        outfit={{ preset: 'mundodev' }}
        background={{ kind: 'transparent' }}
      />
    </div>
  );
}
```

- **Sem `audioUrl` necessário**: `<AnchorLivePlayer movement={movement} />` desencripta o `movement.json` em memória, extrai o áudio embutido (`audio.dataBase64` → `data:audio/mp4;base64,...`) e usa-o como relógio a 60 fps.
- **Regra de ouro do áudio**: por omissão (`autoPlay={false}`), o player nunca toca sozinho ao montar — começa no clique do utilizador (ou com `autoPlay={true}` explícito após interação).
- **Modificadores em tempo real**: `character` (`'capybara' | 'anchor' | 'donkey'`), `outfit` (`{ preset: 'mundodev' }` ou `{ top, topColor, glasses, headphones, hat, hair }`) e `background` (`{ kind: 'transparent' | 'studio' | 'color' | 'image' }`) aplicam-se na hora sobre o mesmo `movement.json` sem regenerar nada.
- **Modo vivo sem fala (`thinking` / `idle`)**: quando `thinking={true}` ou `movement={null}`, o Capi respira, pisca os olhos e move-se organicamente a 30 fps sem `<audio>`.

Mais detalhes de API (`encryptMovementData`, `embedAudioInMovement`, `extractEmbeddedAudio`, `<Anchor>`, `<AnchorPlayer>`, Remotion): lê [`references/web-integration.md`](references/web-integration.md).

---

## 3. Gerar `movement.json` (com áudio embutido) ou Vídeo `.mp4` pelo Terminal

### A. Gerar o bruto para o motor web (`movement.json` criptografado + áudio embutido)

```bash
S=~/.agents/skills/capi-engine-agent-skill/scripts/capi-engine.sh

# 1. Verificar ambiente
$S where

# 2. Gerar movement.json encriptado (ChaCha20-ARX) com o áudio .m4a EMBUTIDO dentro do JSON
$S movement "Fala, pessoal! Hoje vamos aprender como o motor vetorial do Capi funciona a 60 fps." \
  --character capybara \
  --outfit mundodev \
  --tone animado \
  --bg transparent \
  --out ./public/capi/aula-01.movement.json \
  --json

# 3. Ensaiar sem custo (sem LLM e com voz sintética) antes de gastar API
$S movement "Texto de teste rápido." \
  --character capybara --no-llm --fake-tts \
  --out ./public/capi/teste.movement.json --json

# 4. Re-exportar de uma execução já existente em out/talk/<nome> (custo zero!)
$S movement --from out/talk/<execução> --character capybara --short --out ./public/capi/short.movement.json --json
```

### B. Gerar o vídeo renderizado (`.mp4` / `.webm` / `.mov`)

```bash
# Do texto direto para vídeo MP4 renderizado:
$S video "Olá! Este vídeo foi gerado e renderizado pelo terminal." \
  --character capybara --outfit mundodev --tone animado --scenario studio-night \
  --out ./out-video.mp4

# De uma execução já pronta em out/talk/<nome> para MP4 (sem pagar voz/LLM de novo):
$S video --from out/talk/<execução> --format mp4 --out ./out-video.mp4
```

### C. Todas as Opções e Prompts Disponíveis

| Categoria | Flags principais | Como listar valores |
| :--- | :--- | :--- |
| **Entrada** | `"<fala>"` · `--text-file <txt>` · `--audio <voz.m4a>` (+ `--transcript "..."`) · `--script <podcast.json>` · `--from <execução>` | `$S list` |
| **Personagem** | `--character capybara\|anchor\|donkey` | `$S characters` |
| **Voz e Tom** | `--voice <id>` · `--tone animado\|amigavel\|serio\|calmo\|urgente…` · `--emotion on\|off` · `--vary-voice` · `--tts-model <id>` | `$S voices` · `$S tones` · `$S models` |
| **Prompts de Corpo/Câmara** | `--body "<instruções para o planeador de gestos>"` · `--plan <plan.json>` · `--samples <n>` · `--seed <n>` · `--no-camera` | `$S help` |
| **Quem escolhe gestos, cara e câmara** | `--director jev` (a omissão desde 2026-11-03: o Jev decide frase a frase, ≈ 0,4 s por frase) · `--director llm` (os prompts do modelo) | `$S help` |
| **Visual (Outfit)** | `--outfit mundodev\|casual\|streamer\|sporty\|tech\|scientist\|biker\|none` · `--top <roupa>` (17: `suit`, `hoodie`, `tshirt`, `polo`, `sweater`, `shirt`, `blazer`, `bomber`, `turtleneck`, `jersey`, `vest`, `cardigan`, `denimJacket`, `leatherJacket`, `flannel`, `labCoat`, `trackJacket`) · `--top-color <cor>` (15) · `--glasses <id>` · `--headphones <id>` · `--hat <id>` · `--hair <id>` | `$S outfits` |
| **Fundo e Cenário** | `--bg transparent\|studio\|chroma\|<imagem\|vídeo>` · `--bg-color #hex` · `--scenario <id\|none>` | `$S scenarios` |
| **Formato e Legendas** | `--profile video\|short` (`--short` = 9:16 vertical) · `--aspect 16:9\|9:16\|1:1\|4:5` · `--captions auto\|lines\|karaoke\|off` · `--fps <n>` | `$S profiles` |
| **Controlo e Custo** | `--dry-run` · `--no-llm` · `--fake-tts` · `--json` · `--force` | — |

Guia completo de todas as flags e prompts: [`references/cli-options.md`](references/cli-options.md).

---

## 4. O que há de novo no motor (2026-11-03)

- **Digitar no portátil**: as 27 poses `laptop*` digitam com as duas mãos por trás da tampa, ao ritmo de uma pessoa, enquanto a pose durar; o portátil entra e sai pelo colo.
- **Comer e mastigar**: 5 comidas (`sandwich`, `apple`, `cupcake`, `coxinha`, `popcorn`) com dentadas, as bocas `bite`/`chew`/`chewOpen` e a ação `eat` no podcast (a comida do lugar no roteiro: `food: { "kind": "apple", "slot": "outer", "bites": 0 }`, como a bebida); no modo fala as poses `snackHold`/`snackBite`.
- **29 expressões** (16 novas, de `proud` a `sleepy`), **17 roupas**, **15 cores** e os visuais `scientist` e `biker`.
- **O burro** com as orelhas presas à cabeça; a **cabeça Redonda** (cantos de 90) passa a ser a do âncora.
- **A câmara com os dois** no podcast (interrupções, riso partilhado, olhares) e o **diretor Jev** a escolher gestos, cara e câmara (`--director jev|llm`).

Tudo isto já vem no `dist/` deste repositório (`$S build-engine` refaz-o a partir do estúdio) e no `movement.json` que o estúdio gera — o `<AnchorLivePlayer>` desenha-o sem mudar nada no site.

## 5. Manter o Symlink Global em Todas as Raízes

Esta skill vive no repositório do motor (`/home/ondokai/Projects/capi-animation-engine/skills/capi-engine-agent-skill`), com symlink em `~/Agent-Skills/capi-engine-agent-skill` e em todas as 12 raízes globais de agentes (mesmas raízes da `tavily-agent-skill`):

```bash
/home/ondokai/Projects/capi-animation-engine/skills/capi-engine-agent-skill/scripts/link-skill-global.sh
/home/ondokai/Projects/capi-animation-engine/skills/capi-engine-agent-skill/scripts/link-skill-global.sh --check
```
