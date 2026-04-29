#!/usr/bin/env node
// create-sveltekitbook — walk the user through a handful of choices, then
// write a working SvelteKit project to disk.

import { scaffold } from './scaffold.js';
import prompts from 'prompts';
import path from 'node:path';
import fs from 'node:fs';

const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`
};

async function main() {
  const argv = process.argv.slice(2);
  const dirArg = argv.find((a) => !a.startsWith('--'));

  console.log();
  console.log(c.bold('  create-sveltekitbook'));
  console.log(c.dim('  A SvelteKit book in a few keystrokes.'));
  console.log();

  const onCancel = () => {
    console.log(c.dim('\n  cancelled.'));
    process.exit(0);
  };

  const a = await prompts(
    [
      {
        type: dirArg ? null : 'text',
        name: 'dir',
        message: 'Directory',
        initial: 'my-book',
        validate: (v) => (v && v.trim() ? true : 'Required')
      },
      { type: 'text', name: 'title', message: 'Book title', initial: 'Untitled' },
      { type: 'text', name: 'author', message: 'Author', initial: '' },
      {
        type: 'text',
        name: 'githubRepo',
        message: 'GitHub repo (user/name, for Pages + Giscus — leave blank to skip)',
        initial: ''
      },
      {
        type: 'text',
        name: 'siteUrl',
        message: 'Site URL (for unfurl previews — leave blank to skip)',
        initial: (prev, values) => {
          const repo = values.githubRepo || '';
          const m = /^([^/]+)\/(.+)$/.exec(repo.trim());
          return m ? `https://${m[1]}.github.io/${m[2]}` : '';
        }
      },
      {
        type: 'select',
        name: 'structure',
        message: 'Structure',
        choices: [
          { title: 'Flat — one linear sequence of sections', value: 'flat' },
          { title: 'Chaptered — sections grouped into chapters with chapter nav', value: 'chaptered' }
        ],
        initial: 0
      },
      {
        type: (prev) => (prev === 'chaptered' ? null : 'select'),
        name: 'continuum',
        message: 'Continuum format',
        choices: [
          { title: 'None — flat sequence', value: 'none' },
          { title: 'Timeline — year axis', value: 'timeline' },
          { title: 'Spectrum — −N..+N axis', value: 'spectrum' }
        ],
        initial: 0
      },
      {
        type: (prev) => (prev === 'spectrum' ? 'select' : null),
        name: 'spectrumRange',
        message: 'Spectrum range',
        choices: [
          { title: '−3 … +3  (7 stops)', value: 3 },
          { title: '−5 … +5  (11 stops)', value: 5 }
        ],
        initial: 0
      },
      {
        type: 'multiselect',
        name: 'rooms',
        message: 'Additional rooms (space to toggle, enter to confirm)',
        choices: [
          { title: 'Contents — grouped list of every section', value: 'contents', selected: true },
          { title: 'Glossary — [[term]] auto-linking', value: 'glossary' },
          { title: 'Index — term cross-reference', value: 'book-index' },
          { title: 'Authors / Sources — citations', value: 'authors' },
          { title: 'Topics — thematic grouping', value: 'topics' },
          { title: 'About / Colophon', value: 'about' },
          { title: 'Continuum page — standalone viz', value: 'continuum-page' }
        ],
        hint: '- space to toggle · a to toggle all · enter to submit'
      }
    ],
    { onCancel }
  );

  const dir = dirArg || a.dir;
  const dest = path.resolve(process.cwd(), dir);
  if (fs.existsSync(dest) && fs.readdirSync(dest).length > 0) {
    console.error(c.red('✖ ') + `${dir} exists and is not empty`);
    process.exit(1);
  }

  scaffold({
    dest,
    dir,
    title: a.title || 'Untitled',
    author: a.author || '',
    githubRepo: a.githubRepo || '',
    siteUrl: (a.siteUrl || '').trim().replace(/\/$/, ''),
    structure: a.structure || 'flat',
    continuum: a.structure === 'chaptered' ? 'none' : a.continuum,
    spectrumRange: a.spectrumRange || 0,
    rooms: a.rooms || []
  });

  console.log();
  console.log(c.green('  ✔ ') + `scaffolded into ${c.bold(dir)}`);
  console.log();
  console.log('  Next:');
  console.log(c.cyan(`    cd ${dir}`));
  console.log(c.cyan('    npm install'));
  console.log(c.cyan('    npm run dev'));
  console.log();
  if (a.githubRepo) {
    console.log(c.dim('  Before comments work, open https://giscus.app for'));
    console.log(c.dim(`  ${a.githubRepo}, copy REPO_ID and CATEGORY_ID into src/lib/config.js.`));
    console.log();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
