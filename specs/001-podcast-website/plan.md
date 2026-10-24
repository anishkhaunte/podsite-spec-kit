# Implementation Plan: Podcast Website

**Branch**: `001-podcast-website` | **Date**: 2026-10-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-podcast-website/spec.md`

## Summary

Build a sleek four-page podcast site (landing with one featured episode, episodes, about, FAQ) plus a
not-found page. The site is a Next.js App Router project configured for static export, so the build
output is a directory of plain HTML, CSS, and JS. All content, including the 20 mock episodes, lives
in typed source modules in the repo: no database, no feed, no runtime server. Styling uses plain CSS
with design tokens (no UI framework) and is mobile-first from 320px up. The FAQ uses native
disclosure elements so it works without JavaScript.

## Technical Context

**Language/Version**: TypeScript 5.x on Node.js 20 LTS (the local environment runs Node 20.12)

**Primary Dependencies**: Next.js 15 (App Router, `output: 'export'`), React 19. No UI or CSS framework.

**Storage**: N/A. Content is embedded as typed TypeScript modules in `src/data/`.

**Testing**: Vitest for data and utility unit tests; Playwright (with axe-core) against the exported
site for routing, responsive, keyboard, and accessibility checks.

**Target Platform**: Static hosting/CDN serving the `out/` directory; current evergreen browsers
(desktop and mobile).

**Project Type**: Web application (static front end only)

**Performance Goals**: Each page usable in under 2 seconds on typical broadband (SC-004); landing page
shows show identity and featured episode above the fold on desktop (SC-001).

**Constraints**: No server-side runtime; no third-party scripts or runtime network requests; no
horizontal scroll at 320px width; fonts self-hosted; reduced-motion respected; reproducible build
from a clean checkout.

**Scale/Scope**: 5 routes (4 pages plus not-found), 20 episodes, about 10 FAQ entries, 1 show profile.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|-----------|------|--------|
| I. Static-Only Delivery | Build produces plain static files; no server runtime or DB | PASS: `output: 'export'`, data in source modules |
| II. Simplicity | Each dependency and build step justified | PASS: Next.js is the user's choice; no Tailwind or component library; test tools justified in research.md |
| III. Accessibility & Responsiveness | Semantic HTML, keyboard use, alt text, 320px+ | PASS: native `<details>` FAQ, landmark layout, `aria-current` nav, axe checks in e2e tests |
| IV. Performance & Privacy | No third-party scripts, sized images, usable without JS | PASS: self-hosted font, CSS-generated cover art (no raster images), prerendered HTML |
| V. Reproducible Build | Clean checkout builds with documented commands | PASS: lockfile committed, `npm ci && npm run build`, commands in quickstart.md |

**Post-design re-check (after Phase 1)**: All gates still PASS. The design adds no server code,
third-party requests, or dependencies beyond those listed in research.md.

## Project Structure

### Documentation (this feature)

```text
specs/001-podcast-website/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   ├── site-routes.md
│   └── episode-data.schema.json
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
package.json
package-lock.json
next.config.ts               # output: 'export', trailingSlash, unoptimized images
tsconfig.json
playwright.config.ts
vitest.config.ts

public/
└── fonts/                   # self-hosted variable font (open license)

src/
├── app/
│   ├── layout.tsx           # html shell, font, header, footer, metadata
│   ├── globals.css          # design tokens, base styles, reduced-motion rules
│   ├── page.tsx             # landing page (featured episode)
│   ├── episodes/page.tsx    # all 20 episodes, newest first
│   ├── about/page.tsx
│   ├── faq/page.tsx
│   └── not-found.tsx        # exported as 404.html
├── components/
│   ├── SiteHeader.tsx       # nav with current-page indication
│   ├── SiteFooter.tsx
│   ├── FeaturedEpisode.tsx
│   ├── EpisodeCard.tsx
│   ├── CoverArt.tsx         # CSS/SVG artwork derived from episode number
│   └── FaqList.tsx          # <details>/<summary> list
├── data/
│   ├── show.ts              # name, tagline, description, hosts
│   ├── episodes.ts          # the 20 mock episodes
│   └── faq.ts
└── lib/
    ├── episodes.ts          # getEpisodesNewestFirst(), getFeaturedEpisode()
    └── format.ts            # deterministic (UTC) date and duration formatting

tests/
├── unit/                    # data integrity and formatting (Vitest)
└── e2e/                     # routes, responsive, keyboard, axe (Playwright)
```

**Structure Decision**: A single Next.js project at the repository root with `src/` for application
code. There is no backend, so the frontend/backend split is not used. Content is separated from
presentation (`src/data/` vs `src/components/`) so placeholder content can be replaced without
touching UI code.

## Complexity Tracking

No constitution violations; no justifications required.
