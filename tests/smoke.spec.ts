import { test, expect } from '@playwright/test';

const pages = [
  { name: 'Flights', path: '/flights/' },
  { name: 'Hotels', path: '/hotel/' },
  { name: 'Tours', path: '/tour-home/' },
  { name: 'Umrah Packages', path: '/umrah-packages/' },
  { name: 'Contact us', path: '/contact-us/' },
];

test('home page loads with the brand title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Fly Comfort Travel/);
});

for (const p of pages) {
  test(`${p.name} page loads successfully`, async ({ page }) => {
    const response = await page.goto(p.path);
    expect(response?.status()).toBe(200);
  });
}