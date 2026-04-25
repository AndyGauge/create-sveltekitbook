<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { flat, SPECTRUM_MIN, SPECTRUM_MAX } from '$lib/outline.js';
  import { paletteFor } from '$lib/palette.js';
  import { createPager } from 'sveltekitbook/gestures';
  import { TITLE, AUTHOR, YEAR } from '$lib/config.js';

  const stops = [];
  for (let v = SPECTRUM_MIN; v <= SPECTRUM_MAX; v++) stops.push(v);
  const gradient = `linear-gradient(to right, ${stops.map((s) => paletteFor(s).bg).join(', ')})`;

  // Force a neutral palette on the cover so returning from a deep-hued page
  // doesn't leave the reader "painted into" one side.
  $effect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute(
      'style',
      '--bg:#ffffff;--ink:#14110d;--muted:rgba(20,17,13,0.56);--rule:rgba(20,17,13,0.16);--accent:#6a6a6a;'
    );
  });

  let dragOffset = $state(0);
  let dragging = $derived(dragOffset !== 0);

  function start() {
    goto(base + '/' + flat[0].num);
  }

  const pager = createPager({
    onNext: start,
    onPrev: () => {},
    setOffset: (v) => { dragOffset = Math.min(0, v); }
  });

  function key(e) {
    if (e.key === 'Enter' || e.key === 'ArrowRight' || e.key === ' ') start();
  }
</script>

<svelte:window onkeydown={key} />

<main
  class="cover"
  class:dragging
  onwheel={pager.onWheel}
  ontouchstart={pager.onTouchStart}
  ontouchmove={pager.onTouchMove}
  ontouchend={pager.onTouchEnd}
  ontouchcancel={pager.onTouchCancel}
  style:transform="translateX({dragOffset}px)"
>
  <div class="meta top">
    <span>{AUTHOR ? `${AUTHOR} · ` : ''}{YEAR}</span>
  </div>

  <div class="title-block">
    <h1 class="vt-title">{TITLE}</h1>
    <p class="sub">A book in {flat.length} sections, arranged across a spectrum from {SPECTRUM_MIN} to +{SPECTRUM_MAX}.</p>

    <div class="gradient" style:background={gradient}>
      <span class="tick-left">Left</span>
      <span class="tick-right">Right</span>
    </div>
  </div>

  <div class="meta bottom">
    <button onclick={start}>Begin&nbsp;→</button>
    <nav class="cover-nav">
      {{navLinks}}
    </nav>
    <span class="hint">Enter, arrow, swipe, or scroll</span>
  </div>
</main>

<style>
  .cover {
    position: relative;
    height: 100vh;
    height: 100dvh;
    padding: 5vw 7vw;
    display: grid;
    grid-template-rows: auto 1fr auto;
    transition: transform 320ms cubic-bezier(0.2, 0.9, 0.3, 1);
    touch-action: pan-y;
    will-change: transform;
  }
  .cover.dragging { transition: none; }

  .meta {
    font-family: var(--sans);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.24em;
    color: var(--muted);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.2rem;
    flex-wrap: wrap;
  }

  .title-block { align-self: center; max-width: 1100px; }

  h1 {
    font-family: var(--serif);
    font-weight: 300;
    font-style: italic;
    font-size: clamp(3.5rem, 12vw, 12rem);
    line-height: 0.9;
    letter-spacing: -0.035em;
    color: var(--ink);
  }

  .sub {
    font-family: var(--serif);
    font-style: italic;
    font-weight: 300;
    font-size: clamp(1rem, 1.4vw, 1.3rem);
    color: var(--muted);
    margin-top: 1.6rem;
    max-width: 52ch;
    line-height: 1.4;
  }

  .gradient {
    position: relative;
    margin-top: 2.5rem;
    height: 12px;
    width: min(520px, 70vw);
    border-radius: 6px;
    box-shadow: inset 0 0 0 1px var(--rule);
  }

  .tick-left, .tick-right {
    position: absolute;
    top: 18px;
    font-family: var(--sans);
    font-size: 0.62rem;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    color: var(--muted);
  }
  .tick-left { left: 0; }
  .tick-right { right: 0; }

  button {
    font-family: var(--sans);
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.24em;
    padding: 1rem 1.6rem;
    background: var(--ink);
    color: var(--bg);
    transition: background 200ms ease;
  }
  button:hover { background: var(--accent); }

  .cover-nav {
    display: flex;
    gap: 0.9rem;
    font-family: var(--sans);
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .cover-nav :global(a) {
    border-bottom: 1px solid transparent;
    transition: color 160ms ease, border-color 160ms ease;
  }
  .cover-nav :global(a:hover) { color: var(--ink); border-bottom-color: var(--ink); }

  .hint {
    font-family: var(--sans);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
  }
</style>
