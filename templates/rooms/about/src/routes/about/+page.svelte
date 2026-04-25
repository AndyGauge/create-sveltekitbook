<script>
  import { base } from '$app/paths';
  import { TITLE, AUTHOR, YEAR } from '$lib/config.js';

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

<svelte:head><title>About — {TITLE}</title></svelte:head>

<main class="page">
  <header class="top">
    <a class="mark" href="{base}/">{TITLE}</a>
    <nav class="top-nav"><a class="cover-link" href="{base}/">Cover ←</a></nav>
  </header>

  <article class="about">
    <div class="kicker">About</div>
    <h1>On this book</h1>

    <p class="lede">
      Write the front matter here — who you are, why the book exists, what
      the reader should expect from it.
    </p>

    <section>
      <h2>Colophon</h2>
      <p>
        {TITLE}{AUTHOR ? `, by ${AUTHOR}` : ''}, {YEAR}.
      </p>
      <p>
        Built with SvelteKit and
        <a href="https://github.com/AndyGauge/create-sveltekitbook">create-sveltekitbook</a>.
        Typeset in Fraunces and Inter.
      </p>
    </section>
  </article>
</main>

<style>
  .page { min-height: 100vh; min-height: 100dvh; padding: 4vw 7vw 6vw; display: flex; flex-direction: column; gap: 3vw; }
  .top { display: flex; justify-content: space-between; align-items: center; font-family: var(--sans); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.24em; color: var(--muted); }
  .mark { font-family: var(--serif); font-style: italic; font-size: 1rem; letter-spacing: 0; text-transform: none; color: var(--ink); }
  .cover-link { color: var(--muted); transition: color 160ms; }
  .cover-link:hover { color: var(--ink); }

  .about { max-width: 60ch; }
  .kicker { font-family: var(--sans); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.28em; color: var(--muted); margin-bottom: 1.2rem; }
  h1 { font-family: var(--serif); font-weight: 300; font-style: italic; font-size: clamp(2.4rem, 6vw, 4.8rem); line-height: 0.98; letter-spacing: -0.025em; color: var(--ink); }

  .lede { font-family: var(--serif); font-style: italic; font-weight: 300; font-size: clamp(1.1rem, 1.3vw, 1.3rem); color: var(--ink); margin-top: 1.6rem; line-height: 1.5; }

  h2 { font-family: var(--serif); font-weight: 300; font-size: clamp(1.2rem, 1.7vw, 1.5rem); color: var(--ink); margin-top: 2.4rem; border-top: 1px solid var(--rule); padding-top: 1.4rem; }

  section p {
    font-family: var(--serif);
    font-weight: 300;
    font-size: clamp(0.95rem, 1.05vw, 1.05rem);
    line-height: 1.55;
    color: var(--ink);
    margin-top: 1rem;
  }

  a { color: var(--accent); border-bottom: 1px solid transparent; }
  a:hover { border-bottom-color: var(--accent); }
</style>
