import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { ProductPage } from './pages/productPage';
import { CartPage } from './pages/cartPage';
import { CheckoutPage } from './pages/checkoutPage';

function parsePrice(text: string) {
  return parseFloat(text.replace(/[^0-9.-]+/g, ''));
}

test.describe('Checkout Flow Tests', () => {
  test('User completes checkout successfully', async ({ page }) => {
    test.info().annotations.push({ type: 'feature', description: 'E2E Checkout' });
    test.info().annotations.push({ type: 'priority', description: 'High' });

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // 1️⃣ Login
    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');

    // 2️⃣ Ordenar productos Low → High
    await productPage.sortByLowToHigh();

    // 3️⃣ Añadir productos
    await productPage.addProductToCartByName('Sauce Labs Backpack');
    await productPage.addProductToCartByName('Sauce Labs Bike Light');
    await productPage.goToCart();

    // 4️⃣ Ir al checkout
    await cartPage.clickCheckout();

    // 5️⃣ Completar formulario
    await checkoutPage.fillCheckoutInfo('Yoilen', 'Rodriguez', '08001');

    // 6️⃣ Finalizar pedido
    await checkoutPage.finishCheckout();

    // 7️⃣ Validar confirmación
    await checkoutPage.assertOrderSuccess();
  });

  test('Products sort Low → High correctly', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');

    await productPage.sortByLowToHigh();

    // Collect all visible prices and assert ascending order
    const priceLocators = page.locator('.inventory_item_price');
    const count = await priceLocators.count();
    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const txt = await priceLocators.nth(i).textContent();
      if (txt) prices.push(parsePrice(txt));
    }

    // Ensure array is sorted ascending
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('Cart badge updates and checkout summary total matches selected items', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');

    await productPage.sortByLowToHigh();

    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    // Read prices from product list before adding to cart
    let expectedTotal = 0;
    for (const name of items) {
      const priceHandle = page.locator(`.inventory_item:has-text("${name}") .inventory_item_price`);
      const txt = await priceHandle.textContent();
      expect(txt).not.toBeNull();
      expectedTotal += parsePrice(txt || '0');
    }

    // Add to cart
    for (const name of items) {
      await productPage.addProductToCartByName(name);
    }

    // Cart badge should show 2
    const badge = page.locator('.shopping_cart_badge');
    await expect(badge).toHaveText(String(items.length));

    await productPage.goToCart();
    await cartPage.clickCheckout();

    // Fill checkout info to reach overview
    await checkoutPage.fillCheckoutInfo('Yoilen', 'Rodriguez', '08001');

    // Read summary subtotal and compare
    const summaryLabel = page.locator('.summary_subtotal_label');
    await expect(summaryLabel).toBeVisible();
    const summaryText = await summaryLabel.textContent();
    expect(summaryText).not.toBeNull();
    const summaryAmount = parsePrice(summaryText || '0');

    // Allow a small rounding tolerance
    expect(Math.abs(summaryAmount - expectedTotal)).toBeLessThan(0.01);

    // Finish and assert success
    await checkoutPage.finishCheckout();
    await checkoutPage.assertOrderSuccess();
  });
});