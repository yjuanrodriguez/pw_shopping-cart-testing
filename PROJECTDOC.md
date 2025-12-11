# pw-workshop — Project documentation

This document explains how the project is organized, how to run tests locally, and some conventions to follow when adding tests.

## Project layout (important files/folders)
- `package.json` — scripts and devDependencies.
- `playwright.config.ts` — Playwright configuration (testDir, projects, use, reporter).
- `tsconfig.json` — TypeScript configuration.
- `tests/` — all test files and page objects. Subfolders:
  - `tests/pages/` — Page Object Model classes (e.g., `loginPage.ts`, `productPage.ts`).
  - `tests/flows/` — higher-level flows and reusable shopping flows (`shoppingFlow.abstract.ts`, `standardShoppingFlow.ts`).
  - `tests/data/` — test data files (JSON files used by parameterized tests).
  - `tests/fixtures/` — custom fixtures used by tests.
  - `tests/` top-level `*.spec.ts` files — test specs.
- `playwright-report/` — generated HTML report and trace artifacts (generated after running tests with the HTML reporter).

## How to run locally
1. Install dependencies and browsers:

```powershell
npm install
npx playwright install
```

2. Run all tests (headless by default):

```powershell
npx playwright test
```

3. Run tests headed (UI) or with Playwright UI:

```powershell
npx playwright test --headed
npx playwright test --ui
```

4. Run a single test file or pattern:

```powershell
npx playwright test tests/login-json.spec.ts
npx playwright test -g "Login test for user"   # run by title regex
```

5. Generate / open report:

```powershell
npm run report
```

6. Type-check the project (recommended before commits):

```powershell
npx tsc --noEmit
```

## Conventions and recommendations
- Test filenames: use `*.spec.ts`. Keep naming consistent to ensure Playwright discovers tests.
- Page objects: one file per page, class named <PageName>Page, store all locators and common actions there.
- Flow classes: put in `tests/flows`, extend a base abstract flow if multiple flows share steps.
- Test data: keep JSON files under `tests/data` and reference them with `fs.readFileSync('./tests/data/<file>.json')`.
- Imports: prefer shorter relative imports within `tests/` (e.g., from `tests/flows` to `tests/pages` use `../pages/loginPage`), or configure `tsconfig.paths` to create aliases (recommended for larger projects).

## Suggested CI pipeline (GitHub Actions example)
1. Checkout repository.
2. Install Node.js (LTS).
3. npm ci
4. npx playwright install --with-deps
5. npx playwright test --reporter=github
6. Upload Playwright HTML report as an artifact.

## Troubleshooting notes
- If Playwright complains about unknown flags (e.g., `--headless`), use `--headed` to run headed; configure headless in `playwright.config.ts`.
- If you see module resolution issues at runtime, check `package.json` "type" and `tsconfig.json` `module` settings.
- If tests are not discovered, ensure files end with `.spec.ts` and are inside `tests/` (or adjust `playwright.config.ts` `testDir`).

## How to add a new test (quick steps)
1. Add a page object under `tests/pages/` if it is a new page (follow the existing naming pattern).
2. Add test data to `tests/data/` if needed.
3. Add `tests/<something>.spec.ts`. Keep tests atomic and small.
4. Run `npx playwright test <new-file>` to validate.
5. Add TypeScript types where helpful (e.g., parameterization interfaces in `tests/types/`).

## Next improvements to consider
- Add GitHub Actions for CI and test-report publishing.
- Add visual regression base images and integrate `toHaveScreenshot()` checks.
- Introduce test tagging and run subsets in CI (e.g., smoke/regression).
- Add test coverage or metrics reporting.

---

If you'd like, I can update the small issues found (fix JSON path in `login-json.spec.ts` if needed, fix import casing, or align tsconfig/module settings) and run `npx tsc --noEmit` to validate. Tell me which automatic fixes you want me to apply.
