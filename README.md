# Open Frequency: podcast website

A sleek, static podcast site built with Next.js (App Router, static export). It has a landing page with
one featured episode, an episodes page (20 mock episodes), an about page, and an FAQ page. All content is
sample data embedded in the repo (`src/data/`); there is no database, feed, or server runtime.

## Prerequisites

- Node.js 20 (20.12 or newer) and npm

## Commands

```bash
npm ci                              # install exact dependencies from the lockfile
npm run dev                         # local development server
npm run build                       # build the static site into out/
npm run start                       # preview the built out/ directory at http://localhost:3000
npm run test:unit                   # Vitest: data and formatting checks
npx playwright install chromium     # one-time browser download for e2e tests
npm run test:e2e                    # Playwright + axe: run after `npm run build`
```

The `out/` directory can be deployed to any static host.

## Editing content

- Show name, tagline, and hosts: `src/data/show.ts`
- Episodes (exactly 20, one `featured`): `src/data/episodes.ts`
- FAQ entries: `src/data/faq.ts`

Run `npm run test:unit` after editing; it enforces the data rules (20 episodes, unique numbers, exactly
one featured, newest has the latest date).

## Project documents

Specification, plan, and tasks live in `specs/001-podcast-website/`. The project constitution is in
`.specify/memory/constitution.md`. See [SPEC-KIT-README.md](./SPEC-KIT-README.md) for how Spec Kit
was used to build this site and why it is part of our workflow.
