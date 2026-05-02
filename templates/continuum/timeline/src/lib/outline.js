// The book. Each section carries a `year` — reading order is chronological.
// Sequential page numbers (01, 02, …) are assigned after sort.

const raw = [
  {
    title: 'The first event',
    year: 1950,
    // tldr: one-line summary used for unfurl previews (Slack, iMessage, etc).
    // Optional — pages without it just unfurl with the title only.
    tldr: 'A one-sentence summary that will appear when this page\'s URL is pasted into Slack or iMessage.',
    hook: 'A one-sentence hook the reader could quote back.',
    body: 'Body paragraph. Use **bold** for emphasis, *italic* sparingly.',
    eli5: 'Plain-language version of the same point.'
  },
  {
    title: 'A later moment',
    year: 1995,
    hook: 'Another turning point — note how the year drives position.',
    body: 'You can drop `eli5` or `body` on any section. Only `title`, `year`, and `hook` are recommended.',
    citation: 'Source, *Journal*, Year.',
    link: 'https://example.com'
  },
  {
    title: 'The present',
    year: 2024,
    hook: 'The timeline widget at the bottom of every page positions you here.'
  }
];

export const flat = raw
  .map((s) => ({ ...s }))
  .sort((a, b) => a.year - b.year)
  .map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0'), orderIndex: i }));

export const YEAR_MIN = Math.min(...flat.map((s) => s.year));
export const YEAR_MAX = Math.max(...flat.map((s) => s.year));

export function next(num) {
  const i = flat.findIndex((s) => s.num === num);
  return i >= 0 && i < flat.length - 1 ? flat[i + 1] : null;
}

export function prev(num) {
  const i = flat.findIndex((s) => s.num === num);
  return i > 0 ? flat[i - 1] : null;
}
