# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

`create-sveltekitbook` is a `npm create` scaffolder. It runs once on a user's machine, asks a few questions via `prompts`, and writes a working SvelteKit project to disk. There is no app to build or test here — the "output" is the contents of `templates/` after substitution.

The companion runtime (gestures, markdown rendering, Giscus widget) ships as a separate npm package `sveltekitbook`, which scaffolded books pull in as a dependency. This repo doesn't depend on `sveltekitbook` itself.

## Running locally

```sh
node bin/index.js my-book        # interactive, writes to ./my-book
```

Pass a directory as the first non-flag arg to skip the directory prompt. There are no tests, no lint config, no build step. Edits are live — `node bin/index.js` always reads templates straight from disk.

To smoke-test scaffolded output:

```sh
node bin/index.js test-out && cd test-out && npm install && npm run dev
```

## Architecture

Two files do all the work:

- **`bin/index.js`** — interactive CLI. Builds an `answers` object from `prompts` and hands it to `scaffold()`. Prompt flow has conditional branches: `structure: chaptered` skips the continuum prompt; `continuum: spectrum` adds a range prompt.
- **`bin/scaffold.js`** — pure function `scaffold(answers)` that copies template trees to `dest`, doing string substitution along the way. Importable for unit-testing without going through `prompts`.

### Template layering

`scaffold()` copies several template subtrees on top of each other into `dest`, in this order:

1. `templates/base/` — always. Contains `package.json`, SvelteKit config, `+layout.svelte` with view-transition direction logic, the `[slug]/+page.js` loader, and `src/lib/config.js`.
2. `templates/continuum/{none|timeline|spectrum}/` — provides `outline.js`, the cover `+page.svelte`, and the section `[slug]/+page.svelte` for the chosen continuum.
3. `templates/continuum/spectrum-{3|5}/` — only for spectrum, supplies `palette.js` and a spectrum-flavored `outline.js` that overwrites the one from step 2.
4. `templates/rooms/{room}/` — once per room the user checked. `continuum-page` is special-cased to read from `templates/rooms/continuum-page/{timeline|spectrum}/`.
5. `templates/structure/chaptered/` — only when `structure === 'chaptered'`. Overwrites `outline.js`, the `[slug]` page, the cover, and the contents page with chapter-aware versions.

Later copies overwrite earlier ones — that's how `chaptered` swaps in its own renderer and `spectrum-N` swaps in its own outline. Order in `scaffold.js` is load-bearing; do not rearrange without thinking through which file wins.

### Substitution

`copyTree()` does two things to every file under a tree:
- File path: replaces `{{var}}` in path segments and decodes `__dot__` → `.` (so `__dot__gitignore` ships as `.gitignore` — npm refuses to publish files starting with `.`).
- File contents: replaces `{{var}}` with values from `ctx`. Unknown vars pass through unchanged.

The `ctx` object is built once in `scaffold()` and includes booleans like `hasGlossary`, `hasContents`, plus a few synthesized fragments (`navLinks`, `glossaryImport`, `mdOpts`) that get inlined into Svelte files. Templates do not have conditionals — selection happens by which trees get copied, and small per-template variations are handled by these pre-rendered fragment vars.

### Mutual exclusions enforced in code

- Chaptered structure forces `continuum: 'none'` (set in `bin/index.js` before calling `scaffold`).
- `continuum-page` room is silently dropped if `continuum === 'none'` (in `scaffold()`).

## Releasing

This package ships to npm as `create-sveltekitbook`. Cut a release after a feature PR is merged to `main`:

1. Bump `version` in `package.json` — semver, against what `npm view create-sveltekitbook version` reports. New scaffolder feature (new room, new continuum, new structure) → minor. Bug fix or doc-only → patch. Breaking change to scaffolded output's directory layout, prompt API, or template variables → major.
2. Move the `Unreleased` entries in `CHANGELOG.md` under a new `[X.Y.Z] — YYYY-MM-DD` heading. Keep an empty `Unreleased` section at the top for the next cycle.
3. Commit the bump + changelog on its own: `chore: release vX.Y.Z` (or follow the existing `X.Y.Z — short summary` style from the log).
4. Tag the release commit: `git tag vX.Y.Z` — annotated (`-a -m`) is fine but a lightweight tag is enough here.
5. Push both: `git push origin main && git push origin vX.Y.Z`.
6. `npm publish` from a clean working tree. The published tarball includes `bin/` and `templates/` only (per `files` in `package.json`) — verify with `npm pack --dry-run` if anything in those directories has been added or renamed.

Do NOT publish with uncommitted changes — what ships should match the tag exactly.

## When editing templates

- The `[slug]/+page.svelte` exists in three places (`continuum/none`, `continuum/timeline`, `continuum/spectrum`) and a fourth chaptered override (`structure/chaptered`). Behavior changes that should apply everywhere need to be made in all four. Each one has its own pager / keyboard / nav code — they are not shared.
- Outline shape is defined per-continuum (`flat` always exported; chaptered also exports `chapters`, `chapterOf`, etc.). New section fields go in the example `raw` array of every `outline.js` you want them to appear in.
- Files with literal `{{` `}}` that are NOT meant to be substituted will be silently mangled. There aren't any today; if you add one, escape or rework.
- Files in `templates/base/` whose names start with `.` must be named with `__dot__` prefix or they won't ship in the published tarball.
