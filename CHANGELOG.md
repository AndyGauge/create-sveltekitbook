# Changelog

All notable changes to `create-sveltekitbook` are recorded here. Format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Versioning rule of thumb (mirrors `CLAUDE.md`):
- New scaffolder feature (room, continuum, structure) → minor.
- Bug fix or doc-only → patch.
- Breaking change to scaffolded output's directory layout, prompt API,
  or template variables → major.

## [Unreleased]

### Changed
- **Breaking:** the per-section pull-quote field is now `hook` instead
  of `gesture`. The old name collided with `sveltekitbook/gestures`,
  the runtime pager — "gesture" properly belongs to interaction design
  (swipe, tap, drag), not to a piece of typographic content. The
  pager module keeps its name; only the data field was renamed.
  Existing books need to rename `gesture:` → `hook:` in `outline.js`
  and `[[gesture]]` → `[[hook]]` in any body text. The slug
  template's CSS class, glossary entry, and example outlines were
  updated to match.

### Fixed
- `[slug]/+page.svelte` templates now style links in body copy.
  External links rendered by `md`/`mdBlock` get a solid accent
  underline; `[[term]]` glossary links get a dotted underline.
  Previously the scaffolded `app.css` stripped all link styling
  globally and per-page CSS only re-added it for nav/source/glossary
  contexts, so external links inside `body`, `hook`, `eli5`, and
  `citation` rendered as invisible plain text.
- Glossary page definitions (`dd`) now also style links the same
  way — definitions can contain `[label](url)` links too.

## [0.3.0] — 2026-05-01

### Added
- New `Site URL` prompt — auto-derives a `https://{user}.github.io/{repo}`
  default from the GitHub repo answer; blank disables canonical/og:url.
- `SITE_URL` export added to the scaffolded `src/lib/config.js`.
- `tldr` field example added to every `outline.js` template (none,
  timeline, spectrum-3, spectrum-5, chaptered).
- `<PageMeta>` block wired into all four `[slug]/+page.svelte` templates
  so deployed pages unfurl in Slack / iMessage / Discord with the book
  title, page title, and the section's `tldr`.

### Changed
- Scaffolded `package.json` now depends on `sveltekitbook ^0.3.0`
  (required for the `mdBlock` export — see below).
- All four `[slug]/+page.svelte` templates render multi-paragraph fields
  (section bodies, ELI5 blocks, chaptered chapter intros) with `mdBlock`
  inside `<div>` wrappers instead of inline `md` inside `<p>` wrappers.
  CSS adds `:global(p)` margin rules so paragraphs are spaced.

### Fixed
- Section bodies, ELI5 blocks, and chapter intros containing blank
  lines (`\n\n`) now render as separate paragraphs. Previously the
  templates wrapped these fields in a single `<p>` and called the
  inline-only `md()` helper — which preserved `\n\n` as whitespace
  but never produced `<p>` boundaries, so multi-paragraph source
  rendered as one collapsed wall of text.

## [0.2.0] — 2026-04-27

### Added
- `chaptered` structure: sections grouped into chapters with chapter nav,
  prose/code step rhythm, chapter rail at the top, roman-numeral chapter
  numbering. Selectable from the new `Structure` prompt.
- `CLAUDE.md` documenting template-layering order and release notes.

## [0.1.1] — 2026-04-25

### Added
- README: section linking to `create-sveltekitslides` (slide-deck sibling).
- README: links to `sveltekitbook-tour` and `By Degrees` reference books.

## [0.1.0] — 2026-04-25

### Added
- Initial scaffolder. `npm create sveltekitbook` walks the user through
  prompts and writes a working SvelteKit book to disk.
- Continuum formats: `none` (flat sequence), `timeline` (year axis),
  `spectrum` (−N..+N axis with 7- or 11-stop range).
- Optional rooms: contents, glossary (`[[term]]` auto-linking), index,
  authors, topics, about, continuum-page.
- Templated wiring for Giscus comments, view transitions, and the
  `sveltekitbook` runtime helpers package.
