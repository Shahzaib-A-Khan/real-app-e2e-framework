import { test, expect } from '@playwright/test';

test('internal links on the home page are not broken', async ({ page, request }) => {
  test.setTimeout(90_000);

  await page.goto('/');

  const hrefs = await page
    .locator('a[href*="flycomforttravel.com"], a[href^="/"]')
    .evaluateAll(links => links.map(a => (a as HTMLAnchorElement).href));

  const urls = [...new Set(hrefs)].filter(
    h => h.startsWith('http') && !h.includes('#') && !h.includes('wp-login') && !h.endsWith('.pdf')
  );

  console.log(`Checking ${urls.length} internal links`);
  expect(urls.length).toBeGreaterThan(5);

  // Check links in small concurrent batches: much faster than one at a time,
  // and gentle on a live site.
  const batchSize = 5;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const responses = await Promise.all(batch.map(url => request.get(url)));
    responses.forEach((response, j) => {
      expect.soft(response.status(), batch[j]).toBeLessThan(400);
    });
  }
});