# Analysis: what is done and what is missing

This document summarizes the current state of the repository (pw-workshop) based on the README and the test files under `tests/` that I inspected.

## What is implemented (observed)
- Playwright + TypeScript setup (devDependency `@playwright/test`, `typescript`, `ts-node`).
- A number of tests using Page Object Model (POM) under `tests/`:
  - `login.spec.ts`, `login-json.spec.ts` (parameterized via JSON data), `product.spec.ts`, `sorting.spec.ts`, `cart.spec.ts`, `checkout.spec.ts`, `sanityTest.spec.ts`.
  - Flow abstraction: `tests/flows/shoppingFlow.abstract.ts` and `tests/flows/standardShoppingFlow.ts` implement a higher-level flow.
  - Page objects are present under `tests/pages/` (e.g. `loginPage.ts`, `productPage.ts`, `cartPage.ts`, `checkoutPage.ts`, `basePage.ts`).
- Playwright config exists and is configured (projects for chromium/firefox/webkit, baseURL set to `https://www.saucedemo.com`, retries, trace/video/screenshot options).
- Useful scripts in `package.json` (`test`, `test:ui`, `test:headed`, `report`, `lint`, `format`).

## Notable good practices already used
- Page Object Model is followed (separation of page objects and specs).
- Tests are parameterized (JSON-driven login test exists).
- Playwright config defines multiple browser projects and reporters.

## Issues and missing items (found)
1. Path / filename mismatches that can cause runtime/type errors or confusion:
   - The data file is `tests/data/user.json`. Some code (or copy edits) tried to use `users.json` which does not exist — ensure `login-json.spec.ts` reads `./tests/data/user.json`.
   - A user-reported import typo earlier used `import { ShoppingFlow } from './shoppingflow.abstract';` (lowercase "f"). The correct file is `shoppingFlow.abstract.ts` (camelCase) under `tests/flows/`. Use exact casing to avoid TypeScript errors (tsconfig has forceConsistentCasingInFileNames:true).
2. Playwright CLI flags confusion: `--headless` is not a valid Playwright CLI option; Playwright accepts `--headed` to run headed. To control headless behavior use config or environment variables, or `--headed` (to run headed) — reverse logic vs `--headless`.
3. tsconfig versus package.json ESM/CommonJS mismatch:
   - `package.json` contains "type": "module" (ES modules). `tsconfig.json` currently sets `module: "CommonJS"`. This can create inconsistencies in how modules are emitted and imported at runtime. Recommend aligning them (either remove `type: "module"` or set `module: "ESNext"`/`module: "NodeNext"` in tsconfig).
4. Some relative imports in `tests/flows/*` are unnecessarily verbose and inconsistent. Example: in `standardShoppingFlow.ts` imports use `../../tests/pages/loginPage` — from `tests/flows` a clearer relative import is `../pages/loginPage` (or use path aliases).
5. Small naming/typo problems were observed in developer notes (some `.spect.ts` vs `.spec.ts`) — ensure test filenames use `.spec.ts` so Playwright discovers them.
6. No CI configuration present (no GitHub Actions / Azure Pipelines / other). Adding CI would help run tests on push and PRs.
7. Tests could be more defensive and include negative cases, edge cases, and more assertions (see recommendations below).

## Quick fixes you should apply now
- Fix JSON filename if your file references `users.json` — change to `user.json`.
- Fix any import casing typos: use `shoppingFlow.abstract` not `shoppingflow.abstract` and prefer `../pages/...` from flows files.
- For CLI: use `npx playwright test tests/sorting.spec.ts --headed` to run headed; or remove the incorrect `--headless` flag.
- Align `package.json` "type" and `tsconfig.json` `module` field.

## Improvement suggestions (short list)
1. Add CI workflow (GitHub Actions) that runs `npm ci`, `npx playwright install --with-deps`, and `npx playwright test --reporter=list,html`.
2. Normalize import paths. Consider `tsconfig.json` path mapping (`baseUrl` + `paths`) to avoid brittle relative imports.
3. Strengthen tests with more assertions and negative cases (see next section).
4. Add a small linter/formatter pre-commit hook (husky + lint-staged) to ensure code consistency.
5. Add a README section with test data format and how to add new users to `tests/data/user.json`.
6. Consider switching tsconfig `module` to `ESNext` if keeping `type: "module"` in package.json, or remove `type: "module"`.

## Extra test cases to add (suggestions)
- Login negative tests: wrong password, locked out user, empty credentials, blank username.
- Accessibility smoke tests: check for no-a11y violations on product and cart pages (using axe or Playwright's accessibility checks).
- Edge-case product tests: add all items, remove mid-way, verify totals and taxes at checkout.
- Session tests: if logging out clears cart or session, add tests for persistence across reloads.
- Visual regression: capture screenshots of product grid and compare with baseline with `toHaveScreenshot()`.
- Performance baseline: measure simple timings for page load of product page (useful but optional).

## How I validated
- I inspected `README.md`, `package.json`, `playwright.config.ts`, `tsconfig.json`, and a set of tests and pages under `tests/` (including `login-json.spec.ts`, `sorting.spec.ts`, `standardShoppingFlow.ts`, `shoppingFlow.abstract.ts`).

---

If you want, I can: apply the quick fixes (JSON filename, import casing), run `npx tsc --noEmit` and run a focused Playwright test to confirm runtime behaviour. Say which fixes you'd like me to apply automatically.
