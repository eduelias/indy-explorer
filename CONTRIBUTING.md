# Contributing to indy-explorer

Thanks for your interest in improving the project! This document explains how to
get set up and what we expect from contributions.

## Ground rules

- Be respectful and constructive in issues and reviews.
- **Document only what the code does.** The README describes observable behaviour;
  keep it that way — no aspirational features.
- This is an **unofficial** tool. Contributions must not present it as affiliated
  with or endorsed by the Hyperledger Foundation, the Linux Foundation, or the
  Sovrin Foundation.
- Never commit secrets (API keys, service-account files, tokens) — not even
  encoded ones.

## Development setup

```bash
git clone https://github.com/eduelias/indy-explorer.git
cd indy-explorer
yarn                # install dependencies
npx quasar dev      # dev server with hot reload
```

The stack is Vue 2 + Quasar v1 (`@quasar/app` v1), so prefer an older Node
(v10–v14 era) if the toolchain misbehaves on current releases.

Useful commands (all from `package.json`):

```bash
yarn lint           # eslint --ext .js,.vue src --fix
yarn build          # quasar build -> dist/spa
yarn test           # placeholder — no test suite yet
```

## Making changes

1. Create a branch: `git checkout -b feat/short-description`.
2. Make focused changes; keep the diff small and readable.
3. Run `yarn lint` — the build treats ESLint findings as errors, so it must pass.
4. Verify your change by hand in `npx quasar dev` (there is currently no
   automated test suite; a PR adding one would be very welcome).
5. Keep commits focused with a clear message.
6. Open a pull request against `master` and describe what changed and why.

## Coding conventions

- Follow the existing style: ESLint + Prettier are configured (`.eslintrc.js`,
  `.prettierrc.json`) and enforced by `yarn lint` and the webpack build.
- Vue single-file components; transaction-type cards live in
  `src/components/transactions/` and are lazy-loaded via `TypeRouter.vue` — new
  transaction types should follow that pattern.
- Network/state logic belongs in the Vuex module `src/store/transactions/`.
- Public behaviour changes should update the `README.md`.

## Reporting bugs / requesting features

Open a GitHub issue. Include your Node and Yarn versions, the network you were
pointed at, and steps to reproduce. Never paste secrets or private keys into
issues.
