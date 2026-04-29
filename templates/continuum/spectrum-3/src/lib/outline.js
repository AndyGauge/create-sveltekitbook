// The book. Each section carries a `spectrum` value in [-3..+3] — reading
// order runs left to right along that axis. Ties are broken by optional
// `year` ascending, then insertion order.

export const SPECTRUM_MIN = -3;
export const SPECTRUM_MAX = 3;

export const SPECTRUM_LABELS = {
  [-3]: 'far left',
  [-2]: 'left',
  [-1]: 'lean left',
  [ 0]: 'center',
  [ 1]: 'lean right',
  [ 2]: 'right',
  [ 3]: 'far right'
};

const raw = [
  {
    title: 'A position on the left',
    spectrum: -2,
    // tldr: one-line summary used for unfurl previews (Slack, iMessage, etc).
    // Optional — pages without it just unfurl with the title only.
    tldr: 'A one-sentence summary that will appear when this page\'s URL is pasted into Slack or iMessage.',
    gesture: 'Short hook — the sentence the reader could quote back.',
    body: 'Body paragraph. Use **bold** for emphasis, *italic* sparingly.',
    eli5: 'Plain-language version.'
  },
  {
    title: 'The center',
    spectrum: 0,
    gesture: 'The neutral stop — mint green. Dark ink on every page.'
  },
  {
    title: 'A position on the right',
    spectrum: 2,
    gesture: 'Another position. The page\'s palette shifts based on where it sits on the spectrum.',
    body: 'Add `invert: true` to any section to flip it into a dark near-black palette — the outlier treatment.'
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
