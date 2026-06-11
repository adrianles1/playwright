import { test, expect } from '@playwright/test';
import { Superdry } from '../pages/Superdry/superdry.page';
import { createSuperdryOnHome } from '../helpers/superdry.setup';

let superdry: Superdry;

test.describe('Add to bag', () => {
  test.beforeEach(async ({ page }) => {
    superdry = await createSuperdryOnHome(page);
  });

  test('Navigation - open Mens Tops listing', async () => {
    await superdry.goToMensTops();
    await expect(superdry.firstProduct).toBeVisible();
  });

  test('PDP - open first product and see available size', async () => {
    await superdry.goToMensTops();
    await superdry.openFirstProduct();
    await expect(superdry.firstAvailableSize).toBeVisible();
  });

  test('Add to bag - happy path', async () => {
    await superdry.goToMensTops();
    await superdry.openFirstProduct();
    await superdry.addFirstAvailableSizeToBag();
  });

  test('Guard - add to bag modal is hidden before user action', async () => {
    await superdry.goToMensTops();
    await superdry.openFirstProduct();
    await expect(superdry.modal).not.toBeVisible();
  });

  test('Negative - unavailable size is not selectable', async () => {
    await superdry.goToMensTops();
    await superdry.openFirstProduct();

    const unavailableSizeCount = await superdry.unavailableSizes.count();
    test.skip(
      unavailableSizeCount === 0,
      'No unavailable sizes present on this product today.',
    );

    const firstUnavailableSize = superdry.unavailableSizes.first();
    await firstUnavailableSize.click();
    await expect(superdry.buyNowButton).not.toBeVisible();
  });
});
