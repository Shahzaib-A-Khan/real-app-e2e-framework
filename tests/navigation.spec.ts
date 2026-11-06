import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const destinations = [
  { name: 'Flights', url: /\/flights\// },
  { name: 'Hotels', url: /\/hotel\// },
  { name: 'Tours', url: /\/tour-home\// },
  { name: 'Umrah Packages', url: /\/umrah-packages\// },
  { name: 'Covid FAQs', url: /\/covid19-flight-update\// },
  { name: 'Contact us', url: /\/contact-us\// },
  { name: 'Terms & Conditions', url: /\/terms-conditions/ },
];

test.describe('site navigation', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  for (const d of destinations) {
    test(`${d.name} link opens the right page`, async ({ page }) => {
      await home.links[d.name].click();
      await expect(page).toHaveURL(d.url);
    });
  }

  test('logo returns to the home page', async ({ page }) => {
    await home.links['Flights'].click();
    await expect(page).toHaveURL(/\/flights\//);
    await home.logo.click();
    await expect(page).toHaveURL(/flycomforttravel\.com\/?$/);
  });
});
