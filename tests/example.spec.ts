import { test, expect, Page } from '@playwright/test';
import { LoginPage } from './pages/login.page';

test.describe('Login tests', () => {
test('Happy Path', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();



  // Title checks
  await expect(page).toHaveTitle("The Internet");
   await expect(page).toHaveTitle(/^The/);   
   await expect(page).toHaveTitle(/Internet$/);

   //Login
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
      await expect(loginPage.flashMessage).toContainText('You logged into a secure area!')

  //Logout
await loginPage.logout();
await loginPage.expectFlashMessage("You logged out of the secure area!");

});

test('Incorrect details', async ({ page }) =>{
  
  const loginPage = new LoginPage(page);

  await loginPage.goto();
await loginPage.login('incorrect', 'incorrect');
await expect(loginPage.flashMessage).toContainText('Your username is invalid!')
})
});


test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});