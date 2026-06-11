import { test, expect } from '@playwright/test';
import { Superdry } from '../pages/Superdry/superdry.page';
import { createSuperdryWithCartItem } from '../helpers/superdry.setup';

let superdry: Superdry;

test.describe('Cart page', () => {
  test.beforeEach(async ({ page }) => {
    superdry = await createSuperdryWithCartItem(page);
  });

  test('Cart - line item is visible after add to bag', async () => {
    await expect(superdry.cartProduct1).toBeVisible();
    await expect(superdry.cartProduct1Name).toBeVisible();
  });

  test('Cart - default quantity is 1', async () => {
    await expect(superdry.cartProduct1Quantity).toHaveValue('1');
  });

  test('Cart - increase quantity to 2', async () => {
    await superdry.setCartQuantity('2');
    await expect(superdry.cartProduct1Quantity).toHaveValue('2');
  });

  test('Cart - increase quantity to 3', async () => {
    await superdry.setCartQuantity('3');
    await expect(superdry.cartProduct1Quantity).toHaveValue('3');
  });

  test('Cart - decrease quantity from 3 to 1', async () => {
    await superdry.setCartQuantity('3');
    await superdry.setCartQuantity('2');
    await superdry.setCartQuantity('1');
    await expect(superdry.cartProduct1Quantity).toHaveValue('1');
  });

  test('Cart - line item stays visible when quantity changes', async () => {
    const productName = await superdry.cartProduct1Name.textContent();
    await superdry.setCartQuantity('2');
    await expect(superdry.cartProduct1Name).toHaveText(productName ?? '');
    await superdry.setCartQuantity('1');
    await expect(superdry.cartProduct1Name).toHaveText(productName ?? '');
  });

  test('Cart - remove item from cart', async () => {
    await superdry.removeCartItem();
    await expect(superdry.cartProduct1).not.toBeVisible();
  });

  test('Cart totals update when quantity is changed', async () => {
    const productPriceBefore = await superdry.getCartProduct1Price();
    let quantity = 2;

    await superdry.setCartQuantity(quantity);

    const productPriceAfter = await superdry.getCartProduct1Price();
    expect(productPriceAfter).toBe(productPriceBefore * quantity);

    quantity = 3;
    await superdry.setCartQuantity(quantity);
    const productPriceAfter2 = await superdry.getCartProduct1Price();
    expect(productPriceAfter2).toBe(productPriceBefore * quantity);

    quantity = 1;
    await superdry.setCartQuantity(quantity);
    const productPriceAfter3 = await superdry.getCartProduct1Price();
    expect(productPriceAfter3).toBe(productPriceBefore * quantity);
  });
});
