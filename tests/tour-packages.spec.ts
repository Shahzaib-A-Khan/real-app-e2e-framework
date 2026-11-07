import { test, expect, Page } from '@playwright/test';

const tiles = ['Safari', 'Indian Ocean', 'Middle-East', 'Holy Places'];
const viewPackages = (page: Page) => page.locator('a:has-text("View Packages")');

test('home page shows four View Packages buttons', async ({ page }) => {
  await page.goto('/');
  await expect(viewPackages(page)).toHaveCount(4);
});

test.describe('tour package tiles (known bug)', () => {
  tiles.forEach((tile, index) => {
    test(`"${tile}" View Packages button opens a packages page`, async ({ page }) => {
      test.fail(true, 'Known bug: the View Packages buttons link to the home page');
      await page.goto('/');
      await viewPackages(page).nth(index).click();
      await expect(page).not.toHaveURL(/flycomforttravel\.com\/?$/, { timeout: 2000 });
    });
  });
});