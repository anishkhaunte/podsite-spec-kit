# Contract: Site Routes and Page Content

The site's only external interface is the set of pages a visitor can request. Output is a static
directory; each route below maps to a file in `out/`.

## Routes

| URL | Output file | Page |
|-----|-------------|------|
| `/` | `index.html` | Landing page |
| `/episodes/` | `episodes/index.html` | Episodes page |
| `/about/` | `about/index.html` | About page |
| `/faq/` | `faq/index.html` | FAQ page |
| any other URL | `404.html` | Not-found page |

All routes respond to GET only. There are no forms, APIs, query parameters, or cookies.

## Shared across all pages

- A `<header>` landmark with a `<nav>` containing links to `/`, `/episodes/`, `/about/`, `/faq/`, in
  that order. The link for the current page carries `aria-current="page"`.
- A `<main>` landmark containing exactly one `<h1>`.
- A `<footer>` landmark.
- A document `<title>` unique to the page, and a meta description.
- A skip link to `<main>` as the first focusable element.

## `/` Landing page

- `<h1>` shows the show name; the tagline is visible near it.
- Exactly one featured episode block showing number, title, display date, display duration, and
  description.
- A link to `/episodes/`.

## `/episodes/`

- A list of exactly 20 episodes ordered by `number` descending.
- Each item shows number, title, display date, display duration, and description.
- The featured episode appears in the list like any other.

## `/about/`

- The show description and one section per host (name and bio).

## `/faq/`

- Each FAQ entry is a `<details>` with its question in `<summary>` and its answer as content.
- All entries are closed by default. Answers remain in the HTML so they are available without
  JavaScript.

## Not-found page

- Friendly message and a link back to `/`, plus the shared header and footer.

## Data contract

Episode records conform to [episode-data.schema.json](./episode-data.schema.json).
