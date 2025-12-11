import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';
import { SortOption, Product } from '../types/product.type';

export class ProductPage extends BasePage {
  readonly pageTitle: Locator;
  readonly cartIcon: Locator;
  readonly cartBadge: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page, '/inventory.html');

    this.pageTitle = page.locator('.title');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.inventoryItems = page.locator('.inventory_item');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  // Verifica que la página de productos esté cargada correctamente */
  async assertOnProductPage() {
    await this.page.waitForURL('**/inventory.html');
    await expect(this.pageTitle).toHaveText('Products');
  }

  
  // NUEVA FUNCIÓN GENÉRICA PARA SORTING
  
  async setSortOrder(sort: SortOption): Promise<void> {
    await this.sortDropdown.waitFor({ state: 'visible', timeout: 5000 });
    await this.sortDropdown.selectOption(sort);
  }


  // LECTURA DEL PRIMER PRODUCTO
  
  async readFirstProduct(): Promise<Product> {
    const item = this.inventoryItems.first();

    const name = await item.locator('.inventory_item_name').innerText();
    const description = await item.locator('.inventory_item_desc').innerText();
    const priceText = await item.locator('.inventory_item_price').innerText();

    return {
      name,
      description,
      price: Number(priceText.replace('$', ''))
    };
  }

  
  // MÉTODO  setSortOrder()
 
  /** Ordena los productos de menor a mayor precio */
  async sortByLowToHigh() {
    await this.setSortOrder('lohi');
  }

  /** Añade un producto al carrito por nombre */
  async addProductToCartByName(productName: string) {
    const productCard = this.page.locator('.inventory_item', { hasText: productName });
    const addButton = productCard.locator('button:has-text("Add to cart")');
    await addButton.click();
    // wait for the button to change to 'Remove' to ensure the action completed
    await expect(productCard.locator('button')).toHaveText('Remove');
  }

  /** Elimina un producto del carrito por nombre */
  async removeProductFromCartByName(productName: string) {
    const productCard = this.page.locator('.inventory_item', { hasText: productName });
    const removeButton = productCard.locator('button:has-text("Remove")');
    await removeButton.click();
    // wait for the button to change back to 'Add to cart' to ensure the action completed
    await expect(productCard.locator('button')).toHaveText('Add to cart');
  }

  /** Devuelve el número actual del badge del carrito */
  async getCartCount(): Promise<number> {
    // If the badge is not present or not visible, treat as zero
    try {
      const visible = await this.cartBadge.isVisible();
      if (!visible) return 0;
      const countText = await this.cartBadge.textContent();
      return Number(countText);
    } catch (e) {
      return 0;
    }
  }

  /** Verifica visualmente el valor del badge (ícono del carrito) */
  async assertCartCount(expectedCount: number) {
    // Use Playwright's expect matchers which wait for the condition to become true.
    if (expectedCount === 0) {
      // toBeHidden passes if the element is hidden or detached from DOM
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toHaveText(String(expectedCount));
    }
  }

  /** Agrega producto y valida inmediatamente el contador del carrito */
  async addProductAndVerify(productName: string, expectedCount: number) {
    await this.addProductToCartByName(productName);
    await this.assertCartCount(expectedCount);
  }

  /** Elimina producto y valida el contador actualizado */
  async removeProductAndVerify(productName: string, expectedCount: number) {
    await this.removeProductFromCartByName(productName);
    await this.assertCartCount(expectedCount);
  }

  /** Navega hacia la página del carrito */
  async goToCart() {
    await this.cartIcon.click();
    await this.page.waitForURL('**/cart.html');
  }
}
