
import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;
  protected path: string;

  constructor(page: Page, path: string = '/') {
    this.page = page;
    this.path = path;
  }

  async goto() {
    await this.page.goto(this.path);
  }
}