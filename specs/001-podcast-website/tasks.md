---

description: "Task list for the Podcast Website feature"
---

# Tasks: Podcast Website

**Input**: Design documents from `/specs/001-podcast-website/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Included. plan.md and quickstart.md define Vitest (data and formatting) and Playwright with
axe-core (routes, responsive, keyboard, accessibility) as the validation approach for the spec's
success criteria. Within each user story, write the e2e test first and confirm it fails before
implementing.

**Organization**: Tasks are grouped by user story so each can be implemented and tested on its own.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story the task belongs to (US1-US4)
- All paths are relative to the repository root

## Path Conventions

Single Next.js project at the repository root: `src/app`, `src/components`, `src/data`, `src/lib`,
`tests/unit`, `tests/e2e`, `public/fonts` (see plan.md, Project Structure).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and tooling

- [X] T001 Create `package.json` (scripts: `dev`, `build` = `next build`, `start` = serve the `out/` directory locally, `test:unit` = `vitest run`, `test:e2e` = `playwright test`) and install `next@15`, `react@19`, `react-dom@19`, `typescript`, `@types/node`, `@types/react`, `@types/react-dom`, `vitest`, `@playwright/test`, `@axe-core/playwright`, and a static file server for `start`; commit the generated `package-lock.json`
- [X] T002 [P] Create `tsconfig.json` with strict mode, the Next.js plugin, and a `@/*` path alias to `src/*`
- [X] T003 [P] Create `next.config.ts` with `output: 'export'`, `trailingSlash: true`, and `images: { unoptimized: true }`
- [X] T004 [P] Create `vitest.config.ts` (node environment, include `tests/unit/**/*.test.ts`, honour the `@/*` alias)
- [X] T005 [P] Create `playwright.config.ts` that serves the built `out/` directory, with a desktop project and a 320px-wide mobile project, and test directory `tests/e2e`
- [X] T006 [P] Create `.gitignore` covering `node_modules/`, `.next/`, `out/`, `test-results/`, and `playwright-report/`
- [X] T007 [P] Add one open-licensed (e.g. OFL) variable font file and its license text under `public/fonts/` for self-hosting

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Content data, helpers, global styling, and the shared page shell that every story uses

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 [P] Create `src/data/show.ts` exporting the `Show` and `Host` types and one show record (placeholder content). `name`: required, non-empty. `tagline`: required, non-empty, one line. `description`: required, 1-3 short paragraphs. `hosts`: required, at least 1. Each host `name`: required, non-empty; `bio`: required, non-empty
- [X] T009 [P] Create `src/data/episodes.ts` exporting the `Episode` type and exactly 20 mock episodes. `number`: required integer 1-20, unique. `title`: required, non-empty. `publishedOn`: required ISO date `YYYY-MM-DD`, valid calendar date. `durationSeconds`: required integer > 0. `description`: required, non-empty short summary. `featured`: optional boolean, and exactly one episode has `true` (default: the newest, episode 20). A higher `number` MUST have a later `publishedOn`. Conform to `specs/001-podcast-website/contracts/episode-data.schema.json`
- [X] T010 [P] Create `src/data/faq.ts` exporting the `FaqEntry` type and about 10 entries. `question`: required, non-empty, unique. `answer`: required, non-empty plain-text paragraph. Cover where to listen, publishing frequency, how to get in touch, and who the hosts are
- [X] T011 [P] Create `src/lib/format.ts` with `formatDate(isoDate)` (human-readable, UTC-fixed so output never depends on build timezone) and `formatDuration(seconds)` (`MM:SS`, or `H:MM:SS` at one hour or more)
- [X] T012 Create `src/lib/episodes.ts` with `getEpisodesNewestFirst()` (ordered by `number` descending) and `getFeaturedEpisode()` (the episode with `featured: true`), importing from `src/data/episodes.ts` (depends on T009)
- [X] T013 [P] Create `tests/unit/data.test.ts` asserting the invariants from data-model.md: exactly 20 episodes, unique numbers 1-20, valid ISO dates, positive integer durations, exactly one featured episode, higher number means later date, unique FAQ questions, non-empty show fields, and at least one host (depends on T008, T009, T010)
- [X] T014 [P] Create `tests/unit/format.test.ts` covering `formatDate` and `formatDuration`, including durations under and over one hour (depends on T011)
- [X] T015 Create `src/app/globals.css` with CSS custom-property design tokens (dark-first palette meeting WCAG AA contrast, fluid type scale via `clamp()`, spacing, gradient accents), base element styles, a visible focus style, a skip-link style, mobile-first layout with no horizontal overflow at 320px, and `@media (prefers-reduced-motion: reduce)` rules that remove decorative animation
- [X] T016 [P] Create `src/components/SiteHeader.tsx` and `SiteHeader.module.css`: a `<header>` with a `<nav>` of four always-visible links to `/`, `/episodes/`, `/about/`, `/faq/` in that order, with `aria-current="page"` on the current page's link; links must fit at 320px without a hamburger menu
- [X] T017 [P] Create `src/components/SiteFooter.tsx` and `SiteFooter.module.css`: a `<footer>` with the show name and a short line of text
- [X] T018 [P] Create `src/components/CoverArt.tsx` and `CoverArt.module.css`: decorative CSS/SVG artwork whose gradient and shape derive deterministically from an episode `number` prop, with `aria-hidden="true"` and no raster images
- [X] T019 Create `src/app/layout.tsx`: load the self-hosted font from `public/fonts/` via `next/font/local` with a system-font fallback, import `globals.css`, set `<html lang="en">`, render a skip link to `#main` as the first focusable element, then `SiteHeader`, `<main id="main">`, `SiteFooter`, and default site metadata (depends on T007, T015, T016, T017)
- [X] T020 Create `src/app/not-found.tsx`: friendly message, a link back to `/`, rendered inside the shared layout and exported as `404.html` (FR-013) (depends on T019)

**Checkpoint**: Foundation ready. Run `npm run test:unit`; all unit tests pass and user story work can begin.

---

## Phase 3: User Story 1 - Discover the show on the landing page (Priority: P1) 🎯 MVP

**Goal**: A visitor sees a distinctive landing page with the show's identity, exactly one featured
episode, and navigation to the rest of the site.

**Independent Test**: Build the site and open `/`. It shows the show name, tagline, exactly one featured
episode (title, date, duration, summary), a link to `/episodes/`, and the four header links.

### Tests for User Story 1 ⚠️

> **NOTE: Write this test FIRST and confirm it FAILS before implementation**

- [X] T021 [P] [US1] Create `tests/e2e/landing.spec.ts`: `/` has one `<h1>` with the show name, the tagline is visible, exactly one featured-episode block shows number, title, date, duration, and description, the episodes call-to-action navigates to `/episodes/`, and the four header links are present

### Implementation for User Story 1

- [X] T022 [P] [US1] Create `src/components/FeaturedEpisode.tsx` and `FeaturedEpisode.module.css`: large editorial treatment of one episode using `CoverArt`, `formatDate`, and `formatDuration`
- [X] T023 [US1] Create `src/app/page.tsx`: `<h1>` with the show name, tagline from `src/data/show.ts`, `FeaturedEpisode` fed by `getFeaturedEpisode()`, a call-to-action link to `/episodes/`, a unique page `<title>` and meta description, with the featured episode and show name visible above the fold on desktop (depends on T022)

**Checkpoint**: User Story 1 is fully functional and testable on its own (MVP).

---

## Phase 4: User Story 2 - Browse all episodes (Priority: P2)

**Goal**: A visitor can scan all 20 episodes, newest first, with the key details for each.

**Independent Test**: Open `/episodes/`. All 20 episodes are listed newest first, each with number, title,
date, duration, and description, and the featured episode is included.

### Tests for User Story 2 ⚠️

- [X] T024 [P] [US2] Create `tests/e2e/episodes.spec.ts`: `/episodes/` lists exactly 20 items ordered by number descending, every item shows number, title, date, duration, and description, and the featured episode from `/` also appears in the list

### Implementation for User Story 2

- [X] T025 [P] [US2] Create `src/components/EpisodeCard.tsx` and `EpisodeCard.module.css`: compact list item with `CoverArt`, number, title, formatted date and duration, and description, handling long titles and descriptions without overlap or overflow
- [X] T026 [US2] Create `src/app/episodes/page.tsx`: one `<h1>`, a list of `EpisodeCard` from `getEpisodesNewestFirst()`, a unique `<title>` and meta description (depends on T025)

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Learn about the show (Priority: P3)

**Goal**: A visitor understands what the show is about and who hosts it.

**Independent Test**: Open `/about/`. It shows the show description and one section per host with name and bio.

### Tests for User Story 3 ⚠️

- [X] T027 [P] [US3] Create `tests/e2e/about.spec.ts`: `/about/` has one `<h1>`, shows the show description, and has one section per host with name and bio

### Implementation for User Story 3

- [X] T028 [US3] Create `src/app/about/page.tsx` (with an optional `about.module.css`): one `<h1>`, the show description, and a section per host from `src/data/show.ts`, with a unique `<title>` and meta description

**Checkpoint**: User Stories 1-3 work independently.

---

## Phase 6: User Story 4 - Get answers on the FAQ page (Priority: P3)

**Goal**: A visitor reads answers to common questions without leaving the page or needing JavaScript.

**Independent Test**: Open `/faq/`. Every question is listed, selecting a question reveals its answer on
the same page, and all answers are present in the HTML.

### Tests for User Story 4 ⚠️

- [X] T029 [P] [US4] Create `tests/e2e/faq.spec.ts`: `/faq/` lists every entry from `src/data/faq.ts` as a `<details>` closed by default, activating a `<summary>` by mouse and by keyboard reveals its answer, and every answer exists in the page HTML

### Implementation for User Story 4

- [X] T030 [P] [US4] Create `src/components/FaqList.tsx` and `FaqList.module.css`: a list of native `<details>`/`<summary>` elements with a visible focus state and a clear open/closed indicator
- [X] T031 [US4] Create `src/app/faq/page.tsx`: one `<h1>`, `FaqList` fed by `src/data/faq.ts`, a unique `<title>` and meta description (depends on T030)

**Checkpoint**: All four user stories are independently functional.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Cross-page requirements, final design pass, and quickstart validation

- [X] T032 [P] Create `tests/e2e/navigation.spec.ts`: from each of the four pages every other page is reachable in one click, the current page's link has `aria-current="page"`, and an unknown URL shows the not-found page with a link back to `/` (SC-002, FR-002, FR-013)
- [X] T033 [P] Create `tests/e2e/accessibility.spec.ts`: axe-core reports no serious or critical violations on all four pages and the not-found page, the skip link is the first tab stop, and every link and FAQ entry is reachable by keyboard alone (FR-012, SC-005)
- [X] T034 [P] Create `tests/e2e/responsive.spec.ts`: at 320px width no page has horizontal scrolling, at a large desktop width content stays centered and readable, and pages make no requests to other origins (FR-011, SC-005)
- [X] T035 Review all pages at about 360px and on a wide desktop display and refine `src/app/globals.css` and the component styles for a polished, distinctive look: consistent tokens, hover and focus states, restrained motion, and long-text handling (FR-010, SC-006)
- [X] T036 [P] Create `README.md` documenting prerequisites and the commands to install, develop, build, preview, and test the site
- [X] T037 Run all scenarios in `specs/001-podcast-website/quickstart.md` (`npm ci`, `npm run build`, `npm run test:unit`, `npm run test:e2e`, manual reduced-motion check, and a no-JavaScript check) and fix any failures

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies. T001 first; T002-T007 can then run in parallel.
- **Foundational (Phase 2)**: Depends on Setup and BLOCKS all user stories.
  - T008-T011 are independent; T012 needs T009; T013 needs T008-T010 and T012; T014 needs T011.
  - T015-T018 are independent of the data tasks; T019 needs T007, T015, T016, T017; T020 needs T019.
- **User Stories (Phase 3-6)**: All depend on Foundational completion. They can then run in parallel or in
  priority order (P1 → P2 → P3 → P3).
- **Polish (Phase 7)**: Depends on all desired user stories being complete. T035 and T037 come last.

### User Story Dependencies

- **US1 (P1)**: After Foundational. No dependency on other stories.
- **US2 (P2)**: After Foundational. Independent of US1 (uses its own `EpisodeCard`).
- **US3 (P3)**: After Foundational. Independent of US1 and US2.
- **US4 (P3)**: After Foundational. Independent of US1-US3.

### Within Each User Story

- The e2e test is written first and must fail before implementation.
- Components before the page that uses them.
- A story is complete (and its test passes) before moving to the next priority.

### Parallel Opportunities

- Setup: T002-T007 in parallel after T001.
- Foundational: T008, T009, T010, T011, T015, T016, T017, T018 in parallel; then T013 and T014 in parallel.
- After Foundational, all four stories can proceed in parallel since they touch separate files.
- Within a story, the test task and the component task are marked [P] (different files).
- Polish: T032, T033, T034, T036 in parallel.

---

## Parallel Example: Foundational Phase

```bash
# Launch the independent data and shell tasks together:
Task: "Create src/data/show.ts (T008)"
Task: "Create src/data/episodes.ts (T009)"
Task: "Create src/data/faq.ts (T010)"
Task: "Create src/lib/format.ts (T011)"
Task: "Create src/components/SiteHeader.tsx (T016)"
Task: "Create src/components/CoverArt.tsx (T018)"
```

## Parallel Example: User Story 1

```bash
# Test and component together (different files):
Task: "Create tests/e2e/landing.spec.ts (T021)"
Task: "Create src/components/FeaturedEpisode.tsx (T022)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: build and run `tests/e2e/landing.spec.ts`; check the page at desktop and 360px widths
5. Demo if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add US1 → test independently → demo (MVP)
3. Add US2 → test independently → demo
4. Add US3 → test independently → demo
5. Add US4 → test independently → demo
6. Polish → full quickstart validation

---

## Notes

- [P] tasks touch different files and have no dependencies on incomplete tasks
- The [Story] label maps each task to its user story for traceability
- Version control is handled by the project owner; tasks do not include git steps
- Stop at any checkpoint to validate the story on its own
- Avoid vague tasks, same-file conflicts, and cross-story dependencies that break independence
