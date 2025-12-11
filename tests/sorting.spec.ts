import { test, expect } from '@playwright/test';
import { ExpectedProductOrder } from './types/product.type';
import { LoginPage } from './pages/loginPage';
import { ProductPage } from './pages/productPage';

const cases: ExpectedProductOrder[] = [
  { sort: 'az', expectedFirst: 'Sauce Labs Backpack' },
  { sort: 'za', expectedFirst: 'Test.allTheThings() T-Shirt (Red)' },
  { sort: 'lohi', expectedFirst: 'Sauce Labs Onesie' },
  { sort: 'hilo', expectedFirst: 'Sauce Labs Fleece Jacket' },
];

test.describe('Product Sorting Tests', () => {

  for (const c of cases) {

    test(`Sorting by '${c.sort}' should show '${c.expectedFirst}' as the first product`, async ({ page }) => {
      
      // Page Object Instances
      const loginPage = new LoginPage(page);
      const productPage = new ProductPage(page);

      // 1. Login user
      await loginPage.gotoLoginPage();
      await loginPage.login('standard_user', 'secret_sauce');
      await productPage.assertOnProductPage();

      // 2. Apply sorting option
      await productPage.setSortOrder(c.sort);

      // 3. Read first product displayed
      const firstProduct = await productPage.readFirstProduct();

      // 4. Assert
      expect(firstProduct.name).toBe(c.expectedFirst);
    });

  }

});
