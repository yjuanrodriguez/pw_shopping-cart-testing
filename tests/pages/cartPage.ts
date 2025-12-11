import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CartPage extends BasePage {
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page, '/cart.html');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  /** Verifica que estás en la página del carrito */
  async assertOnCartPage() {
    await this.page.waitForURL('**/cart.html');
    // Prefer semantic heading check, fallback to `.title` class if not present
    try {
      await expect(this.page.getByRole('heading', { name: 'Your Cart' })).toBeVisible();
    } catch (e) {
      await expect(this.page.locator('.title')).toHaveText('Your Cart');
    }
  }

  /** Devuelve la lista de nombres de productos en el carrito */
  async getCartProductNames(): Promise<string[]> {
    const names = await this.cartItems.locator('.inventory_item_name').allTextContents();
    return names.map(name => name.trim());
  }

  /** Verifica que los productos en el carrito coincidan con los esperados */
  async assertProductsInCart(expectedProducts: string[]) {
    const actualProducts = await this.getCartProductNames();
    expect(actualProducts).toEqual(expectedProducts);
  }

  /** Verifica que el número de ítems del carrito sea el esperado */
  async assertCartItemCount(expectedCount: number) {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  /** Elimina un producto del carrito por nombre */
  async removeItemFromCart(productName: string) {
    const productNameLocator = this.page.getByText(productName, { exact: true });
    const product = productNameLocator.locator('xpath=ancestor::div[contains(@class, "cart_item")]');
    const removeButton = product.getByRole('button', { name: 'Remove' });
    await removeButton.click();
  }

  /** Verifica que el carrito esté vacío */
  async assertCartIsEmpty() {
    const count = await this.cartItems.count();
    expect(count).toBe(0);
  }

  /** Haz clic en el botón Checkout */
  async clickCheckout() {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  /** Vuelve a la página de productos */
  async clickContinueShopping() {
    await this.continueShoppingButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
  
async assertProductIsInCart(productName: string) {
  const productNameLocator = this.page.getByText(productName, { exact: true });
  const product = productNameLocator.locator('xpath=ancestor::div[contains(@class, "cart_item")]');
  await expect(product).toBeVisible();
}


}
