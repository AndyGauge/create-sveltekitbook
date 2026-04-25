// The book. One object per page, in reading order.
// Page numbers (01, 02, …) are assigned automatically based on this order.

const raw = [
  {
    title: 'First section',
    gesture: 'Open with the thing you want the reader to remember.',
    body: 'Then explain it. Use **bold** for emphasis, *italic* sparingly. Cite sources. Link out freely.',
    citation: '',
    link: '',
    eli5: 'Plain-language version of the same point, so a reader with no background can follow.'
  },
  {
    title: 'Second section',
    gesture: 'Every section gets a short hook — one sentence the reader could quote back.',
    body: 'The body is the argument, the context, the texture. Keep it under 400 words if you can — this is a one-page format.',
    eli5: 'If you can\'t explain it plainly, you haven\'t landed it yet.'
  },
  {
    title: 'Third section',
    gesture: 'A section without an `eli5` field just omits that block. Every optional field is optional.',
    body: 'Write only what matters.'
  }
];

export const flat = raw.map((s, i) => ({
  ...s,
  num: String(i + 1).padStart(2, '0'),
  orderIndex: i
}));

export function next(num) {
  const i = flat.findIndex((s) => s.num === num);
  return i >= 0 && i < flat.length - 1 ? flat[i + 1] : null;
}

export function prev(num) {
  const i = flat.findIndex((s) => s.num === num);
  return i > 0 ? flat[i - 1] : null;
}
