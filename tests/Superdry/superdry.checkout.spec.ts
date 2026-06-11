import { test } from '@playwright/test';
import { Superdry } from '../pages/Superdry/superdry.page';
import { SuperdryCheckout } from '../pages/Superdry/superdry.checkout.page';
import { createSuperdryWithCartItem } from '../helpers/superdry.setup';

let superdry: Superdry;
let checkout: SuperdryCheckout;

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    superdry = await createSuperdryWithCartItem(page);
    checkout = new SuperdryCheckout(page);
  });

  test('Checkout - proceed from cart', async () => {
    await superdry.proceedToCheckout();
    await checkout.expectLoaded();
  });

  test('Checkout - details', async () => {
    //TODO: fillDetails
    await superdry.proceedToCheckout();
    await checkout.expectLoaded();
    await checkout.continueAsGuest();
    await checkout.selectDeliveryOption('HomeDelivery');
  });
});
