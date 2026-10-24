# Quickstart: Validating the Podcast Website

Run these scenarios from the repository root once the feature is implemented. Route and content
expectations are defined in [contracts/site-routes.md](./contracts/site-routes.md); data rules are in
[data-model.md](./data-model.md).

## Prerequisites

- Node.js 20 or newer and npm.
- A Chromium build for Playwright (installed by the command below).

## Setup

```bash
npm ci
npx playwright install chromium
```

## Scenario 1: Clean build produces a static site

```bash
npm run build
```

**Expected**: The build succeeds and creates `out/` containing `index.html`, `episodes/index.html`,
`about/index.html`, `faq/index.html`, and `404.html`. No server runtime is required.

## Scenario 2: Data invariants hold

```bash
npm run test:unit
```

**Expected**: Tests pass, confirming 20 episodes, unique numbers, exactly one featured episode, and
newest-first ordering.

## Scenario 3: Pages behave as specified

```bash
npm run test:e2e
```

**Expected**: Tests run against the built `out/` directory and pass for:
- Landing page shows the show name and exactly one featured episode, and links to episodes (US1).
- Episodes page lists 20 episodes, newest first, each with all required details (US2).
- About page shows the show description and host information (US3).
- FAQ answers open and read on the same page (US4).
- Header links reach each page from every page in one action.
- An unknown URL shows the not-found page with a link home.
- No horizontal scroll at 320px wide; keyboard-only navigation reaches every link and FAQ entry.
- No serious or critical axe accessibility violations on any page.

## Scenario 4: Manual visual check

```bash
npm run start
```

`start` serves `out/` locally. Open the printed address and check:
- The landing page identifies the show and shows the featured episode without scrolling on a desktop
  screen.
- Layout holds at a phone width (about 360px) and on a wide desktop display.
- With the operating system's reduced-motion setting on, decorative animation is gone.
- Browser developer tools show no requests to other origins.

## Scenario 5: Works without JavaScript

Disable JavaScript in the browser and reload each page.

**Expected**: Content, navigation, and FAQ answers remain usable.
