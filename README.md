# Playwright Workshop Starter

Welcome to the Playwright Workshop! This repository contains exercises and examples to help you learn Playwright testing with TypeScript.

## Quick Start

```bash
# 1) Unpack & enter
unzip pw-workshop.zip && cd pw-workshop
```

### 2) Install Node.js

- Visit: https://nodejs.org
- Download the LTS (Long-Term Support) version
- Install like a regular program (Next → Next → Finish)

Verify installation:

```bash
node -v
```

Install dependencies and browsers:

```bash
npm install
npx playwright install
```

## Workshop Tasks

### . Advanced Task: Shopping Cart Testing
Create comprehensive tests for shopping cart functionality.

**Target URL:** https://www.saucedemo.com/

**Requirements:**
- Test adding items to basket
- Verify correct items are added
- Test removing items from basket
- Verify basket is empty after removal
- Focus on page objects

### 3. Enhanced Shopping Cart Test
Extend the shopping cart test with additional functionality.

**Requirements:**
- Randomly select users from a given list for login
- Sort products from low to high price
- Add at least 2 items to cart
- Complete checkout process
- Add appropriate value checking (expect statements) throughout
- Maintain focus on page objects

## Adding Tests During Workshop

Add new `*.spec.ts` files under `tests/` directory or complete the existing `tests/exercises/00-first-test.spec.ts` file.
Add new page objects under `pages/`.

## Available Scripts

- `npm test` - Run tests in headless mode
- `npm run test:ui` - Run tests with Playwright UI
- `npm run report` - Generate test report

Homework 06/11/25
 
1. Record a new test
Use the Playwright Codegen feature on any website (your project or any public page).
DONE (utility file)

2. Add annotations to your tests
Apply annotations such as test.skip, test.only, test.fail, or custom test.info().annotations.
DONE cart.spect.ts 

3. Configure playwright.config.ts
Modify the configuration according to your preferences (viewport, retries, trace, reporter, etc.).
 DONE

4. Create a parameterized test
Use multiple data sets to open different subpages and verify that they work (mini-sanity test).
 DONE exercises/sanityTest.spec.ts

5. Update login test using parameterized data
Run the same login flow for multiple users.
 DONE (new Parametrized login.spect.ts)
 
6. Run a test in Playwright UI Mode
Execute at least one test with:
npx playwright test --ui
 
7. Improve your locators
Replace weak or CSS-only locators with Playwright recommended locators (e.g., getByRole, getByTestId, getByLabel, etc.).
 
8. Try test sharding in your project
Run your test suite using shards, e.g.:
npx playwright test --shard=1/2
 
9. Add visual testing to one test
Take a screenshot and compare it against a baseline using toHaveScreenshot().
 
10. Set up Playwright Agent
Enable and test the Playwright Agent integration (Copilot-like experience inside VS Code).