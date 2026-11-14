# Changelog

All notable changes to **capi-animation-engine** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2026-11-14

### Features
- **assets:** letra Anton (OFL) das miniaturas em ./assets/* ([4bae4d4](https://github.com/frederico-kluser/capi-animation-engine/commit/4bae4d4))
- **engine:** seis personagens novos, mãos de cinco dedos e 11 poses ([ebfe70a](https://github.com/frederico-kluser/capi-animation-engine/commit/ebfe70a))
- **engine:** digitar, comer, 29 expressões e 17 roupas (03-11) ([7807203](https://github.com/frederico-kluser/capi-animation-engine/commit/7807203))
- **embed:** movement.json cifrado com o áudio m4a embutido no envelope ([34a9f27](https://github.com/frederico-kluser/capi-animation-engine/commit/34a9f27))

### Documentation
- **skill:** os 9 personagens, as personas e o motor no npm ([f6eda19](https://github.com/frederico-kluser/capi-animation-engine/commit/f6eda19))
- **readme:** o elenco de 9, o catálogo de 14-11 e os requisitos reais ([7bba9e3](https://github.com/frederico-kluser/capi-animation-engine/commit/7bba9e3))
- **governanca:** regista a política merge, nunca rebase ([27e9b61](https://github.com/frederico-kluser/capi-animation-engine/commit/27e9b61))

### Tests
- **engine:** o catálogo de 2026-11-14, as entradas e os assets ([e1cdbbf](https://github.com/frederico-kluser/capi-animation-engine/commit/e1cdbbf))

### Chores
- **git:** ignora artefactos do pnpm (projeto usa npm) ([b47f070](https://github.com/frederico-kluser/capi-animation-engine/commit/b47f070))

## [1.0.0] - 2026-08-22

### Added

- Motor vetorial React/SVG a 60 fps para o personagem Capi (`capybara`) e Âncora (`anchor`), com suporte aos modos `talk`, `podcast` e `review`.
- Componente `<AnchorLivePlayer>` (`capi-animation-engine/web`) sincronizado ao relógio de áudio com suporte a estado `thinking` e overrides em tempo real de `character`, `outfit` e `background`.
- Encriptação e autenticação AEAD ChaCha20-ARX (`capi-encrypted-movement` / `chacha20-arx-v1`) para ficheiros `movement.json` via `encryptMovementData`, `decryptMovementData`, `isEncryptedMovement` e `readEmbedData`.
- Distribuição pública blindada em `dist/` (269 módulos `.js` ofuscados + 268 declarações `.d.ts`, zero `.map` ou código-fonte `.ts`/`.tsx`) verificada por `scripts/verify-dist.mjs` e suíte `tests/engine.test.mjs`.

[Unreleased]: https://github.com/frederico-kluser/capi-animation-engine/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/frederico-kluser/capi-animation-engine/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/frederico-kluser/capi-animation-engine/releases/tag/v1.0.0
