/*import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';

test.describe('Advanced Shopping Cart Tests', () => {
  test('Add and remove products while verifying cart badge and cart contents', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    // Login y validación de página de productos
    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
    await productPage.assertOnProductPage();

    // Añadir el primer producto y verificar badge = 1
    await productPage.addProductToCartByName('Sauce Labs Backpack');
    await productPage.assertCartCount(1);

    // Añadir el segundo producto y verificar badge = 2
    await productPage.addProductToCartByName('Sauce Labs Bike Light');
    await productPage.assertCartCount(2);

    // Navegar al carrito y verificar contenido
    await productPage.goToCart();
    await cartPage.assertOnCartPage();
    await cartPage.assertProductsInCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
    await expect(page.locator('.cart_item')).toHaveCount(2);

    // Eliminar un producto y verificar badge actualizado
    await cartPage.removeItemFromCart('Sauce Labs Bike Light');
    await cartPage.clickContinueShopping();
    await productPage.assertCartCount(1);

    // Volver al carrito y eliminar el restante
    await productPage.goToCart();
    await cartPage.removeItemFromCart('Sauce Labs Backpack');
    await cartPage.assertCartIsEmpty();

    // Validar que el badge desaparece (carrito vacío)
    await cartPage.clickContinueShopping();
    await productPage.assertCartCount(0);
  });
}); */


/*import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';

test.describe('Advanced Shopping Cart Tests', () => {

  test.only('Add and remove products (main scenario)', async ({ page }) => {
    test.info().annotations.push({ type: 'feature', description: 'Shopping Cart' });
    test.info().annotations.push({ type: 'severity', description: 'Critical' });

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
    await productPage.assertOnProductPage();

    await productPage.addProductAndVerify('Sauce Labs Backpack', 1);
    await productPage.addProductAndVerify('Sauce Labs Bike Light', 2);

    await productPage.goToCart();
    await cartPage.assertProductsInCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  });

  // Example: test.skip
  test.skip('This test is temporarily skipped (known issue #123)', async ({ page }) => {
    // Won’t run
  });

  // Example: test.fail
  test.fail('Known failing test due to bug in backend API', async ({ page }) => {
    // You could intentionally assert wrong data to simulate
    throw new Error('Intentional failure to demonstrate test.fail');
  });
}); */


// ✅ New Version Using FIXTURE Y ANNOTATIONS
import { test, expect } from './fixtures/baseFixture';
import { CartPage } from './pages/cartPage';

test.describe('Advanced Shopping Cart Tests', () => {

  test('Add and remove products (main scenario)', async ({ loggedInPage }) => {
    test.info().annotations.push({ type: 'feature', description: 'Shopping Cart' });
    test.info().annotations.push({ type: 'severity', description: 'Critical' });

    // 🔹 Gracias al fixture, loggedInPage ya está autenticado en /inventory.html
    const cartPage = new CartPage(loggedInPage['page']);

    // 1️⃣ Agregar productos y validar badge
    await loggedInPage.addProductAndVerify('Sauce Labs Backpack', 1);
    await loggedInPage.addProductAndVerify('Sauce Labs Bike Light', 2);

    // 2️⃣ Ir al carrito y verificar contenido
    await loggedInPage.goToCart();
    await cartPage.assertProductsInCart(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  });

  // Example: test.skip
  test.skip('This test is temporarily skipped (known issue #123)', async ({ loggedInPage }) => {
    // Won’t run
  });

  // Example: test.fail
  test.fail('Known failing test due to bug in backend API', async ({ loggedInPage }) => {
    throw new Error('Intentional failure to demonstrate test.fail');
  });
});
