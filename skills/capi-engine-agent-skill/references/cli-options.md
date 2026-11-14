# Opções e Prompts de Geração pelo Terminal (`capi-engine.sh`)

O script `scripts/capi-engine.sh` delega para o estúdio local (`~/Projects/capi-animation-studio` ou `~/Projects/animated-chaneel`; `CAPI_REPO=<pasta>` força outro) resolvendo todos os caminhos relativos à pasta de quem chama.

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
  - As 9 **bases** (o desenho; é o que vai no `movement.json`): `anchor` (o âncora, omissão), `capybara` (a Capi), `donkey` (o burro), `dog`, `cat`, `parrot` (rosto de ave), `monkey`, `lion` (juba; recusa o boné) e `einstein` (o retrato, cabelo `wild` branco).
  - As **personas do elenco** (`characters/` do estúdio: a base + a voz, os estilos e o visual): `indice`, `capi`, `burro`, `cachorro`, `gato`, `papagaio`, `macaco`, `leao`, `albert-einstein` — aceites pelo `talk` (`$S video "…" --character leao`); o `movement`/`view` só aceitam a base (para uma persona no site: gerar com `$S video` e reexportar com `$S movement --from out/talk/<execução>`).
  - Ver lista: `$S characters`.
- **Voz e Modelo TTS (`--voice`, `--tts-model`, `--emotion`, `--vary-voice`)**:
  Vozes pt-BR nativas (`openrouter/mai-voice-2.1`: `caio`, `grant`, `pedro`, `rafael`, `harper`, `luana`, etc.). Ver lista: `$S voices` e `$S models`.
- **Tom (`--tone`)**:
  `amigavel`, `animado`, `serio`, `calmo`, `urgente`, `reflexivo`, `ironico`… Ajusta a cadência da fala e o estilo de gestos do planeador. Ver lista: `$S tones`.
- **Prompts de Corpo e Coreografia (`--body`, `--plan`, `--samples`, `--seed`)**:
  - `--body "Começa pensativo, aponta para cima no segundo ponto e termina de braços abertos"` — instrução direta em linguagem natural injetada no prompt do planeador LLM de corpo/cara/câmara!
  - `--plan ./meu-plano.json` — usa um plano de gestos ancorado em palavras já editado à mão (não chama o LLM).
  - `--samples 1` — pede 1 amostra ao planeador (mais rápido) em vez de 3 em paralelo.
- **Quem escolhe os gestos, a cara e a câmara (`--director`)**:
  - `--director jev` (a omissão desde 2026-11-03): o diretor Jev decide frase a frase a pose, a expressão, a reação de quem ouve e a intenção de câmara (≈ 0,4 s por frase); o modelo de linguagem continua a escrever as falas.
  - `--director llm`: os prompts do modelo, como antes (numa review é a omissão).
- **Visual / Roupa (`--outfit`, `--top`, `--top-color`, `--glasses`, `--headphones`, `--hat`, `--hair`)**:
  - Presets prontos: `--outfit mundodev`, `casual`, `streamer`, `sporty`, `tech`, `scientist` (bata de laboratório), `biker` (casaco de cabedal), `none`.
  - Roupas (`--top`, 17): `suit`, `hoodie`, `tshirt`, `polo`, `sweater`, `shirt`, `blazer`, `bomber`, `turtleneck`, `jersey`, `vest`, `cardigan`, `denimJacket`, `leatherJacket`, `flannel`, `labCoat`, `trackJacket`; cores (`--top-color`, 15): `navy`, `black`, `grey`, `white`, `lilac`, `burgundy`, `coral`, `mustard`, `teal`, `orange`, `red`, `pink`, `camel`, `sky`, `denim`.
  - Peça a peça: `--top hoodie --top-color lilac --glasses round --headphones headset --hat capBackwards`. Ver tudo: `$S outfits`.
  - Cabelo (`--hair`, 8: `none`, `tuft`, `spiky`, `curly`, `sidePart`, `bun`, `mundodev-flame`, `wild`) e cor (`--hair-color`, 7: `dark`, `brown`, `blond`, `ginger`, `silver`, `mundodev-orange`, `white`) — só nos humanoides (`anchor`, `einstein`); num animal ignora-se com aviso, e o leão recusa o boné (a juba).
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
  - `RUNS_NO_GIT=1` (variável de ambiente): o estúdio commita sozinho cada execução de `out/<modo>/<nome>` no ramo atual (decisão do dono, 2026-11-10); num ensaio descartável, `RUNS_NO_GIT=1 $S movement "…" --no-llm --fake-tts --out …` não commita — apaga depois a pasta `out/talk/<nome>`.
  - `--json`: devolve o resultado estruturado numa única linha JSON no `stdout`.
