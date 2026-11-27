# Changelog

All notable changes to **capi-animation-engine** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.0](https://github.com/frederico-kluser/capi-animation-engine/compare/v1.2.0...v1.3.0) (2026-11-27)


### Features

* **engine:** nove personagens, mãos de cinco dedos e assets (v1.1.0) ([#2](https://github.com/frederico-kluser/capi-animation-engine/issues/2)) ([3ab03f4](https://github.com/frederico-kluser/capi-animation-engine/commit/3ab03f4be92adbb9eb1f916b7ffdf437913bafad))
* **engine:** publica motor ofuscado com movement.json encriptado ([0fbee6b](https://github.com/frederico-kluser/capi-animation-engine/commit/0fbee6b4c405315f019a27aa5177d2f7421d1847))
* **engine:** sincroniza o estúdio com o novo Anotar no ar e as notícias ([#3](https://github.com/frederico-kluser/capi-animation-engine/issues/3)) ([e8e3269](https://github.com/frederico-kluser/capi-animation-engine/commit/e8e32692625c121175c2e8b6d967ab52e91db886))

## [Unreleased]

## [1.2.0] - 2026-11-26

Sincronizado com o código do capi-animation-studio (`packages/anchor`) pelo `scripts/build-capi-engine.mjs`.

### Features

- **A Capi redesenhada**: pelagem (`coat`), topete esculpido e tufos na silhueta, bochechas fofas, olho «anime» com
  segundo brilho, blush em três traços e sombreado suave com luz de recorte; bigodes 3D nos outros animais.
- **5 personagens novos** (retratos humanoides): `torvalds`, `lovelace`, `turing`, `unclebob`, `knuth` — 14 no total.
- **30 poses novas** (153 no total, 74 com ciclo próprio): `pointDown pointBack fingerGuns comeHere blahBlah moneyRub
  snapFingers grabIdea boom countFive tada whoa bow groove drumRoll rollOn checkWatch wipeBrow lookAhead chopDown
  soSoHand rubHandsUp frameShot pinchPrecise lowerLevel moveOver tableCountOne tableCountTwo tableCountFour tableCountFive`.
- **«Anotar no ar» (`writeAir`) redesenhada**: o indicador escreve uma assinatura curta e um sublinhado ao lado do
  rosto, com a outra mão parada; uma frase de 1500 ms em vez de três vaivéns de 300 ms. O ciclo aceita um **percurso
  por poses-chave** (`keyframes`) além da outra ponta (`swing`) e da partitura (`taps`).
- **Notícias**: os cartões do short de uma notícia (`core/news`), a capa com «Encaixar»/«Preencher» e o contrato do
  artigo.
- **Curso automático**: a autoridade durável do curso, o DAG curso/aula e a admissão por memória/API (`core/course-auto`).
- **Miniaturas de aula**: as peças de texto do terminal (`core/thumbs/lesson`, `terminal`) e os portões que saem antes
  do render (`core/tutorial/gate-exits`).
- **5 formas de luva novas** (31 no total): `spread`, `beckon`, `beak`, `rub`, `snap`.
- Apontar para um alvo (o ângulo do braço calculado a partir de um ponto ou zona) e contar pelos dedos o número dito.
- Visual: óculos `wire`; cabelos `sweptBack`, `victorianBraids`, `neatPart`, `sideSwept`, `baldCrown`; cores de cabelo
  `ash`, `deepBrown`, `ivory`; roupa `victorianDress`; cor `mauve`.
- «Visita» (um convidado histórico numa videochamada que vira a cabeça para quem fala), clonagem de voz, verificação
  de deriva da voz, léxico de pronúncia pt-BR e o contrato de cena por frame para o renderizador nativo.

### Changed

- `dist/`: 445 módulos `.js` ofuscados e 444 `.d.ts` (eram 353 e 352 na v1.1.0). Os formatos `anchor-embed` v1 e o
  envelope v1 não mudaram: um `movement.json` da v1.0.0 continua a abrir.
- A pose `namaste` saiu do catálogo a pedido do dono (153 poses, 74 com ciclo): quem a pedisse por nome passa a
  receber o erro de pose desconhecida.

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
