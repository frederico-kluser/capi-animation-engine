# Changelog

All notable changes to **capi-animation-engine** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-08-22

### Added

- Motor vetorial React/SVG a 60 fps para o personagem Capi (`capybara`) e Âncora (`anchor`), com suporte aos modos `talk`, `podcast` e `review`.
- Componente `<AnchorLivePlayer>` (`capi-animation-engine/web`) sincronizado ao relógio de áudio com suporte a estado `thinking` e overrides em tempo real de `character`, `outfit` e `background`.
- Encriptação e autenticação AEAD ChaCha20-ARX (`capi-encrypted-movement` / `chacha20-arx-v1`) para ficheiros `movement.json` via `encryptMovementData`, `decryptMovementData`, `isEncryptedMovement` e `readEmbedData`.
- Distribuição pública blindada em `dist/` (269 módulos `.js` ofuscados + 268 declarações `.d.ts`, zero `.map` ou código-fonte `.ts`/`.tsx`) verificada por `scripts/verify-dist.mjs` e suíte `tests/engine.test.mjs`.

[1.0.0]: https://github.com/frederico-kluser/capi-animation-engine/releases/tag/v1.0.0
