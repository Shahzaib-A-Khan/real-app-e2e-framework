# real-app-e2e-framework
![Playwright Tests](https://github.com/Shahzaib-A-Khan/real-app-e2e-framework/actions/workflows/playwright.yml/badge.svg)
Playwright and TypeScript end-to-end tests for a live travel agency website (flycomforttravel.com), built with the Page Object Model. Every check is read-only: no forms are submitted and no accounts are used.

## What's covered
- **Smoke tests:** the home page title and the main pages return HTTP 200
- **Navigation:** every header and footer link opens the right page, on desktop and on a phone layout
- **Link health:** every visible internal link on the home page responds without an error
- **Known-bug tracking:** failing behavior is recorded with `test.fail()` so the suite stays green while the bug exists and flags the day it gets fixed

## Findings
- **The four "View Packages" buttons in the Tour Packages section of the home page do not navigate.** Each button's link points to the home page itself, so clicking reloads the page. Verified manually in Chrome (including incognito) and tracked in `tests/tour-packages.spec.ts`.

## Design decisions
- `pages/HomePage.ts` holds the locators and actions for the home page, so tests never repeat locators.
- On phones the header links sit behind a menu toggle. `openMenuIfNeeded()` opens it only when it is visible, so one set of tests runs on both layouts.
- Role-based locators (`getByRole`) are preferred. Tests avoid asserting on prices or promotional text, which change often.
- A separate precondition test proves the four tour buttons exist, so the known-bug tests cannot "fail" because of a broken locator.

## Setup
npm ci
npx playwright install

## Run the tests
npx playwright test --project=chromium
npx playwright test navigation.spec.ts --project=mobile-chrome

## Project structure
- `pages/` : page objects
- `tests/` : smoke, navigation, link health and known-bug tests
- `playwright.config.ts` : desktop browsers plus a Pixel 7 phone project

 **Phone layout, footer links:** in CI (Pixel 7 emulation on Linux), the "Fly Comfort Travel" footer heading covers the center of the "Terms & Conditions" link, so Playwright refuses to click it. The footer link column is very narrow there. Not yet confirmed whether real visitors are affected. The phone-layout test for this link is marked `fixme` in `tests/navigation.spec.ts`.