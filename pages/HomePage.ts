import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly menuToggle: Locator;
  readonly headerLinks: Record<string, Locator>;
  readonly footerLinks: Record<string, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator('#header').getByRole('link', { name: 'Fly Comfort Travel' });
    this.menuToggle = page.getByRole('link', { name: 'Mobile Menu Toggle' });
    this.headerLinks = {
      'Flights': page.getByRole('link', { name: 'Flights' }),
      'Hotels': page.getByRole('link', { name: 'Hotels' }),
      'Tours': page.getByRole('link', { name: 'Tours' }),
      'Umrah Packages': page.getByRole('link', { name: 'Umrah Packages' }),
      'Covid FAQs': page.getByRole('link', { name: 'Covid FAQs' }),
      'Contact us': page.getByRole('link', { name: 'Contact us', exact: true }),
    };
    this.footerLinks = {
      'Terms & Conditions': page.getByRole('link', { name: 'Terms & Conditions' }),
    };
  }

  async goto() {
    await this.page.goto('/');
  }

  async openMenuIfNeeded() {
    if (await this.menuToggle.isVisible()) {
      await this.menuToggle.click();
    }
  }

  async goToHeaderLink(name: string) {
    await this.openMenuIfNeeded();
    await this.headerLinks[name].click();
  }
}