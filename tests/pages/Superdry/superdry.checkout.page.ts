import { Page, Locator, expect } from '@playwright/test';

export class SuperdryCheckout {
  readonly page: Page;
  readonly checkoutMain: Locator;
  readonly emailInput: Locator;
  readonly guestCheckoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly cityInput: Locator;
  readonly postcodeInput: Locator;
  readonly phoneInput: Locator;
  readonly continueAsGuestButton: Locator;
  readonly standardDeliveryOption: Locator;
  readonly expressDeliveryOption: Locator;
  readonly collectFromStoreOption: Locator; 
  readonly addressLine1Input: Locator;
  readonly addressLine2Input: Locator;
  readonly countryInput: Locator;
  constructor(page: Page) {
    this.page = page;
    this.checkoutMain = page.locator('#checkout-main, .checkout-container').first();

    //Details
    this.guestCheckoutButton = page.locator('button.open-guest');
    this.emailInput = page.locator('#email-guest');
    this.continueAsGuestButton = page.locator('button[value="submit-customer"]');

    //Delivery
    this.standardDeliveryOption = page.locator('#PUDO');
    this.expressDeliveryOption = page.locator('#HD');
    this.collectFromStoreOption = page.locator('#PIS');

    this.firstNameInput = page.locator('#shippingFirstNamedefault')
    this.lastNameInput = page.locator('#shippingLastNamedefault')
    this.addressLine1Input = page.locator('#shippingAddressLine1default')
    this.addressLine2Input = page.locator('#shippingAddressLine2default')
    this.cityInput = page.locator('#shippingCitydefault')
    this.postcodeInput = page.locator('#shippingPostcodedefault')
    this.phoneInput = page.locator('#shippingPhoneNumberdefault')
    this.countryInput = page.locator('#shippingCountrydefault')
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/checkout/i);
    await expect(this.checkoutMain).toBeVisible();
  }

  async selectDeliveryOption(option: string) {
    switch (option) {
      case 'inPost':
        await this.standardDeliveryOption.click();
        break;
      case 'HomeDelivery':
        await this.expressDeliveryOption.click();
        break;
      case 'CollectFromStore':
        await this.collectFromStoreOption.click();
        break;
      default:
        throw new Error(`Invalid delivery option: ${option}`);
    }
  }
async continueAsGuest() {
  await this.guestCheckoutButton.click();
 
  await this.emailInput.fill('test.user@example.com');

  await this.continueAsGuestButton.click();
}
}
