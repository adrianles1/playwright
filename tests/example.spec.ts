import { test, expect, Page, Browser } from '@playwright/test';
import { LoginPage } from './pages/login.page';

// test.describe('Login tests', () => {
// test('Happy Path', async ({ page }) => {
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();



//   // Title checks
//   await expect(page).toHaveTitle("The Internet");
//    await expect(page).toHaveTitle(/^The/);   
//    await expect(page).toHaveTitle(/Internet$/);

//    //Login
//   await loginPage.login('tomsmith', 'SuperSecretPassword!');
//       await expect(loginPage.flashMessage).toContainText('You logged into a secure area!')

//   //Logout
// await loginPage.logout();
// await loginPage.expectFlashMessage("You logged out of the secure area!");

// });

// test('Incorrect details', async ({ page }) =>{
  
//   const loginPage = new LoginPage(page);

//   await loginPage.goto();
// await loginPage.login('incorrect', 'incorrect');
// await expect(loginPage.flashMessage).toContainText('Your username is invalid!')
// })
// });


// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });

// test('Dynamic Loading - 1', async ({ page }) => {
//   await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
//   await page.getByRole('button', { name: 'Start' }).click();
//   await expect(page.locator('div[id="finish"] h4')).toBeVisible({timeout: 10000});
//     await expect(page.locator('div[id="finish"] h4')).toHaveText("Hello World!");
// });

// test('Dropdowns', async ({page}) => {
// await page.goto('https://the-internet.herokuapp.com/dropdown');
// const dropdown = page.locator('select#dropdown')
// await dropdown.selectOption({value: '1'});
// // await expect(page.locator('option[value="1"]')).toHaveAttribute('selected')
// await expect(dropdown).toHaveValue('1');

// await dropdown.selectOption({value: "2"});
// await expect(dropdown).toHaveValue("2");
// })

// test('Checkboxes', async ({page}) => {
//   await page.goto('https://the-internet.herokuapp.com/checkboxes');
// const checkbox1 = page.locator("(//form[@id='checkboxes']//input)[1]")
// const checkbox2 = page.locator("(//form[@id='checkboxes']//input)[2]")

// //Playwright alternatives to the above XPath
// //page.locator('#checkboxes input').first()
// // page.locator('#checkboxes input').nth(1)

// //Initial state
// await expect(checkbox1).not.toBeChecked();
// await expect(checkbox2).toBeChecked();

// await checkbox1.click();
// await expect(checkbox1).toBeChecked();
// await expect(checkbox2).toBeChecked();

// await checkbox2.click();
// await expect(checkbox1).toBeChecked();
// await expect(checkbox2).not.toBeChecked();

// //await checkbox1.check();    // always checks, even if already checked
// //await checkbox1.uncheck();  // always unchecks
// //await checkbox1.click();    // toggles - what you used

// })

// test('Tabs', async ({page}) =>{
//   await page.goto('https://the-internet.herokuapp.com/');
// }) 