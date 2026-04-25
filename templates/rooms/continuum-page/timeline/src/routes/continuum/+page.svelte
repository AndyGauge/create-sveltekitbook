<script>
  import { base } from '$app/paths';
  import { flat, YEAR_MIN, YEAR_MAX } from '$lib/outline.js';
  import Timeline from '$lib/Timeline.svelte';
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
</script>

<svelte:head><title>Timeline — {TITLE}</title></svelte:head>

<main class="page">
  <header class="top">
    <a class="mark" href="{base}/">{TITLE}</a>
    <nav class="top-nav"><a class="cover-link" href="{base}/">Cover ←</a></nav>
  </header>

  <div class="intro">
    <div class="kicker">Continuum</div>
    <h1>The full timeline</h1>
    <p class="sub">{flat.length} sections from {YEAR_MIN} to {YEAR_MAX}.</p>
  </div>

  <div class="viz"><Timeline currentNum={null} /></div>

  <ul class="entries">
    {#each flat as e}
      <li>
        <a class="entry" href="{base}/{e.num}">
          <span class="entry-num">{e.num}</span>
          <span class="entry-year">{e.year}</span>
          <span class="entry-title">{e.title}</span>
        </a>
      </li>
    {/each}
  </ul>
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

  .entries { list-style: none; padding: 0; margin-top: 1rem; border-top: 1px solid var(--rule); }
  .entry { display: grid; grid-template-columns: 3ch 6ch minmax(0, 1fr); gap: 1.2rem; padding: 0.6rem 0; border-bottom: 1px dotted var(--rule); color: var(--ink); }
  .entry:hover { background: rgba(20, 17, 13, 0.03); }
  .entry-num { font-family: var(--sans); font-size: 0.68rem; letter-spacing: 0.18em; color: var(--muted); }
  .entry-year { font-family: var(--sans); font-size: 0.72rem; color: var(--accent); }
  .entry-title { font-family: var(--serif); font-style: italic; font-weight: 300; font-size: clamp(0.98rem, 1.15vw, 1.12rem); color: var(--ink); }
</style>
