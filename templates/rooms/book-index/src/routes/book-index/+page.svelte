<script>
  import { base } from '$app/paths';
  import { flat } from '$lib/outline.js';
  import { slug } from 'sveltekitbook/md';
  import { TITLE } from '$lib/config.js';

  // Build an index from every [[term]] occurrence across every section.
  // Terms are collected case-insensitively; the display form is the first
  // casing seen.
  const occurrences = new Map();
  const fields = ['hook', 'body', 'eli5', 'citation'];

  for (const s of flat) {
    for (const f of fields) {
      const text = s[f];
      if (!text) continue;
      const re = /\[\[([^\]]+)\]\]/g;
      let m;
      while ((m = re.exec(text)) !== null) {
        const term = m[1].trim();
        const key = term.toLowerCase();
        if (!occurrences.has(key)) {
          occurrences.set(key, { display: term, hits: [] });
        }
        const rec = occurrences.get(key);
        if (!rec.hits.find((h) => h.num === s.num)) {
          rec.hits.push({ num: s.num, title: s.title });
        }
      }
    }
  }

  const entries = Array.from(occurrences.values()).sort((a, b) =>
    a.display.localeCompare(b.display)
  );

  $effect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute(
      'style',
      '--bg:#ffffff;--ink:#14110d;--muted:rgba(20,17,13,0.56);--rule:rgba(20,17,13,0.16);--accent:#6a6a6a;'
    );
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'auto';
    return () => { document.body.style.overflow = prevOverflow; };
  });
</script>

<svelte:head><title>Index — {TITLE}</title></svelte:head>

<main class="page">
  <header class="top">
    <a class="mark" href="{base}/">{TITLE}</a>
    <nav class="top-nav"><a class="cover-link" href="{base}/">Cover ←</a></nav>
  </header>

  <div class="intro">
    <div class="kicker">Index</div>
    <h1>{entries.length} {entries.length === 1 ? 'term' : 'terms'} indexed</h1>
    <p class="sub">Every occurrence of <code>[[term]]</code> across every section.</p>
  </div>

  {#if entries.length === 0}
    <p class="empty">No <code>[[term]]</code> references yet. Mark terms in any section's body and they'll appear here.</p>
  {:else}
    <ul class="entries">
      {#each entries as e}
        <li class="entry">
          <a class="entry-term" href="{base}/glossary#{slug(e.display)}">{e.display}</a>
          <span class="hits">
            {#each e.hits as h, i}
              <a href="{base}/{h.num}">{h.num}</a>{i < e.hits.length - 1 ? ', ' : ''}
            {/each}
          </span>
        </li>
      {/each}
    </ul>
  {/if}
</main>

<style>
  .page { min-height: 100vh; min-height: 100dvh; padding: 4vw 7vw 6vw; display: flex; flex-direction: column; gap: 3vw; }
  .top { display: flex; justify-content: space-between; align-items: center; font-family: var(--sans); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.24em; color: var(--muted); }
  .mark { font-family: var(--serif); font-style: italic; font-size: 1rem; letter-spacing: 0; text-transform: none; color: var(--ink); }
  .cover-link { color: var(--muted); transition: color 160ms; }
  .cover-link:hover { color: var(--ink); }

  .intro { max-width: 1100px; }
  .kicker { font-family: var(--sans); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.28em; color: var(--muted); margin-bottom: 1.2rem; }
  h1 { font-family: var(--serif); font-weight: 300; font-style: italic; font-size: clamp(2.4rem, 6vw, 4.8rem); line-height: 0.98; letter-spacing: -0.025em; color: var(--ink); }
  .sub { font-family: var(--serif); font-style: italic; font-weight: 300; font-size: clamp(1rem, 1.3vw, 1.2rem); color: var(--muted); margin-top: 1.2rem; max-width: 52ch; }
  code { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.95em; background: rgba(20, 17, 13, 0.06); padding: 0 0.3em; border-radius: 3px; }

  .empty { max-width: 52ch; font-family: var(--serif); font-style: italic; color: var(--muted); }

  .entries { list-style: none; margin-top: 2rem; padding: 0; border-top: 1px solid var(--rule); }
  .entry { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 1.5rem; padding: 0.6rem 0; border-bottom: 1px dotted var(--rule); align-items: baseline; }
  .entry-term { font-family: var(--serif); font-style: italic; font-weight: 300; font-size: clamp(0.98rem, 1.15vw, 1.12rem); color: var(--ink); border-bottom: 1px dotted var(--rule); }
  .entry-term:hover { border-bottom-color: var(--accent); color: var(--accent); }
  .hits { font-family: var(--sans); font-size: 0.72rem; letter-spacing: 0.14em; color: var(--muted); }
  .hits a { color: var(--accent); }
  .hits a:hover { border-bottom: 1px solid var(--accent); }
</style>
