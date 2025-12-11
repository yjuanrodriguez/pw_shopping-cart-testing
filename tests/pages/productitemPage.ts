import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductItemPage extends BasePage {
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.locator('.inventory_details_name');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productPrice = page.locator('.inventory_details_price');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.backButton = page.locator('#back-to-products');
  }

  async assertOnProductItemPage() {
    await expect(this.productName).toBeVisible();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goBackToProducts() {
    await this.backButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
}
