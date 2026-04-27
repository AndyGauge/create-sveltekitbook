// Chaptered book. Sections are still linear (page numbers run end-to-end), but
// each one carries the chapter it belongs to. Group consecutive same-`chapterId`
// sections and you get the chapter list — no separate tree to maintain.

const raw = [
  {
    chapterId: 'beginnings',
    chapterNum: 1,
    chapterTitle: 'Beginnings',
    chapterIntro: 'A short opening chapter to set up the format. Each chapter starts with a one-line intro that renders above its first section.',
    title: 'First section',
    gesture: 'Open with the thing you want the reader to remember.',
    body: 'Then explain it. Use **bold** for emphasis, *italic* sparingly. Cite sources. Link out freely.',
    eli5: 'Plain-language version of the same point, so a reader with no background can follow.'
  },
  {
    chapterId: 'beginnings',
    chapterNum: 1,
    chapterTitle: 'Beginnings',
    title: 'Second section',
    gesture: 'Each section gets a short hook — one sentence the reader could quote back.',
    body: 'Sections within a chapter share `chapterId`. Keep them in reading order; chapters are derived from this array, not declared separately.'
  },
  {
    chapterId: 'beginnings',
    chapterNum: 1,
    chapterTitle: 'Beginnings',
    title: 'Third section',
    gesture: 'A section without `eli5` just omits that block. Every optional field is optional.',
    body: 'Write only what matters.'
  },
  {
    chapterId: 'middles',
    chapterNum: 2,
    chapterTitle: 'Middles',
    chapterIntro: 'A new `chapterId` opens the next chapter. Page numbers keep counting from where the previous chapter left off.',
    title: 'Crossing over',
    gesture: 'When the reader hits the first section of a new chapter, the chapter intro renders above the section title.',
    body: 'Reaching this section, the reader sees a "Chapter 2 — Middles" header and the chapter intro before the section content.'
  },
  {
    chapterId: 'middles',
    chapterNum: 2,
    chapterTitle: 'Middles',
    title: 'Last section',
    gesture: 'The bottom nav shows the next chapter when you reach the end of a chapter.',
    body: 'Use the chapter rail at the top to jump between chapters. Use prev/next at the bottom to walk linearly.'
  },
  {
    chapterId: 'middles',
    chapterNum: 2,
    chapterTitle: 'Middles',
    title: 'Code-led section',
    gesture: 'For tutorials and explainers, the `steps` field lets a section alternate prose and code in a strict rhythm.',
    steps: [
      {
        prose: 'A step is one short prose paragraph followed by one code block. Steps render in order, prose-code-prose-code, no other ordering allowed.',
        code: '// pseudo-code\nlet section = {\n  steps: [\n    { prose: "...", code: "...", lang: "rust" }\n  ]\n};',
        lang: 'js'
      },
      {
        prose: 'The next step explains what just happened, then shows the next thing. The reader\'s eye moves down the page in a predictable cadence.',
        code: 'fn explain(step) {\n  render(step.prose);\n  render(step.code);\n}',
        lang: 'rust'
      },
      {
        prose: 'Use this when the code is the argument and prose is connective tissue. For prose-led sections, leave `steps` off and use `body` as before.',
        code: '// flat list field, free-form prose\nbody: "longer essay-style text..."',
        lang: 'js'
      }
    ]
  }
];

export const flat = raw.map((s, i) => ({
  ...s,
  num: String(i + 1).padStart(2, '0'),
  orderIndex: i
}));

function buildChapters(sections) {
  const order = [];
  const map = new Map();
  for (const s of sections) {
    if (!map.has(s.chapterId)) {
      map.set(s.chapterId, {
        id: s.chapterId,
        num: s.chapterNum,
        title: s.chapterTitle,
        intro: s.chapterIntro || '',
        sections: []
      });
      order.push(s.chapterId);
    }
    map.get(s.chapterId).sections.push(s);
  }
  return order.map((id) => map.get(id));
}

export const chapters = buildChapters(flat);

export function next(num) {
  const i = flat.findIndex((s) => s.num === num);
  return i >= 0 && i < flat.length - 1 ? flat[i + 1] : null;
}

export function prev(num) {
  const i = flat.findIndex((s) => s.num === num);
  return i > 0 ? flat[i - 1] : null;
}

export function chapterOf(num) {
  const s = flat.find((s) => s.num === num);
  return s ? chapters.find((c) => c.id === s.chapterId) : null;
}

export function chapterIndexOf(num) {
  const c = chapterOf(num);
  return c ? chapters.indexOf(c) : -1;
}

export function nextChapter(num) {
  const i = chapterIndexOf(num);
  return i >= 0 && i < chapters.length - 1 ? chapters[i + 1] : null;
}

export function prevChapter(num) {
  const i = chapterIndexOf(num);
  return i > 0 ? chapters[i - 1] : null;
}

export function isFirstOfChapter(num) {
  const c = chapterOf(num);
  return c ? c.sections[0].num === num : false;
}

export function isLastOfChapter(num) {
  const c = chapterOf(num);
  return c ? c.sections[c.sections.length - 1].num === num : false;
}

export function positionInChapter(num) {
  const c = chapterOf(num);
  if (!c) return null;
  const i = c.sections.findIndex((s) => s.num === num);
  return { index: i, total: c.sections.length };
}
