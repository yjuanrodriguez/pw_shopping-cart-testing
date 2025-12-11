import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {  
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

async gotoLoginPage() {
    await this.goto();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);  
    await this.passwordInput.fill(password);
    await Promise.all([
      this.page.waitForURL('**/inventory.html'),
      this.loginButton.click(),
    ]);
  }

   async assertLoginSuccess() {
    await this.page.waitForURL('**/inventory.html');
    await this.page.locator('.title').waitFor(); 
   }

  async assertLoginError() {
    await this.errorMessage.isVisible();
  }

}
