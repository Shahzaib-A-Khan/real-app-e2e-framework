import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly links: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('#header').getByRole('link', { name: 'Fly Comfort Travel' });
    this.links = {
      'Flights': page.getByRole('link', { name: 'Flights' }),
      'Hotels': page.getByRole('link', { name: 'Hotels' }),
      'Tours': page.getByRole('link', { name: 'Tours' }),
      'Umrah Packages': page.getByRole('link', { name: 'Umrah Packages' }),
      'Covid FAQs': page.getByRole('link', { name: 'Covid FAQs' }),
      'Contact us': page.getByRole('link', { name: 'Contact us', exact: true }),
      'Terms & Conditions': page.getByRole('link', { name: 'Terms & Conditions' }),
    };
  }

  async goto() {
    await this.page.goto('/');
  }
}