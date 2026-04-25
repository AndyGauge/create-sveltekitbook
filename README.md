# create-sveltekitbook

Scaffold a SvelteKit book in seconds.

```sh
npm create sveltekitbook@latest my-book
```

You'll be walked through a handful of choices, then a working SvelteKit
project drops onto disk. `npm run dev` and the book is live.

## See it

[**sveltekitbook-tour**](https://andygauge.github.io/sveltekitbook-tour/) —
a sample book that explains the format itself. Source: [AndyGauge/sveltekitbook-tour](https://github.com/AndyGauge/sveltekitbook-tour).

[**By Degrees**](https://andygauge.github.io/by-degrees/) — U.S. policy
mapped on a −5..+5 spectrum. The first book built on this format.

## What you get

**Always:**
- Cover page (`/`)
- Content pages (`/NN` one per section)
- View-transition-animated left/right navigation
- Wheel + touch swipe + keyboard nav
- The [`sveltekitbook`](https://www.npmjs.com/package/sveltekitbook) runtime as a dependency

**Continuum format** — the axis every page lives on:
- **none** — flat sequence, no viz
- **timeline** — pages carry a `year`, rendered as dots on a decade axis
- **spectrum** — pages carry a `spectrum` integer, rendered as colored dots across a −N..+N ramp with per-page palette shifts

**Optional rooms** (checkbox each):
- **Contents** — grouped list of every section (recommended)
- **Glossary** — define terms once; reference them from any body with `[[term]]` and they auto-link
- **Index** — cross-reference page listing every occurrence of every indexed term
- **Authors / Sources** — citation hub (matronae-style)
- **Topics** — thematic grouping (déjà vu-style)
- **About / Colophon** — front matter
- **Continuum page** — standalone full-width timeline or spectrum viz

## Editing the book

Content lives in `src/lib/outline.js`. Every section is a plain object —
add fields, reorder, drop. Page numbers are assigned automatically by
the sort order you define.

Routes live in `src/routes/`. They're yours — edit freely.

## Sibling: create-sveltekitslides

[`create-sveltekitslides`](https://www.npmjs.com/package/create-sveltekitslides)
is the slide-deck counterpart. Same scroll model, same `outline.js`
philosophy, different chrome — every slide is a long page where the
projected slide sits above the fold and rehearsal notes scroll into
view below it. Use this package for long-form reader-driven content;
use slides for twenty- to forty-minute talks.
