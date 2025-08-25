import { test } from '@playwright/test';
import { LoginPage } from '../../pageobjects/login.po';
const testData = require('../../fixture/loginFixture.json');

test.beforeEach(async({ page }) =>{
    await page.goto('/');
})

test.describe('Valid login tests',() =>{
    test('Login Using valid username and password', async ({ page}) =>{
        const login =new LoginPage(page);
        await login.login(testData.ValidUser.userName,testData.ValidUser.password);
        await login.verifyValidLogin();
    });

  test.describe('Invalid login tests', () => {
  test('Login with invalid username or password',async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.inValidUser.userName,testData.inValidUser.password);
    await login.verifyInvalidLogin(); 
  }); 
});
})
