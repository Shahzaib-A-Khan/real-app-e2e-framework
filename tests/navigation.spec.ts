import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const destinations: { name: string; url: RegExp; area: 'header' | 'footer' }[] = [
  { name: 'Flights', url: /\/flights\//, area: 'header' },
  { name: 'Hotels', url: /\/hotel\//, area: 'header' },
  { name: 'Tours', url: /\/tour-home\//, area: 'header' },
  { name: 'Umrah Packages', url: /\/umrah-packages\//, area: 'header' },
  { name: 'Covid FAQs', url: /\/covid19-flight-update\//, area: 'header' },
  { name: 'Contact us', url: /\/contact-us\//, area: 'header' },
  { name: 'Terms & Conditions', url: /\/terms-conditions/, area: 'footer' },
];

test.describe('site navigation', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  for (const d of destinations) {
    test(`${d.name} link opens the right page`, async ({ page }, testInfo) => {
      test.fixme(
        testInfo.project.name === 'mobile-chrome' && d.area === 'footer',
        'Phone layout in CI: the "Fly Comfort Travel" footer heading covers the link, so the click is blocked'
      );
      if (d.area === 'header') {
        await home.goToHeaderLink(d.name);
      } else {
        await home.footerLinks[d.name].click();
      }
      await expect(page).toHaveURL(d.url);
    });
  }

  test('logo returns to the home page', async ({ page }) => {
    await home.goToHeaderLink('Flights');
    await expect(page).toHaveURL(/\/flights\//);
    await home.logo.click();
    await expect(page).toHaveURL(/flycomforttravel\.com\/?$/);
  });
});