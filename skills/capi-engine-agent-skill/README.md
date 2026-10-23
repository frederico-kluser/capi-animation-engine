# capi-engine-agent-skill

Skill global oficial do motor **`capi-animation-engine`** (`@indice-ia/anchor`).

Ensina qualquer agente de código a:
1. **Instalar e configurar o `capi-animation-engine`** em projetos web React/Next/Vite (`<AnchorLivePlayer>`, `<Anchor>`, `<AnchorPlayer>`, Remotion).
2. **Chamar localmente o estúdio (`animated-chaneel`) pelo terminal** com todas as opções, vozes, tons, roupas, cenários e prompts (`--body`, `--tone`, `--voice`, `--character`, `--outfit`, `--scenario`, `--short`) para gerar:
   - **O bruto em JSON criptografado (`movement.json`, ChaCha20-ARX + AEAD MAC) com o áudio `.m4a` EMBUTIDO dentro do próprio JSON criptografado** (pronto para `<AnchorLivePlayer movement={movement} />` sem precisar de HTML pré-renderizado nem de `audio.m4a` externo);
   - **Vídeos renderizados (`.mp4`, `.webm`, `.mov`)**;
   - **Vistas seladas (`anchor-view.js`)**.

## Registo Global (Symlink em todas as raízes de agentes)

```bash
./scripts/link-skill-global.sh
./scripts/link-skill-global.sh --check
```

Documentação completa em [`SKILL.md`](SKILL.md), [`references/web-integration.md`](references/web-integration.md) e [`references/cli-options.md`](references/cli-options.md).
