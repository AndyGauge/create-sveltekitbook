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

**Structure** — how sections are grouped:
- **flat** (default) — one linear sequence of sections, page numbers run end-to-end
- **chaptered** — sections grouped into chapters; reader gets a chapter rail, chapter intros, `[`/`]` keys to jump between chapters, and a chapter-grouped contents page. Page numbering stays linear across the whole book; chapters are derived from each section's `chapterId`. Mutually exclusive with timeline / spectrum continua.

Chaptered sections can also use a `steps` array — a strict prose / code / prose / code rhythm, one step at a time:

```js
{
  title: 'Push',
  gesture: '...',
  steps: [
    { prose: 'First we mutate the list...', code: 'fn push(&mut self) { ... }', lang: 'rust' },
    { prose: 'Then we hand back the new head...', code: '...', lang: 'rust' }
  ]
}
```

If `steps` is present, the renderer pairs each prose chunk with its code block in order. Use it for tutorials and code-led explainers.

**Continuum format** — the axis every page lives on (flat structure only):
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
