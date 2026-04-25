<script>
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { flat, SPECTRUM_MIN, SPECTRUM_MAX, SPECTRUM_LABELS } from './outline.js';
  import { paletteFor } from './palette.js';

  let { currentNum } = $props();

  const RANGE = SPECTRUM_MAX - SPECTRUM_MIN || 1;
  const stops = [];
  for (let v = SPECTRUM_MIN; v <= SPECTRUM_MAX; v++) stops.push(v);

  function x(v) {
    return ((v - SPECTRUM_MIN) / RANGE) * 100;
  }

  let current = $derived(flat.find((s) => s.num === currentNum));

  function onBarClick(e) {
    const target = /** @type {HTMLElement} */ (e.currentTarget);
    const rect = target.getBoundingClientRect();
    const frac = (e.clientX - rect.left) / rect.width;
    const desired = SPECTRUM_MIN + frac * RANGE;

    let best = flat[0];
    let bestDist = Infinity;
    for (const s of flat) {
      const d = Math.abs(s.spectrum - desired);
      if (d < bestDist) { best = s; bestDist = d; }
    }
    if (best && best.num !== currentNum) {
      goto(base + '/' + best.num);
    }
  }
</script>

<button type="button" class="spectrum" aria-label="Spectrum — click to jump" onclick={onBarClick}>
  <span class="axis"></span>

  {#each stops as v}
    <span class="tick" style:left="{x(v)}%">
      <span class="swatch" style:background={paletteFor(v).bg}></span>
    </span>
  {/each}

  {#each flat as s (s.num)}
    <a
      class="dot"
      class:active={s.num === currentNum}
      style:left="{x(s.spectrum)}%"
      style:background={paletteFor(s.spectrum, s.invert).bg}
      href="{base}/{s.num}"
      title="{s.num} · {s.title}"
      onclick={(e) => e.stopPropagation()}
    ></a>
  {/each}

  {#if current && SPECTRUM_LABELS[current.spectrum]}
    <span class="flag" style:left="{x(current.spectrum)}%">
      <span class="flag-label">{SPECTRUM_LABELS[current.spectrum]}</span>
    </span>
  {/if}
</button>

<style>
  .spectrum {
    position: relative;
    display: block;
    width: 100%;
    height: 52px;
    margin-top: 1rem;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }

  .axis {
    position: absolute;
    top: 50%; left: 0; right: 0;
    height: 1px;
    background: var(--rule);
    transform: translateY(-50%);
    pointer-events: none;
  }

  .tick {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .swatch {
    display: block;
    width: 8px; height: 8px;
    border-radius: 50%;
    opacity: 0.55;
    box-shadow: 0 0 0 1px var(--rule);
  }

  .dot {
    position: absolute;
    top: 50%;
    width: 12px; height: 12px;
    opacity: 0.5;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 220ms, height 220ms, opacity 220ms, transform 160ms;
    box-shadow: 0 0 0 1px var(--rule);
    cursor: pointer;
  }
  .dot::before { content: ''; position: absolute; inset: -6px; }
  .dot:hover { opacity: 1; transform: translate(-50%, -50%) scale(1.25); }
  .dot.active { width: 16px; height: 16px; opacity: 1; box-shadow: 0 0 0 4px var(--rule); }

  .flag {
    position: absolute;
    top: 50%;
    transform: translate(-50%, calc(-100% - 14px));
    pointer-events: none;
  }

  .flag-label {
    font-family: var(--sans);
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 0.28em;
    color: var(--accent);
    white-space: nowrap;
  }

  @media (max-width: 720px) {
    .swatch { width: 6px; height: 6px; }
    .dot { width: 10px; height: 10px; }
    .dot.active { width: 14px; height: 14px; }
  }
</style>
