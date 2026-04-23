import {test, expect} from '@playwright/test';
test.beforeEach(async ({page}) => {
    await page.goto("https://www.superdry.com/");
    const acceptCookies = page.getByRole('button', {name:"Accept All Cookies"});
    if(await acceptCookies.isVisible()){
    await acceptCookies.click();
    }
    expect(acceptCookies).not.toBeVisible()
})

test('Go to PDP', async ({page}) => {
  await page.goto("https://www.superdry.com/");
await page.locator('#men-gb').hover();
await page.locator('.dropdown-menu .sub-column #tops-gb').click();

const firstProduct = page.locator('.product-tile').first()
expect(firstProduct).toBeVisible();
await firstProduct.click();

const firstAvailableSize = page.locator('.custom-product-size-button:not(.notify-me-available)').first()

await firstAvailableSize.click();
await expect(firstAvailableSize).toContainClass('selected');

const buyNowButton = page.getByRole('button', {name: "Add to bag", exact: true})

await buyNowButton.click();

const modal = page.locator("#addToBag .modal-dialog")
const addToBagModalText = modal.locator(".add-to-bag-body");

await expect(modal).toBeVisible();
await expect(addToBagModalText).toHaveText('Added to bag', {ignoreCase: true})
})