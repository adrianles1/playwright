import { Page } from '@playwright/test';
import { Superdry } from '../pages/Superdry/superdry.page';

export const SUPERDRY_HOME = 'https://www.superdry.com/';

export async function createSuperdryOnHome(page: Page) {
  const superdry = new Superdry(page);
  await superdry.goTo(SUPERDRY_HOME);
  await superdry.cookieAccept();
  return superdry;
}

export async function createSuperdryWithCartItem(page: Page) {
  const superdry = await createSuperdryOnHome(page);
  await superdry.goToMensTops();
  await superdry.openFirstProduct();
  await superdry.addFirstAvailableSizeToBagAndOpenCart();
  return superdry;
}
