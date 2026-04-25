<script>
  import { base } from '$app/paths';
  import { AUTHORS } from '$lib/authors.js';
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

<svelte:head><title>Authors — {TITLE}</title></svelte:head>

<main class="page">
  <header class="top">
    <a class="mark" href="{base}/">{TITLE}</a>
    <nav class="top-nav"><a class="cover-link" href="{base}/">Cover ←</a></nav>
  </header>

  <div class="intro">
    <div class="kicker">Authors</div>
    <h1>Voices this book leans on</h1>
  </div>

  <div class="entries">
    {#each AUTHORS as a}
      <article class="entry">
        <h2>{a.name}</h2>
        {#if a.short}<p class="short">{a.short}</p>{/if}
        {#if a.bio}<p class="bio">{a.bio}</p>{/if}
        {#if a.works?.length}
          <ul class="works">
            {#each a.works as w}
              <li>
                {#if w.link}
                  <a href={w.link} target="_blank" rel="noopener noreferrer">{w.title}</a>
                {:else}
                  {w.title}
                {/if}
                {#if w.year} · <span class="year">{w.year}</span>{/if}
              </li>
            {/each}
          </ul>
        {/if}
      </article>
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
  h1 { font-family: var(--serif); font-weight: 300; font-style: italic; font-size: clamp(2.4rem, 6vw, 4.8rem); line-height: 0.98; letter-spacing: -0.025em; color: var(--ink); }

  .entries { display: flex; flex-direction: column; gap: 2.4rem; margin-top: 1rem; }
  .entry { max-width: 60ch; padding-top: 1.4rem; border-top: 1px solid var(--rule); }
  h2 { font-family: var(--serif); font-style: italic; font-weight: 300; font-size: clamp(1.4rem, 2vw, 1.8rem); color: var(--ink); }
  .short { font-family: var(--serif); font-style: italic; color: var(--muted); margin-top: 0.4rem; }
  .bio { font-family: var(--serif); font-weight: 300; font-size: clamp(0.95rem, 1.05vw, 1.05rem); line-height: 1.55; color: var(--ink); margin-top: 0.8rem; }

  .works { list-style: none; margin-top: 0.8rem; padding: 0; display: flex; flex-direction: column; gap: 0.3rem; }
  .works li { font-family: var(--sans); font-size: 0.8rem; color: var(--muted); }
  .works a { color: var(--accent); border-bottom: 1px solid transparent; }
  .works a:hover { border-bottom-color: var(--accent); }
  .year { font-family: var(--sans); font-size: 0.75em; letter-spacing: 0.15em; }
</style>
