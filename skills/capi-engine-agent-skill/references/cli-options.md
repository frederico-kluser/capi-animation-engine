# Opções e Prompts de Geração pelo Terminal (`capi-engine.sh`)

O script `scripts/capi-engine.sh` delega para o estúdio local (`/home/ondokai/Projects/animated-chaneel`) resolvendo todos os caminhos relativos à pasta de quem chama.

## 1. Modos de Saída

| Comando | O que gera | Quando usar |
| :--- | :--- | :--- |
| `$S movement "Fala" --out ./movement.json` | **JSON criptografado (`capi-encrypted-movement`) com áudio `.m4a` embutido em base64 no payload cifrado**. Se `--out` for uma pasta, grava `movement.json` + `audio.m4a` lá dentro; se terminar em `.json`, grava apenas o ficheiro `.json` único. | **Uso padrão em projetos web** com `capi-animation-engine` (`<AnchorLivePlayer movement={movement} />`). |
| `$S video "Fala" --out ./pasta-ou-mp4` | **Vídeo renderizado (`.mp4`, `.webm`, `.mov`)** via Remotion + ffmpeg no estúdio local. | Quando o utilizador pedir um ficheiro de vídeo `.mp4`/`.webm` pronto para download/YouTube/Reels. |
| `$S view "Fala" --out ./pasta-vista` | **Vista selada (`anchor-view.js`)** — componente React pré-cozido num único `.js`. | Quando o projeto web não tiver o pacote `capi-animation-engine` instalado. |

---

## 2. Origens da Animação

1. **Texto direto (`talk`)**:
   ```bash
   $S movement "Olá! Vamos começar a aula." --out ./movement.json
   $S movement --text-file ./roteiro.txt --out ./movement.json
   ```
2. **Áudio próprio gravado (`--audio`)**:
   ```bash
   $S movement --audio ./minha-voz.m4a --transcript "Texto exato falado" --out ./movement.json
   ```
3. **Roteiro de Podcast a 2 vozes (`podcast`)**:
   ```bash
   $S podcast ./episodio.json --out ./podcast.movement.json
   $S podcast ./episodio.json --mp4 --out ./episodio-out
   ```
4. **Reaproveitar execução pronta (`from` — custo zero, sem chamar LLM nem TTS)**:
   ```bash
   $S list
   $S from out/talk/<nome-da-execucao> --character capybara --outfit mundodev --out ./movement.json
   $S from out/talk/<nome-da-execucao> --mp4 --short --out ./export-short
   ```

---

## 3. Flags de Voz, Tom, Personagem, Visual, Corpo e Câmara

- **Personagem (`--character`)**:
  `capybara` (a capivara Capi), `anchor` (o âncora humano), `donkey`. Ver lista: `$S characters`.
- **Voz e Modelo TTS (`--voice`, `--tts-model`, `--emotion`, `--vary-voice`)**:
  Vozes pt-BR nativas (`openrouter/mai-voice-2.1`: `caio`, `grant`, `pedro`, `rafael`, `harper`, `luana`, etc.). Ver lista: `$S voices` e `$S models`.
- **Tom (`--tone`)**:
  `amigavel`, `animado`, `serio`, `calmo`, `urgente`, `reflexivo`, `ironico`… Ajusta a cadência da fala e o estilo de gestos do planeador. Ver lista: `$S tones`.
- **Prompts de Corpo e Coreografia (`--body`, `--plan`, `--samples`, `--seed`)**:
  - `--body "Começa pensativo, aponta para cima no segundo ponto e termina de braços abertos"` — instrução direta em linguagem natural injetada no prompt do planeador LLM de corpo/cara/câmara!
  - `--plan ./meu-plano.json` — usa um plano de gestos ancorado em palavras já editado à mão (não chama o LLM).
  - `--samples 1` — pede 1 amostra ao planeador (mais rápido) em vez de 3 em paralelo.
- **Visual / Roupa (`--outfit`, `--top`, `--top-color`, `--glasses`, `--headphones`, `--hat`, `--hair`)**:
  - Presets prontos: `--outfit mundodev`, `--outfit streamer`, `--outfit none`.
  - Peça a peça: `--top hoodie --top-color lilac --glasses round --headphones headset --hat capBackwards`. Ver tudo: `$S outfits`.
- **Fundo e Cenário (`--bg`, `--bg-color`, `--scenario`)**:
  - `--bg transparent` (omissão para web: fundo transparente), `--bg studio`, `--bg-color "#0f172a"`, `--bg ./fundo.png`.
  - `--scenario <id>` (cenários vetoriais ou animados da biblioteca). Ver lista: `$S scenarios`.
- **Formato, Câmara e Legendas (`--short`, `--profile`, `--aspect`, `--captions`, `--no-camera`, `--fps`)**:
  - `--short` (ou `--profile short`): formato vertical 9:16 (1080×1920) com câmara próxima e legendas ativas.
  - `--profile video`: formato horizontal 16:9 (1920×1080).
  - `--captions auto|lines|karaoke|off`.
  - `--no-camera`: mantém enquadramento fixo sem cortes de câmara.
- **Ensaio sem Custo e Diagnóstico (`--dry-run`, `--no-llm`, `--fake-tts`, `--json`)**:
  - `--dry-run`: mostra estimativa de duração, palavras e custo em USD sem gastar nada.
  - `--no-llm --fake-tts`: gera com voz sintética local e coreografia determinística de reserva (100% grátis e offline).
  - `--json`: devolve o resultado estruturado numa única linha JSON no `stdout`.
