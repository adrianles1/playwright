import {test, expect} from '@playwright/test';
import { Superdry } from './pages/superdry.page';
let superdry: Superdry;

test.beforeEach(async ({page}) => {
   superdry = new Superdry(page);

    await superdry.goTo('https://www.superdry.com/');
    await superdry.cookieAccept();
})

test('Add to bag', async ({page}) => {
 await superdry.goTo('https://www.superdry.com/');

 //Navigate to PDP
await superdry.mainMenuMens.hover();
await superdry.mensTops.click();
expect(superdry.firstProduct).toBeVisible();
await superdry.firstProduct.click();

//Add to bag
await superdry.firstAvailableSize.click();
await expect(superdry.firstAvailableSize).toContainClass('selected');
await superdry.buyNowButton.click();
await expect(superdry.modal).toBeVisible();
await expect(superdry.addToBagModalText).toHaveText('Added to your bag', {ignoreCase: true})
})