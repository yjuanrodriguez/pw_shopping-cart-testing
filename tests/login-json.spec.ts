import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import * as fs from 'fs';

const testData = JSON.parse(
  fs.readFileSync('./tests/data/user.json', 'utf8')
);

test.describe('Login Tests with JSON data', () => {

  for (const data of testData) {
    test(`Login test for user: ${data.username}`, async ({ page }) => {

      const loginPage = new LoginPage(page);

      await loginPage.gotoLoginPage();
      await loginPage.login(data.username, data.password);

      if (data.expectedUrl) {
        await expect(page).toHaveURL(data.expectedUrl);
      }

      if (data.expectedError) {
        await expect(loginPage.errorMessage).toContainText(data.expectedError);
      }
    });
  }

});
