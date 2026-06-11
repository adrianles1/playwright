import { Page, Locator, expect } from '@playwright/test';

export class Superdry {
  readonly page: Page;
  readonly acceptCookies: Locator;
  readonly mainMenuMens: Locator;
  readonly mensTops: Locator;
  readonly firstProduct: Locator;
  readonly firstAvailableSize: Locator;
  readonly unavailableSizes: Locator;
  readonly buyNowButton: Locator;
  readonly modal: Locator;
  readonly addToBagModalText: Locator;
  readonly addToBagModalGoToBag: Locator;
  readonly countrySelector: Locator;
  readonly cartProduct1: Locator;
  readonly cartProduct1Name: Locator;
  readonly cartProduct1Quantity: Locator;
  readonly cartProduct1Remove: Locator;
  readonly cartProduct1Price: Locator;
  readonly cartCheckoutButton: Locator;
  readonly cartTermsCheckbox: Locator;
  readonly cartRemoveConfirmButton: Locator;
  readonly searchInput: Locator;
  readonly searchSubmit: Locator;
  readonly searchResults: Locator;
  readonly searchAutocompleteListbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookies = page.getByRole('button', { name: 'Accept All Cookies' });
    
    //Menu
    this.mainMenuMens = page.locator('#men-gb');
    this.mensTops = page.locator('.dropdown-menu .sub-column #tops-gb');

    this.searchInput = page.getByRole('combobox', { name: 'Search for products...' });
    this.searchSubmit = page.getByRole('button', { name: 'Submit search keywords' });
    this.searchAutocompleteListbox = page.getByRole('listbox');
    this.searchResults = page.locator('.product-tile');
    this.firstProduct = this.searchResults.first();

    //PDP
    this.firstAvailableSize = page
      .locator('.custom-product-size-button:not(.notify-me-available)')
      .filter({ visible: true })
      .first();
    this.unavailableSizes = page
      .locator('.custom-product-size-button.notify-me-available')
      .filter({ visible: true });
    this.buyNowButton = page.getByRole('button', { name: 'Add to bag', exact: true });
    this.modal = page.locator('#addToBag .modal-dialog');
    this.addToBagModalText = this.modal.locator('.add-to-bag-body');
    this.countrySelector = page.locator('select#country');
    this.addToBagModalGoToBag = this.modal.locator('a.go-to-bag-btn button');


    //Cart
    this.cartProduct1 = page.locator('div.card.product-info').first();
    this.cartProduct1Name = this.cartProduct1.locator('a.line-item-name-link');
    this.cartProduct1Quantity = this.cartProduct1
      .locator('select.form-control.quantity.custom-select')
      .filter({ visible: true });
    this.cartProduct1Remove = this.cartProduct1.locator('button.remove-product');
    this.cartProduct1Price = this.cartProduct1.locator('.line-item-total-price-amount').nth(1);
    this.cartCheckoutButton = page.locator("div.checkout-continue .checkout-btn").nth(1);
    this.cartTermsCheckbox = page.locator('input[name="termsofservice"], #termsofservice').first();
    this.cartRemoveConfirmButton = page.getByRole('button', { name: /yes,\s*remove/i });
  }

  async cookieAccept() {
    if (await this.acceptCookies.isVisible()) {
      await this.acceptCookies.click();
    }
    await expect(this.acceptCookies).not.toBeVisible();
  }

  async goTo(url: string) {
    await this.page.goto(url);
  }

  async goToMensTops() {
    await this.mainMenuMens.hover();
    await this.mensTops.click();
    await expect(this.firstProduct).toBeVisible();
  }

  async openFirstProduct() {
    await this.firstProduct.click();
    await expect(this.firstAvailableSize).toBeVisible();
  }

  async addFirstAvailableSizeToBag() {
    await this.firstAvailableSize.click();
    await expect(this.buyNowButton).toBeEnabled();
    await this.buyNowButton.click();
    await expect(this.modal).toBeVisible();
    await expect(this.addToBagModalText).toHaveText('Added to your bag', { ignoreCase: true });
  }

  async goToBagFromModal() {
    await this.addToBagModalGoToBag.click();
    await expect(this.cartProduct1).toBeVisible();
    await expect(this.cartProduct1Quantity).toBeVisible();
  }

  async addFirstAvailableSizeToBagAndOpenCart() {
    await this.addFirstAvailableSizeToBag();
    await this.goToBagFromModal();
  }

  async getCartProduct1Price(): Promise<number> {
    const priceText = await this.cartProduct1Price.textContent();
    return parseFloat(priceText!.replace('£', '').trim());
  }

  async proceedToCheckout() {
    if (await this.cartTermsCheckbox.isVisible()) {
      await this.cartTermsCheckbox.check();
    }
    await this.cartCheckoutButton.click();
    await this.cookieAccept();
  }

  async setCartQuantity(quantity: string | number) {
    const value = String(quantity);
    const quantityControl = this.cartProduct1Quantity;
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes('Cart-UpdateQuantity') && response.status() === 200,
      ),
      quantityControl.selectOption(value),
    ]);
    await expect(quantityControl).toHaveValue(value);
  }

  async changeCountryToUk() {
    await this.countrySelector.selectOption({ value: 'uk' });
    await expect(this.countrySelector).toHaveValue('uk');
  }

  private searchUrlMatchesTerm(url: URL, term: string) {
    return (
      url.pathname.includes('/search') &&
      url.searchParams.get('q')?.toLowerCase() === term.toLowerCase()
    );
  }

  private async submitSearch(term: string, submit: () => Promise<void>) {
    await this.searchInput.fill(term);
    await Promise.all([
      this.page.waitForURL((url) => this.searchUrlMatchesTerm(url, term)),
      submit(),
    ]);
  }

  async search(term: string) {
    await this.submitSearch(term, () => this.searchSubmit.click());
    await expect(this.searchResults.first()).toBeVisible();
  }

  async searchWithNoResults(term: string) {
    await this.submitSearch(term, () => this.searchSubmit.click());
  }

  async typeInSearch(term: string) {
    await this.searchInput.fill(term);
  }

  async expectAutocompleteVisible() {
    await expect(this.searchAutocompleteListbox).toBeVisible();
  }

  async selectAutocompleteSuggestion(name: string | RegExp) {
    await this.searchAutocompleteListbox.getByRole('link', { name }).click();
    await expect(this.searchResults.first()).toBeVisible();
  }

  async openFirstSearchResult() {
    await this.searchResults.first().click();
    await expect(this.firstAvailableSize).toBeVisible();
  }
  async removeCartItem() {
    await this.cartProduct1Remove.click();
    await this.cartRemoveConfirmButton.click();
    await expect(this.cartProduct1).not.toBeVisible();
  }
}
