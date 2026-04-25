import {Page, Locator, expect} from '@playwright/test';

export class Superdry{
    readonly page: Page
    readonly acceptCookies: Locator
    readonly mainMenuMens: Locator;
    readonly mensTops: Locator;
    readonly firstProduct: Locator;
    readonly firstAvailableSize: Locator;
    readonly buyNowButton: Locator;
    readonly modal: Locator;
    readonly addToBagModalText: Locator;

    constructor(page:Page){
            this.page = page;
            //cookies
            this.acceptCookies = page.getByRole('button', {name:"Accept All Cookies"});

            //menus
            this.mainMenuMens = page.locator('#men-gb');
            this.mensTops = page.locator('.dropdown-menu .sub-column #tops-gb')

            //plp
            this.firstProduct = page.locator('.product-tile').first()

            //pdp
            this.firstAvailableSize = page.locator('.custom-product-size-button:not(.notify-me-available)').first();
            this.buyNowButton = page.getByRole('button', {name: "Add to bag", exact: true})
            this.modal = page.locator("#addToBag .modal-dialog")
            this.addToBagModalText = this.modal.locator(".add-to-bag-body");


    }

    async cookieAccept(){
        if(await this.acceptCookies.isVisible()){
            await this.acceptCookies.click();
            }
            await expect(this.acceptCookies).not.toBeVisible()
    }

    async goTo(url: string){
            await this.page.goto(url);

    }
}