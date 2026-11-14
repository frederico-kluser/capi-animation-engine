#!/usr/bin/env bash
# =============================================================================
# link-skill-global.sh — regista a skill capi-engine-agent-skill, por SYMLINK,
# em ~/Agent-Skills e nas MESMAS raízes de skills onde a tavily-agent-skill está.
# =============================================================================
# Uso:  ./link-skill-global.sh [--check] [--dry-run] [--help]
#         --check    não escreve; sai 1 se faltar a skill nalguma raiz
#         --dry-run  mostra o que faria, sem escrever
# =============================================================================
set -uo pipefail
NAME=capi-engine-agent-skill
SRC="$(cd "$(dirname "$(readlink -f "$0")")/.." && pwd)"
REF=tavily-agent-skill
MODE=apply
for a in "$@"; do
  case "$a" in
    --check) MODE=check ;;
    --dry-run) MODE=dryrun ;;
    -h|--help) sed -n '2,10p' "$0"; exit 0 ;;
    *) echo "Erro: opção desconhecida: $a — Solução: --check, --dry-run ou --help" >&2; exit 2 ;;
  esac
done
[ -f "$SRC/SKILL.md" ] || { echo "Erro: não encontro o SKILL.md em $SRC — Solução: corre o script a partir da pasta da skill" >&2; exit 2; }

# Garante também o symlink em ~/Agent-Skills/capi-engine-agent-skill se ~/Agent-Skills existir
if [ -d "$HOME/Agent-Skills" ]; then
  agent_dst="$HOME/Agent-Skills/$NAME"
  if [ "$MODE" = apply ] && [ ! -e "$agent_dst" ] && [ ! -L "$agent_dst" ]; then
    ln -s "$SRC" "$agent_dst"
  fi
fi

mapfile -t ROOTS < <(find "$HOME" -maxdepth 5 -type l -name "$REF" -path '*/skill*/*' 2>/dev/null | xargs -r -n1 dirname | sort -u)
[ "${#ROOTS[@]}" -gt 0 ] || { echo "Erro: a $REF não está ligada em nenhuma raiz — Solução: liga-a primeiro (é a referência das raízes)" >&2; exit 2; }
bad=0
for root in "${ROOTS[@]}"; do
  dst="$root/$NAME"
  if [ -L "$dst" ] && [ "$(readlink -f "$dst")" = "$SRC" ]; then echo "ok       $dst"; continue; fi
  if [ -e "$dst" ] || [ -L "$dst" ]; then echo "CONFLITO $dst (existe e não aponta para $SRC: não lhe toco)"; bad=1; continue; fi
  case "$MODE" in
    check) echo "FALTA    $dst"; bad=1 ;;
    dryrun) echo "criaria  $dst -> $SRC" ;;
    apply) ln -s "$SRC" "$dst" && echo "criado   $dst -> $SRC" || bad=1 ;;
  esac
done
exit $bad
