// The book. Each section carries a `spectrum` value in [-5..+5] — reading
// order runs left to right along that axis. Ties are broken by optional
// `year` ascending, then insertion order.

export const SPECTRUM_MIN = -5;
export const SPECTRUM_MAX = 5;

export const SPECTRUM_LABELS = {
  [-5]: 'far left',
  [-3]: 'left',
  [-1]: 'lean left',
  [ 0]: 'center',
  [ 1]: 'lean right',
  [ 3]: 'right',
  [ 5]: 'far right'
};

const raw = [
  {
    title: 'Far left',
    spectrum: -4,
    // tldr: one-line summary used for unfurl previews (Slack, iMessage, etc).
    // Optional — pages without it just unfurl with the title only.
    tldr: 'A one-sentence summary that will appear when this page\'s URL is pasted into Slack or iMessage.',
    hook: 'Short hook — the sentence the reader could quote back.',
    body: 'Body paragraph. Use **bold** for emphasis, *italic* sparingly.',
    eli5: 'Plain-language version.'
  },
  {
    title: 'The center',
    spectrum: 0,
    hook: 'The neutral stop. Dark ink on a warm light palette.'
  },
  {
    title: 'Far right',
    spectrum: 4,
    hook: 'Another position. Page palette shifts per section.',
    body: 'Add `invert: true` to flip a section into the dark outlier palette.'
  }
];

export const flat = raw
  .map((s) => ({ ...s }))
  .sort((a, b) => a.spectrum - b.spectrum || (a.year ?? 0) - (b.year ?? 0))
  .map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0'), orderIndex: i }));

export function next(num) {
  const i = flat.findIndex((s) => s.num === num);
  return i >= 0 && i < flat.length - 1 ? flat[i + 1] : null;
}

export function prev(num) {
  const i = flat.findIndex((s) => s.num === num);
  return i > 0 ? flat[i - 1] : null;
}
