import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { ProductPage } from './pages/productPage';

test.describe('Product Page Tests', () => {
  test('User can add and remove products from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    // Login
    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
    await productPage.assertOnProductPage();

    // Añadir un producto al carrito
    await productPage.addProductToCartByName('Sauce Labs Backpack');
    await expect(await productPage.getCartCount()).toBe(1);

    
    //Quitar el producto
    //await productPage.removeProductFromCartByName('Sauce Labs Backpack');
    //await expect(await productPage.getCartCount()).toBe(0);
  });
});
