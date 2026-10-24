<!--
Sync Impact Report
- Version change: (unfilled template) → 1.0.0
- Modified principles: none renamed (all five were unfilled placeholders, now defined)
- Added sections: Core Principles I–V, Technical Constraints, Development Workflow, Governance
- Removed sections: none
- Deferred items: none
-->
# Podsite Constitution

## Core Principles

### I. Static-Only Delivery
The site MUST be built into plain static files (HTML, CSS, JS, assets) that can be served from any
static host or CDN. There MUST be no server-side runtime, database, or server-rendered request
handling in production. Rationale: static output is cheap, fast, and trivially hostable.

### II. Simplicity
Every feature MUST use the simplest approach that satisfies the spec. Dependencies, frameworks, and
build steps MUST be added only when a concrete requirement justifies them, and the justification
MUST be recorded in the plan. Rationale: a small surface area keeps a static site maintainable.

### III. Accessibility & Responsiveness
Pages MUST use semantic HTML, be keyboard navigable, provide alt text for meaningful images, and
render correctly from 320px viewport width upward. Rationale: baseline usability is a requirement,
not an enhancement.

### IV. Performance & Privacy
Pages MUST NOT load third-party scripts or trackers without an explicit spec requirement. Images
MUST be sized and compressed appropriately, and pages MUST remain usable without JavaScript
unless the spec states otherwise. Rationale: fast, private pages need no extra tooling to defend.

### V. Reproducible Build
The site MUST build from a clean checkout with documented commands and produce identical output
from identical inputs. Build output MUST NOT be hand-edited. Rationale: deployments must be
predictable and reversible.

## Technical Constraints

- Output MUST be deployable as a directory of static files with no environment-specific secrets.
- All links and asset references MUST resolve (no broken internal links) in the built output.
- Browser support covers the current stable releases of major evergreen browsers.

## Development Workflow

- Work MUST follow the Spec Kit flow: specify, plan, tasks, implement.
- Changes MUST be verified by building the site and checking affected pages in a browser before
  being considered complete.
- Reviews MUST confirm compliance with the principles above.

## Governance

This constitution supersedes other practices. Amendments MUST be made by editing this file,
stating the rationale, and bumping the version per semantic versioning: MAJOR for removed or
redefined principles, MINOR for added principles or materially expanded guidance, PATCH for
clarifications. Plans and reviews MUST check compliance, and any complexity that departs from a
principle MUST be justified in writing.

**Version**: 1.0.0 | **Ratified**: 2026-10-24 | **Last Amended**: 2026-10-24
