import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SecurePage extends BasePage {  
  readonly headerText: Locator;
  readonly flashMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page, '/secure');
    this.headerText = page.locator('h2');
    this.flashMessage = page.locator('#flash');
    this.logoutButton = page.locator('a.button.secondary.radius');
  }

  async logout() {
    await this.logoutButton.click();
  }
}
