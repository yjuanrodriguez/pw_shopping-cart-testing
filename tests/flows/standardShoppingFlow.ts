import { ShoppingFlow } from './shoppingFlow.abstract';
import { LoginPage } from '../../tests/pages/loginPage';
import { ProductPage } from '../../tests/pages/productPage';
import { CartPage } from '../../tests/pages/cartPage';

export class StandardShoppingFlow extends ShoppingFlow {

  async login() {
    const loginPage = new LoginPage(this.page);
    await loginPage.gotoLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
  }

  async addProducts() {
    const productPage = new ProductPage(this.page);

    await productPage.assertOnProductPage();

    // Add 2 products 
    await productPage.addProductToCartByName('Sauce Labs Backpack');
    await productPage.addProductToCartByName('Sauce Labs Bike Light');
  }

  async verifyProducts() {
    const productPage = new ProductPage(this.page);
    await productPage.goToCart();

    const cartPage = new CartPage(this.page);

    await cartPage.assertProductIsInCart('Sauce Labs Backpack');
    await cartPage.assertProductIsInCart('Sauce Labs Bike Light');
  }
}
