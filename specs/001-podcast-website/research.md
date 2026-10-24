# Research: Podcast Website

All Technical Context items were resolved from the user's stated direction (Next.js, static export,
embedded mock data, responsive/mobile-ready) and the project constitution. No `NEEDS CLARIFICATION`
items remain.

## 1. Rendering and delivery

- **Decision**: Next.js App Router with `output: 'export'` and `trailingSlash: true`.
- **Rationale**: Produces a directory of static HTML/CSS/JS in `out/` (Constitution I). Trailing-slash
  output (`episodes/index.html`) works on any plain static host without rewrite rules. The not-found
  route exports as `404.html`, which most static hosts serve for unknown addresses (FR-013).
- **Alternatives considered**: Server-rendered Next.js (rejected: violates Principle I); Astro or plain
  HTML (rejected: user chose Next.js).

## 2. Language and Node version

- **Decision**: TypeScript on Node.js 20 LTS, Next.js 15, React 19.
- **Rationale**: Types catch data-shape mistakes in the mock content. Node 20 matches the local
  environment and is supported by Next.js 15.
- **Alternatives considered**: Plain JavaScript (rejected: weaker guarantees on the episode data shape);
  Next.js 16 (rejected for now: no requirement needs it).

## 3. Content storage

- **Decision**: Typed TypeScript modules in `src/data/` (`show.ts`, `episodes.ts`, `faq.ts`).
- **Rationale**: Meets "data is embedded in the content" and FR-009. Imported at build time, so no
  network or file reads at runtime. Types and unit tests enforce the 20-episode and single-featured
  invariants.
- **Alternatives considered**: JSON files (rejected: no type checking without extra tooling);
  MDX/Markdown content (rejected: unnecessary complexity for structured records); CMS or feed
  (rejected: out of scope per spec).

## 4. Styling

- **Decision**: Plain CSS: global stylesheet with CSS custom properties (design tokens) plus CSS Modules
  for component styles. Mobile-first with `min-width` breakpoints; fluid type via `clamp()`.
- **Rationale**: Adds no dependency (Principle II), supports the distinctive look through tokens, dark
  palette, gradients, and typographic scale, and keeps the CSS payload small (Principle IV).
- **Alternatives considered**: Tailwind CSS (rejected: extra dependency and build config for a
  four-page site); component libraries (rejected: generic look conflicts with the "stand out" goal).

## 5. Visual direction

- **Decision**: Dark-first, high-contrast design with a bold display typeface, large editorial
  typography, gradient accents, and generous whitespace. A `prefers-color-scheme: light` variant is
  optional and not required for v1. Subtle entrance and hover motion is disabled under
  `prefers-reduced-motion`.
- **Rationale**: Satisfies FR-010 and the edge case for reduced motion. Contrast ratios are checked
  against WCAG AA (FR-012).
- **Alternatives considered**: Light neutral template look (rejected: does not stand out).

## 6. Episode artwork

- **Decision**: Generate cover art in CSS/SVG from the episode number (deterministic gradient and
  shape), with no raster image files.
- **Rationale**: No image assets to source, size, or optimize; zero extra requests (Principle IV);
  decorative art gets empty alt text. Static export cannot use the default image optimizer anyway,
  so images would need `unoptimized: true`.
- **Alternatives considered**: Stock photos (rejected: licensing and weight); next/image with
  unoptimized flag (kept in reserve if real artwork is added later).

## 7. Fonts

- **Decision**: One self-hosted variable font under `public/fonts/` loaded through `next/font/local`,
  with a system-font fallback stack.
- **Rationale**: No third-party requests at runtime (Principle IV) and no network needed at build time
  (Principle V), unlike fetching fonts from a hosted service during the build.
- **Alternatives considered**: `next/font/google` (rejected: build depends on network access);
  system fonts only (rejected: weaker distinctive identity).

## 8. FAQ interaction

- **Decision**: Native `<details>`/`<summary>` elements.
- **Rationale**: Keyboard accessible and works without JavaScript by default (Principles III and IV,
  FR-008), with no component state.
- **Alternatives considered**: Custom JS accordion (rejected: more code and accessibility risk for the
  same behavior).

## 9. Navigation on small screens

- **Decision**: Four always-visible text links in the header that wrap or compress at 320px. No
  hamburger menu.
- **Rationale**: Only four destinations. This keeps navigation one action away from any page (SC-002)
  and needs no JavaScript.
- **Alternatives considered**: Hamburger drawer (rejected: extra interaction and state for no gain).

## 10. Date and duration formatting

- **Decision**: Store dates as ISO `YYYY-MM-DD` strings and format them with a UTC-fixed formatter at
  build time; store duration in whole seconds and format as `H:MM:SS` or `MM:SS`.
- **Rationale**: Deterministic output regardless of build machine timezone (Principle V).
- **Alternatives considered**: `Date` objects in data (rejected: timezone drift between builds).

## 11. Testing

- **Decision**: Vitest for unit tests of the data and formatting helpers; Playwright with axe-core
  against the exported `out/` directory for e2e checks.
- **Rationale**: Unit tests lock in invariants (20 episodes, exactly one featured, unique numbers,
  newest-first order). Playwright is the only practical way to verify SC-002, SC-005 (keyboard use,
  320px with no horizontal scroll), and accessibility on the real built output. Both are dev-only
  dependencies and ship nothing to visitors.
- **Alternatives considered**: Jest plus Testing Library (rejected: heavier setup than Vitest for this
  scope); manual checks only (rejected: not repeatable for responsive and accessibility criteria).

## 12. Hosting

- **Decision**: Hosting provider is not chosen in this plan; `out/` is host-agnostic.
- **Rationale**: Out of scope for the spec. Any static host works (Principle I).
