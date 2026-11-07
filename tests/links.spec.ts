import { test, expect } from '@playwright/test';

test('internal links on the home page are not broken', async ({ page, request }) => {
  await page.goto('/');

  const hrefs = await page
    .locator('a[href*="flycomforttravel.com"], a[href^="/"]')
    .evaluateAll(links => links.map(a => (a as HTMLAnchorElement).href));

  const urls = [...new Set(hrefs)].filter(
    h => h.startsWith('http') && !h.includes('#') && !h.includes('wp-login') && !h.endsWith('.pdf')
  );

  console.log(`Checking ${urls.length} internal links`);
  expect(urls.length).toBeGreaterThan(5);

  for (const url of urls) {
    const response = await request.get(url);
    expect.soft(response.status(), url).toBeLessThan(400);
  }
});