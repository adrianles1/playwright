import { test, expect } from '@playwright/test';
import { Superdry } from '../pages/Superdry/superdry.page';
import { createSuperdryOnHome } from '../helpers/superdry.setup';

let superdry: Superdry;
test.describe('Search', () => {
  test.beforeEach(async ({ page }) => {
    superdry = await createSuperdryOnHome(page);
  });

  test('Search - input is visible on homepage', async () => {
    await expect(superdry.searchInput).toBeVisible();
    await expect(superdry.searchSubmit).toBeVisible();
  });

  test('Search - valid term returns product results', async ({ page }) => {
    const term = 'polo';
    await superdry.search(term);

    await expect(page).toHaveURL(/\/search\?q=polo/i);
    await expect(page).toHaveTitle(new RegExp(term, 'i'));
    await expect(superdry.searchResults.first()).toBeVisible();
  });

  test('Search - results contain the search term', async () => {
    const term = 'polo';
    await superdry.search(term);

    const firstResultName = await superdry.searchResults.first().innerText();
    expect(firstResultName.toLowerCase()).toContain(term);
  });

  test('Search - no results for unknown term', async ({ page }) => {
    const term = 'zzzznotaproduct12345';
    await superdry.searchWithNoResults(term);

    await expect(page).toHaveURL(new RegExp(`/search\\?q=${term}`, 'i'));
    await expect(superdry.searchResults).toHaveCount(0);
  });

  test('Search - open first result navigates to PDP', async () => {
    await superdry.search('polo');
    await superdry.openFirstSearchResult();
    await expect(superdry.firstAvailableSize).toBeVisible();
  });

  test('Search - autocomplete suggestions appear while typing', async () => {
    await superdry.typeInSearch('hoodie');
    await superdry.expectAutocompleteVisible();
    await expect(superdry.searchAutocompleteListbox.getByRole('link').first()).toBeVisible();
  });

  test('Search - autocomplete suggestion navigates to results', async ({ page }) => {
    await superdry.typeInSearch('hoodie');
    await superdry.expectAutocompleteVisible();
    await superdry.selectAutocompleteSuggestion(/hoodies/i);

    await expect(page).toHaveURL(/\/search/i);
    await expect(superdry.searchResults.first()).toBeVisible();
  });

  test('Search - refine search from results page', async ({ page }) => {
    await superdry.search('polo');
    await expect(superdry.searchResults.first()).toBeVisible();

    await superdry.search('jacket');

    await expect(page).toHaveURL(/\/search\?q=jacket/i);
    await expect(superdry.searchResults.first()).toBeVisible();
    const firstResultName = await superdry.searchResults.first().innerText();
    expect(firstResultName.toLowerCase()).toContain('jacket');
  });

  test('Search - case insensitive query in URL', async ({ page }) => {
    await superdry.search('POLO');

    await expect(page).toHaveURL(/\/search\?q=POLO/i);
    await expect(superdry.searchResults.first()).toBeVisible();
  });

  test('Search - multi word term', async ({ page }) => {
    const term = 'polo shirt';
    await superdry.search(term);

    await expect(page).toHaveURL((url) => url.searchParams.get('q')?.toLowerCase() === term);
    await expect(superdry.searchResults.first()).toBeVisible();
  });

  test('Search - different terms return different first result', async () => {
    await superdry.search('polo');
    const poloFirstResult = await superdry.searchResults.first().innerText();

    await superdry.search('jacket');
    const jacketFirstResult = await superdry.searchResults.first().innerText();

    expect(poloFirstResult).not.toEqual(jacketFirstResult);
  });

  test('Search returns more than one product', async () => {
    await superdry.search('polo');
    await expect.poll(async () => superdry.searchResults.count()).toBeGreaterThan(1);
  });

  test('Empty search stays on homepage', async ({ page }) => {
    await expect(superdry.searchInput).toHaveValue('');
    await superdry.searchSubmit.click();
    await expect(page).toHaveURL(/^https:\/\/www\.superdry\.com\/?$/);
    await expect(superdry.searchResults).toHaveCount(0);
  });

  test('Submit button is enabled before search', async () => {
    await expect(superdry.searchSubmit).toBeEnabled();
  });
});
