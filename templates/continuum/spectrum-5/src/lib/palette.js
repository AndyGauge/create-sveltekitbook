// Eleven-stop spectrum ramp (−5 … +5). Saturation rises at the extremes.
//
// A section can flip to the INVERTED palette via `invert: true` in
// outline.js — dark near-black background, light ink.

import { makeSpectrum, DARK_PALETTE } from 'sveltekitbook/palette';

const LIGHT_INK = '#f4efe3';
const DARK_INK = '#14110d';

const RAMP = {
  [-5]: { bg: '#0a1f4a', ink: LIGHT_INK, muted: 'rgba(244,239,227,0.62)', rule: 'rgba(244,239,227,0.22)', accent: '#f6c84a', mode: 'dark'  },
  [-4]: { bg: '#1a3a78', ink: LIGHT_INK, muted: 'rgba(244,239,227,0.66)', rule: 'rgba(244,239,227,0.24)', accent: '#f6c84a', mode: 'dark'  },
  [-3]: { bg: '#2a4f9c', ink: LIGHT_INK, muted: 'rgba(244,239,227,0.7)',  rule: 'rgba(244,239,227,0.24)', accent: '#ffd97a', mode: 'dark'  },
  [-2]: { bg: '#6a88c0', ink: DARK_INK,  muted: 'rgba(20,17,13,0.6)',      rule: 'rgba(20,17,13,0.2)',      accent: '#0f3a7a', mode: 'light' },
  [-1]: { bg: '#b6c9e0', ink: DARK_INK,  muted: 'rgba(20,17,13,0.6)',      rule: 'rgba(20,17,13,0.2)',      accent: '#2a4f9c', mode: 'light' },
  [ 0]: { bg: '#e2d7c3', ink: DARK_INK,  muted: 'rgba(20,17,13,0.6)',      rule: 'rgba(20,17,13,0.2)',      accent: '#6a6a6a', mode: 'light' },
  [ 1]: { bg: '#f0c9a0', ink: DARK_INK,  muted: 'rgba(20,17,13,0.6)',      rule: 'rgba(20,17,13,0.2)',      accent: '#a04a0a', mode: 'light' },
  [ 2]: { bg: '#e8a07a', ink: DARK_INK,  muted: 'rgba(20,17,13,0.6)',      rule: 'rgba(20,17,13,0.2)',      accent: '#a0202e', mode: 'light' },
  [ 3]: { bg: '#c8593e', ink: LIGHT_INK, muted: 'rgba(244,239,227,0.7)',  rule: 'rgba(244,239,227,0.24)', accent: '#ffd97a', mode: 'dark'  },
  [ 4]: { bg: '#8a2a1e', ink: LIGHT_INK, muted: 'rgba(244,239,227,0.66)', rule: 'rgba(244,239,227,0.24)', accent: '#f6c84a', mode: 'dark'  },
  [ 5]: { bg: '#4a0c0a', ink: LIGHT_INK, muted: 'rgba(244,239,227,0.62)', rule: 'rgba(244,239,227,0.22)', accent: '#f6c84a', mode: 'dark'  }
};

const INVERTED = { ...DARK_PALETTE, bg: '#140a1e', accent: '#c49ad8' };

const spectrum = makeSpectrum({ ramp: RAMP, inverted: INVERTED });

export const { paletteFor, styleFor, modeFor } = spectrum;
