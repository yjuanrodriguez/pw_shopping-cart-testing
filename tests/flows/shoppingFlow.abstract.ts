import { Page } from '@playwright/test';

/**
 * Abstract Shopping Flow
 */
export abstract class ShoppingFlow {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  abstract login(): Promise<void>;
  abstract addProducts(): Promise<void>;
  abstract verifyProducts(): Promise<void>;

  async runFlow() {
    await this.login();
    await this.addProducts();
    await this.verifyProducts();
  }
}
