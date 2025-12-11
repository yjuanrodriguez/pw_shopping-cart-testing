import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';

/**
 * Custom fixture definition
 * - logs in once
 * - returns an authenticated ProductPage ready for testing
 */
type Fixtures = {
  loggedInPage: ProductPage;
  rawPage: Page;
};

// Extend Playwright's base test
export const test = base.extend<Fixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    // Perform login (reusable)
    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
    await productPage.assertOnProductPage();

    // Make this context available to tests
    await use(productPage);
  },

  // Optional: expose raw page if needed
  rawPage: async ({ page }, use) => {
    await use(page);
  },
});

// Export expect to reuse the same instance
export { expect };
