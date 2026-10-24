# Data Model: Podcast Website

All data is static and embedded in source modules under `src/data/`. There is no persistence layer, no
mutation, and therefore no state transitions.

## Show

Single record in `src/data/show.ts`. Used on the landing page, about page, header, and footer.

| Field | Type | Rules |
|-------|------|-------|
| `name` | string | Required, non-empty |
| `tagline` | string | Required, non-empty, one line |
| `description` | string | Required, 1-3 short paragraphs for the about page |
| `hosts` | Host[] | Required, at least 1 |

**Host**

| Field | Type | Rules |
|-------|------|-------|
| `name` | string | Required, non-empty |
| `bio` | string | Required, non-empty |

## Episode

Array of exactly 20 records in `src/data/episodes.ts`.

| Field | Type | Rules |
|-------|------|-------|
| `number` | integer | Required, 1-20, unique across all episodes |
| `title` | string | Required, non-empty |
| `publishedOn` | string | Required, ISO date `YYYY-MM-DD`, valid calendar date |
| `durationSeconds` | integer | Required, > 0 |
| `description` | string | Required, non-empty, short summary |
| `featured` | boolean | Optional; exactly one episode in the data set has `true` |

**Invariants** (enforced by unit tests):
- The array holds exactly 20 episodes.
- `number` values are unique.
- Exactly one episode is `featured`. By default this is the newest episode (spec assumption).
- Higher `number` means a later `publishedOn` date, so sorting by date descending equals sorting by
  number descending.

**Derived values** (computed, not stored):
- `displayDate`: `publishedOn` formatted in a UTC-fixed, human-readable style.
- `displayDuration`: `durationSeconds` formatted as `MM:SS` or `H:MM:SS`.
- `coverArt`: gradient and shape parameters derived deterministically from `number`.

## FaqEntry

Array of about 10 records in `src/data/faq.ts`.

| Field | Type | Rules |
|-------|------|-------|
| `question` | string | Required, non-empty, unique |
| `answer` | string | Required, non-empty, plain text (paragraph) |

Entries render in array order.

## Relationships

- The featured episode is one of the 20 episodes. It appears both on the landing page and in the
  episodes list.
- Show, Episode, and FaqEntry are otherwise independent.
