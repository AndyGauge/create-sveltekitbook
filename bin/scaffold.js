// Scaffolding — takes the answers object, writes files. Pure enough to unit
// test without going through `prompts`.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEMPLATES = path.resolve(__dirname, '..', 'templates');

function slug(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function substitute(text, ctx) {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (key in ctx) return String(ctx[key]);
    return `{{${key}}}`;
  });
}

function copyTree(srcDir, destRoot, ctx) {
  if (!fs.existsSync(srcDir)) return;
  const stack = [''];
  while (stack.length) {
    const rel = stack.pop();
    const abs = path.join(srcDir, rel);
    const stat = fs.statSync(abs);
    if (stat.isDirectory()) {
      const entries = fs.readdirSync(abs);
      for (const name of entries) stack.push(path.join(rel, name));
    } else {
      const destRel = rel.replace(/__dot__/g, '.');
      const dest = path.join(destRoot, substitute(destRel, ctx));
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      const body = fs.readFileSync(abs, 'utf8');
      fs.writeFileSync(dest, substitute(body, ctx));
    }
  }
}

function buildNavLinks(roomSet) {
  const links = [];
  if (roomSet.has('contents')) links.push(`<a href="{base}/contents">Contents</a>`);
  if (roomSet.has('glossary')) links.push(`<a href="{base}/glossary">Glossary</a>`);
  if (roomSet.has('book-index')) links.push(`<a href="{base}/book-index">Index</a>`);
  if (roomSet.has('authors')) links.push(`<a href="{base}/authors">Authors</a>`);
  if (roomSet.has('topics')) links.push(`<a href="{base}/topics">Topics</a>`);
  if (roomSet.has('about')) links.push(`<a href="{base}/about">About</a>`);
  if (roomSet.has('continuum-page')) links.push(`<a href="{base}/continuum">Continuum</a>`);
  return links.join('\n      ');
}

/**
 * @param {{
 *   dest: string, dir: string, title: string, author: string,
 *   githubRepo: string, continuum: 'none'|'timeline'|'spectrum',
 *   spectrumRange: number, rooms: string[],
 *   structure?: 'flat'|'chaptered'
 * }} answers
 */
export function scaffold(answers) {
  const { dest, dir, title, author, githubRepo, continuum, spectrumRange } = answers;
  const structure = answers.structure || 'flat';

  const rooms = new Set(answers.rooms || []);
  if (continuum === 'none') rooms.delete('continuum-page');

  const ctx = {
    dir,
    slug: slug(title || dir),
    title,
    titleEscaped: title.replace(/"/g, '\\"'),
    author,
    authorEscaped: author.replace(/"/g, '\\"'),
    githubRepo,
    giscusRepo: githubRepo,
    giscusRepoId: '',
    giscusCategory: 'General',
    giscusCategoryId: '',
    continuum,
    spectrumRange,
    year: new Date().getFullYear(),
    hasContents: rooms.has('contents'),
    hasGlossary: rooms.has('glossary'),
    hasIndex: rooms.has('book-index'),
    hasAuthors: rooms.has('authors'),
    hasTopics: rooms.has('topics'),
    hasAbout: rooms.has('about'),
    hasContinuumPage: rooms.has('continuum-page'),
    navLinks: buildNavLinks(rooms),
    glossaryImport: rooms.has('glossary')
      ? `import { GLOSSARY } from '$lib/glossary.js';`
      : '',
    mdOpts: rooms.has('glossary')
      ? `{ glossary: GLOSSARY, glossaryBase: base + '/glossary' }`
      : '{}'
  };

  fs.mkdirSync(dest, { recursive: true });
  copyTree(path.join(TEMPLATES, 'base'), dest, ctx);
  copyTree(path.join(TEMPLATES, 'continuum', continuum), dest, ctx);
  if (continuum === 'spectrum') {
    copyTree(path.join(TEMPLATES, 'continuum', `spectrum-${spectrumRange}`), dest, ctx);
  }
  for (const room of rooms) {
    if (room === 'continuum-page') {
      copyTree(path.join(TEMPLATES, 'rooms', 'continuum-page', continuum), dest, ctx);
    } else {
      copyTree(path.join(TEMPLATES, 'rooms', room), dest, ctx);
    }
  }
  if (structure !== 'flat') {
    copyTree(path.join(TEMPLATES, 'structure', structure), dest, ctx);
  }
}
