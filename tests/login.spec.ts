/*import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';


test.only('User can login successfully', async ({ page }) => {
   const loginPage = new LoginPage(page);
  
   await loginPage.gotoLoginPage();
   await loginPage.login('standard_user', 'secret_sauce');
   await loginPage.assertLoginSuccess();
   await expect(page).toHaveURL(/.*inventory.html/);
   await expect(page.locator('.title')).toHaveText('Products');
});
   
test('User sees error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login('wrong_user', 'wrong_pass');
    await loginPage.assertLoginError();
    await expect(loginPage.errorMessage).toBeVisible();
  });
*/

import { test } from '@playwright/test';
import { LoginPage } from './pages/loginPage';

const users = [
  { username: 'standard_user', password: 'secret_sauce' },
  { username: 'problem_user', password: 'secret_sauce' },
  { username: 'performance_glitch_user', password: 'secret_sauce' },
];

test.describe('Parameterized Login Tests', () => {
  for (const user of users) {
    test(`Login as ${user.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.gotoLoginPage();
      await loginPage.login(user.username, user.password);
      await loginPage.assertLoginSuccess();
    });
  }
});

