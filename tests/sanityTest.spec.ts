import { test, expect } from '@playwright/test';

const subpages = [
  { name: 'Inventory', path: '/inventory.html', title: 'Products' },
  { name: 'Cart', path: '/cart.html', title: 'Your Cart' },
  { name: 'About (External)', path: 'https://saucelabs.com/', title: 'Sauce Labs' },
];

test.describe('Mini Sanity Test - Multiple Pages', () => {
  for (const pageData of subpages) {
    test(`Open ${pageData.name} page`, async ({ page }) => {
      await page.goto(pageData.path);
      const title = await page.title();
      expect(title).toContain(pageData.title);
    });
  }
});
