<script>
  import { base } from '$app/paths';
  import { flat, SPECTRUM_MIN, SPECTRUM_MAX, SPECTRUM_LABELS } from '$lib/outline.js';
  import { paletteFor } from '$lib/palette.js';
  import Spectrum from '$lib/Spectrum.svelte';
  import { TITLE } from '$lib/config.js';

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

  const buckets = [];
  for (let v = SPECTRUM_MIN; v <= SPECTRUM_MAX; v++) {
    const entries = flat.filter((s) => s.spectrum === v);
    if (entries.length > 0) buckets.push({ spectrum: v, entries, palette: paletteFor(v) });
  }
</script>

<svelte:head><title>Spectrum — {TITLE}</title></svelte:head>

<main class="page">
  <header class="top">
    <a class="mark" href="{base}/">{TITLE}</a>
    <nav class="top-nav"><a class="cover-link" href="{base}/">Cover ←</a></nav>
  </header>

  <div class="intro">
    <div class="kicker">Continuum</div>
    <h1>The full spectrum</h1>
    <p class="sub">{flat.length} sections from {SPECTRUM_MIN} to +{SPECTRUM_MAX}.</p>
  </div>

  <div class="viz"><Spectrum currentNum={null} /></div>

  <div class="buckets">
    {#each buckets as g}
      <section class="bucket">
        <div class="bucket-head">
          <span class="swatch" style:background={g.palette.bg}></span>
          <span class="bucket-label">{SPECTRUM_LABELS[g.spectrum] ?? g.spectrum}</span>
          <span class="bucket-count">{g.entries.length}</span>
        </div>
        <ul>
          {#each g.entries as e}
            <li>
              <a class="entry" href="{base}/{e.num}">
                <span class="entry-num">{e.num}</span>
                <span class="entry-title">{e.title}</span>
              </a>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>
</main>

<style>
  .page { min-height: 100vh; min-height: 100dvh; padding: 4vw 7vw 6vw; display: flex; flex-direction: column; gap: 3vw; }
  .top { display: flex; justify-content: space-between; align-items: center; font-family: var(--sans); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.24em; color: var(--muted); }
  .mark { font-family: var(--serif); font-style: italic; font-size: 1rem; letter-spacing: 0; text-transform: none; color: var(--ink); }
  .cover-link { color: var(--muted); transition: color 160ms; }
  .cover-link:hover { color: var(--ink); }

  .intro { max-width: 1100px; }
  .kicker { font-family: var(--sans); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.28em; color: var(--muted); margin-bottom: 1.2rem; }
  h1 { font-family: var(--serif); font-weight: 300; font-style: italic; font-size: clamp(2.4rem, 6vw, 4.8rem); color: var(--ink); }
  .sub { font-family: var(--serif); font-style: italic; color: var(--muted); margin-top: 1.2rem; }

  .viz { padding: 2rem 0; }

  .buckets { display: flex; flex-direction: column; gap: 2rem; }
  .bucket { padding-top: 1.2rem; border-top: 1px solid var(--rule); }
  .bucket-head { display: flex; align-items: center; gap: 0.8rem; }
  .swatch { width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 0 1px var(--rule); }
  .bucket-label { font-family: var(--serif); font-style: italic; font-weight: 300; font-size: clamp(1.2rem, 1.8vw, 1.6rem); color: var(--ink); }
  .bucket-count { font-family: var(--sans); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.22em; color: var(--muted); }

  ul { list-style: none; padding: 0; margin-top: 0.8rem; }
  .entry { display: grid; grid-template-columns: 3ch minmax(0, 1fr); gap: 1.2rem; padding: 0.45rem 0; border-bottom: 1px dotted var(--rule); align-items: baseline; color: var(--ink); }
  .entry:hover { background: rgba(20, 17, 13, 0.03); }
  .entry-num { font-family: var(--sans); font-size: 0.68rem; letter-spacing: 0.18em; color: var(--muted); }
  .entry-title { font-family: var(--serif); font-style: italic; font-weight: 300; font-size: clamp(0.98rem, 1.15vw, 1.12rem); color: var(--ink); }
</style>
