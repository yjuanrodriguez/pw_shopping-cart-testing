import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    super(page, '/checkout-step-one.html');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.confirmationMessage = page.locator('.complete-header');
  }

  /** ✅ Completa los datos del formulario */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  /** ✅ Finaliza el proceso de checkout */
  async finishCheckout() {
    await this.finishButton.click();
    await this.page.waitForURL('**/checkout-complete.html');
  }

  /** ✅ Devuelve el texto del mensaje de confirmación */
  async getConfirmationMessage(): Promise<string> {
    const text = await this.confirmationMessage.textContent();
    if (!text) throw new Error('Confirmation message not found');
    return text.trim();
  }

  /** ✅ Verifica que la orden se haya completado correctamente */
  async assertOrderSuccess() {
    await expect(this.confirmationMessage).toHaveText('Thank you for your order!');
  }
}
