#!/usr/bin/env bash
# =============================================================================
# capi-engine.sh — CLI unificado da skill global capi-engine-agent-skill:
# 1. Instala e configura o motor capi-animation-engine em projetos web;
# 2. Chama LOCALMENTE o estúdio (animated-chaneel / capi-animation-studio) para
#    gerar animações e vídeos do Capi / Âncora com todas as opções e prompts:
#    - `movement`: gera o BRUTO em JSON CRIPTOGRAFADO (`movement.json`, AEAD
#      ChaCha20-ARX) com o ÁUDIO (.m4a AAC) EMBUTIDO dentro do JSON criptografado,
#      pronto para `<AnchorLivePlayer movement={movement} />`;
#    - `video`: gera e renderiza o vídeo bruto (`.mp4` / `.webm` / `.mov`);
#    - `view` / `check`: gera e valida a vista selada (`anchor-view.js`);
#    - `build-engine`: compila, ofusca e sincroniza o motor público.
# =============================================================================
# Uso (funciona de qualquer pasta):
#   capi-engine.sh where                                       verifica motor + estúdio + chaves
#   capi-engine.sh install [pasta-do-projeto-web]              instala capi-animation-engine num projeto web
#   capi-engine.sh movement "A fala." --out <destino> [opções] gera movement.json encriptado + áudio embutido
#   capi-engine.sh video "A fala." --out <destino> [opções]    gera e renderiza vídeo MP4/WebM
#   capi-engine.sh podcast <roteiro.json> --out <destino> [op] gera podcast (movement.json por omissão; --mp4 ou --view)
#   capi-engine.sh from <execução> --out <destino> [opções]    re-exporta execução pronta (custo zero)
#   capi-engine.sh view "A fala." --out <pasta> [opções]       gera vista selada React (anchor-view.js)
#   capi-engine.sh check <pasta-da-vista>                      valida vista selada no Chrome headless
#   capi-engine.sh build-engine                                compila + ofusca + testa capi-animation-engine
#   capi-engine.sh list | voices | tones | outfits | scenarios | characters | profiles | models | help
# =============================================================================
set -uo pipefail

SELF="$(readlink -f "$0")"
SKILL_DIR="$(cd "$(dirname "$SELF")/.." && pwd)"
CALLER="$PWD"

fail() { printf 'Erro: %s — Solução: %s\n' "$1" "$2" >&2; exit "${3:-1}"; }
usage() { sed -n '2,25p' "$SELF" | sed 's/^# \{0,1\}//'; }

find_engine_repo() {
  local c
  for c in "${CAPI_ENGINE_REPO:-}" "$(cd "$SKILL_DIR/../.." 2>/dev/null && pwd)" "$HOME/Projects/capi-animation-engine" "/Volumes/Ext2TB/Projects/capi-animation-engine"; do
    [ -n "$c" ] && [ -f "$c/package.json" ] && [ -d "$c/dist" ] && grep -q '"capi-animation-engine"' "$c/package.json" 2>/dev/null && { (cd "$c" && pwd); return 0; }
  done
  return 1
}

find_studio_repo() {
  local c
  for c in "${CAPI_REPO:-}" "${ANCHOR_REPO:-}" "$HOME/Projects/animated-chaneel" "$HOME/Projects/capi-animation-studio" "/Volumes/Ext2TB/Projects/animated-chaneel" "$HOME/animated-chaneel"; do
    [ -n "$c" ] && [ -f "$c/package.json" ] && [ -d "$c/packages/anchor" ] && { (cd "$c" && pwd); return 0; }
  done
  return 1
}

ENGINE_REPO="$(find_engine_repo || true)"
STUDIO_REPO="$(find_studio_repo || true)"

need_studio() {
  [ -n "$STUDIO_REPO" ] || fail "não encontro o repositório do estúdio (animated-chaneel / capi-animation-studio)" "clona-o em ~/Projects/animated-chaneel ou define CAPI_REPO=<pasta>" 1
  command -v npm >/dev/null 2>&1 || fail "não há npm no PATH" "instala o Node 20+" 1
  [ -d "$STUDIO_REPO/node_modules" ] || fail "o estúdio não tem as dependências instaladas" "npm --prefix $STUDIO_REPO install" 1
}

need_engine() {
  [ -n "$ENGINE_REPO" ] || fail "não encontro o repositório do motor (capi-animation-engine)" "clona-o em ~/Projects/capi-animation-engine ou define CAPI_ENGINE_REPO=<pasta>" 1
}

run_studio() { local script="$1"; shift; npm --prefix "$STUDIO_REPO" run -s "$script" -- "$@"; }

abs() {
  local p
  case "$1" in /*) p="$1" ;; ~*) p="${1/#\~/$HOME}" ;; *) p="$CALLER/$1" ;; esac
  if command -v realpath >/dev/null 2>&1 && realpath -m -- / >/dev/null 2>&1; then realpath -m -- "$p"; else printf '%s' "$p"; fi
}

ALWAYS_PATH=' --out --script --audio --text-file --run-dir --plan '
MAYBE_PATH=' --from --bg --subs --video --cast '
ARGS=()
fix_paths() {
  ARGS=()
  while [ $# -gt 0 ]; do
    local a="$1"; shift
    if [ $# -gt 0 ] && [[ "$ALWAYS_PATH" == *" $a "* ]]; then ARGS+=("$a" "$(abs "$1")"); shift; continue; fi
    if [ $# -gt 0 ] && [[ "$MAYBE_PATH" == *" $a "* ]]; then
      if [ -e "$(abs "$1")" ] && [ ! -e "${STUDIO_REPO:-/nonexistent}/$1" ]; then ARGS+=("$a" "$(abs "$1")"); else ARGS+=("$a" "$1"); fi
      shift; continue
    fi
    ARGS+=("$a")
  done
}

main() {
cmd="${1:-}"; [ $# -gt 0 ] && shift
case "$cmd" in
  ''|-h|--help) usage; exit 0 ;;

  where)
    ok=0
    line() { local k="$1"; while [ "${#k}" -lt 16 ]; do k="$k "; done; printf '%s %s\n' "$k" "$2"; }
    if [ -n "$ENGINE_REPO" ]; then
      line "motor (engine):" "$ENGINE_REPO (dist/ pronto)"
    else
      line "motor (engine):" "FALTA — esperado em ~/Projects/capi-animation-engine"; ok=1
    fi
    if [ -n "$STUDIO_REPO" ]; then
      line "estúdio (local):" "$STUDIO_REPO ($(git -C "$STUDIO_REPO" rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?') @ $(git -C "$STUDIO_REPO" log -1 --format=%h 2>/dev/null || echo '?'))"
      [ -d "$STUDIO_REPO/node_modules" ] && line "deps estúdio:" "instaladas" || { line "deps estúdio:" "FALTAM — npm --prefix $STUDIO_REPO install"; ok=1; }
    else
      line "estúdio (local):" "FALTA — esperado em ~/Projects/animated-chaneel"; ok=1
    fi
    if command -v node >/dev/null 2>&1; then line "node:" "$(node -v)"; else line "node:" "FALTA (Node 20+)"; ok=1; fi
    command -v ffmpeg >/dev/null 2>&1 && line "ffmpeg:" "ok (converte e embute o som AAC)" || { line "ffmpeg:" "FALTA — sem ele não se converte o som"; ok=1; }
    chrome="${CHROME_PATH:-$(command -v google-chrome-stable || command -v google-chrome || command -v chromium || true)}"
    [ -n "$chrome" ] && line "chrome:" "ok ($chrome)" || line "chrome:" "não encontrado (define CHROME_PATH para check/render)"
    key=ausente
    if [ -n "${OPENROUTER_API_KEY:-}" ]; then key='presente (ambiente)';
    elif [ -n "$STUDIO_REPO" ] && grep -qs '^OPENROUTER_API_KEY=' "$STUDIO_REPO/.env.local"; then key='presente (.env.local do estúdio)';
    elif grep -qs 'OPENROUTER_API_KEY' "$HOME/.secrets"; then key='presente (~/.secrets)'; fi
    line "voz (chave):" "OPENROUTER_API_KEY $key — sem ela usa --no-llm --fake-tts"
    line "pasta atual:" "$CALLER"
    exit $ok ;;

  install)
    need_engine
    target_dir="${1:-$CALLER}"
    target_dir="$(abs "$target_dir")"
    [ -f "$target_dir/package.json" ] || fail "não há package.json em $target_dir" "corre «capi-engine.sh install <pasta-do-projeto-web>» numa pasta com package.json" 2
    echo "▶ A instalar capi-animation-engine (de $ENGINE_REPO) em $target_dir ..."
    (cd "$target_dir" && npm install --install-links "$ENGINE_REPO") || fail "npm install falhou em $target_dir" "verifica o package.json e permissões em $target_dir" 1
    cat <<'EOF'

✔ capi-animation-engine instalado e pronto!

Exemplo de uso no teu projeto React (com áudio já embutido no movement.json encriptado):

```tsx
import { useEffect, useState } from 'react';
import { AnchorLivePlayer, type EncryptedMovementEnvelope } from 'capi-animation-engine/web';

export function CapiStage({ movementUrl = '/capi/movement.json', thinking = false }) {
  const [movement, setMovement] = useState<EncryptedMovementEnvelope | null>(null);

  useEffect(() => {
    fetch(movementUrl).then((r) => r.json()).then(setMovement);
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
EOF
    ;;

  movement|json)
    need_studio
    if [ "${1:-}" = --text-file ] || [ "${1:-}" = --from ] || [ "${1:-}" = --script ] || [ "${1:-}" = --audio ] || [ "${1:-}" = --text ]; then
      fix_paths "$@"; run_studio view --movement "${ARGS[@]}"; exit $?
    fi
    [ $# -gt 0 ] && [[ "$1" != --* ]] || fail "falta a fala ou origem (--from / --script / --text-file / --audio)" "capi-engine.sh movement \"O que o Capi diz.\" --out ./movement.json [opções]" 2
    text="$1"; shift
    fix_paths "$@"; run_studio view --movement --text "$text" "${ARGS[@]}" ;;

  video|mp4)
    need_studio
    if [ "${1:-}" = --from ]; then
      fix_paths "$@"
      has_format=0
      for a in "${ARGS[@]}"; do [ "$a" = "--format" ] && has_format=1; done
      if [ "$has_format" -eq 0 ]; then ARGS+=("--format" "mp4"); fi
      run_studio export "${ARGS[@]}"; exit $?
    fi
    if [ "${1:-}" = --script ]; then
      shift
      [ $# -gt 0 ] || fail "falta o caminho do roteiro após --script" "capi-engine.sh video --script roteiro.json --out ./video.mp4" 2
      script="$(abs "$1")"; shift
      fix_paths "$@"; run_studio podcast "$script" "${ARGS[@]}"; exit $?
    fi
    if [ "${1:-}" = --video ]; then
      fix_paths "$@"; run_studio review "${ARGS[@]}"; exit $?
    fi
    if [ "${1:-}" = --text-file ] || [ "${1:-}" = --audio ] || [ "${1:-}" = --text ]; then
      fix_paths "$@"; run_studio talk "${ARGS[@]}"; exit $?
    fi
    [ $# -gt 0 ] && [[ "$1" != --* ]] || fail "falta a fala ou origem (--from / --script / --video / --text-file)" "capi-engine.sh video \"O que o Capi diz.\" --out ./video.mp4 [opções]" 2
    text="$1"; shift
    fix_paths "$@"; run_studio talk --text "$text" "${ARGS[@]}" ;;

  podcast)
    need_studio
    [ $# -gt 0 ] && [[ "$1" != --* ]] || fail "falta o roteiro do podcast" "capi-engine.sh podcast <roteiro.json> --out <destino>" 2
    script="$(abs "$1")"; shift
    [ -f "$script" ] || fail "não encontro o roteiro $script" "dá o caminho de um roteiro (.json; há exemplos em $STUDIO_REPO/examples/podcast/)" 2
    mode_flag="--movement"
    rest=()
    for a in "$@"; do
      case "$a" in
        --view) mode_flag="" ;;
        --mp4|--video) mode_flag="video" ;;
        *) rest+=("$a") ;;
      esac
    done
    fix_paths "${rest[@]}"
    if [ "$mode_flag" = "video" ]; then
      run_studio podcast "$script" "${ARGS[@]}"
    elif [ -n "$mode_flag" ]; then
      run_studio view --movement --script "$script" "${ARGS[@]}"
    else
      run_studio view --script "$script" "${ARGS[@]}"
    fi ;;

  from)
    need_studio
    [ $# -gt 0 ] && [[ "$1" != --* ]] || fail "falta a execução" "capi-engine.sh from out/talk/<nome> --out <destino>   (vê quais há: capi-engine.sh list)" 2
    run="$1"; shift
    if [ -d "$(abs "$run")" ] && [ ! -d "$STUDIO_REPO/$run" ]; then run="$(abs "$run")"; fi
    mode_flag="--movement"
    rest=()
    for a in "$@"; do
      case "$a" in
        --view) mode_flag="" ;;
        --mp4|--video) mode_flag="video" ;;
        *) rest+=("$a") ;;
      esac
    done
    fix_paths "${rest[@]}"
    if [ "$mode_flag" = "video" ]; then
      run_studio export --from "$run" --format mp4 "${ARGS[@]}"
    elif [ -n "$mode_flag" ]; then
      run_studio view --movement --from "$run" "${ARGS[@]}"
    else
      run_studio view --from "$run" "${ARGS[@]}"
    fi ;;

  view|text)
    need_studio
    if [ "${1:-}" = --text-file ] || [ "${1:-}" = --from ] || [ "${1:-}" = --script ] || [ "${1:-}" = --audio ] || [ "${1:-}" = --text ]; then
      fix_paths "$@"; run_studio view "${ARGS[@]}"; exit $?
    fi
    [ $# -gt 0 ] && [[ "$1" != --* ]] || fail "falta a fala" "capi-engine.sh view \"O que o personagem diz.\" --out <pasta>" 2
    text="$1"; shift
    fix_paths "$@"; run_studio view --text "$text" "${ARGS[@]}" ;;

  check)
    need_studio
    [ $# -gt 0 ] && [[ "$1" != --* ]] || fail "falta a pasta da vista" "capi-engine.sh check <pasta onde está o anchor-view.js>" 2
    target="$(abs "$1")"; shift
    [ -e "$target" ] || fail "não encontro $target" "dá a pasta que o comando escreveu" 2
    run_studio view --check "$target" "$@" ;;

  build-engine)
    need_studio
    need_engine
    run_studio build
    npm --prefix "$ENGINE_REPO" run lint && npm --prefix "$ENGINE_REPO" test ;;

  list) need_studio; run_studio view --list "$@" ;;
  help) need_studio; run_studio view --help ;;
  raw) need_studio; fix_paths "$@"; run_studio view "${ARGS[@]}" ;;

  voices) need_studio; run_studio talk --list-voices "$@" ;;
  tones) need_studio; run_studio talk --list-tones "$@" ;;
  outfits) need_studio; run_studio talk --list-outfit "$@" ;;
  scenarios) need_studio; run_studio talk --list-scenarios "$@" ;;
  characters) need_studio; run_studio talk --list-characters "$@" ;;
  profiles) need_studio; run_studio talk --list-profiles "$@" ;;
  models) need_studio; run_studio talk --list-models "$@" ;;

  *) fail "comando desconhecido: $cmd" "$(basename "$SELF") --help" 2 ;;
esac
}

main "$@"; exit $?
