// Seven-stop spectrum ramp (−3 … +3). Each stop is a gentle pastel so dark
// ink reads comfortably on every page and the chromatic drift is felt,
// not shouted.
//
// A section can flip to the INVERTED palette via `invert: true` in
// outline.js — dark near-black background, light ink. Reserve it for the
// section that breaks the argument open.

import { makeSpectrum, DARK_PALETTE } from 'sveltekitbook/palette';

const DARK_INK = '#14110d';

const RAMP = {
  [-3]: { bg: '#fddee0', ink: DARK_INK, muted: 'rgba(20,17,13,0.6)', rule: 'rgba(20,17,13,0.2)', accent: '#a0202e', mode: 'light' }, // pale rose
  [-2]: { bg: '#fbe7cf', ink: DARK_INK, muted: 'rgba(20,17,13,0.6)', rule: 'rgba(20,17,13,0.2)', accent: '#a04a0a', mode: 'light' }, // pale peach
  [-1]: { bg: '#f5dfa3', ink: DARK_INK, muted: 'rgba(20,17,13,0.6)', rule: 'rgba(20,17,13,0.2)', accent: '#7a5a10', mode: 'light' }, // pale gold
  [ 0]: { bg: '#ddefd2', ink: DARK_INK, muted: 'rgba(20,17,13,0.6)', rule: 'rgba(20,17,13,0.2)', accent: '#1f5a1a', mode: 'light' }, // pale mint
  [ 1]: { bg: '#d3e6f4', ink: DARK_INK, muted: 'rgba(20,17,13,0.6)', rule: 'rgba(20,17,13,0.2)', accent: '#0f3a7a', mode: 'light' }, // pale sky
  [ 2]: { bg: '#dbd7ef', ink: DARK_INK, muted: 'rgba(20,17,13,0.6)', rule: 'rgba(20,17,13,0.2)', accent: '#2d2080', mode: 'light' }, // pale indigo
  [ 3]: { bg: '#e8d8ef', ink: DARK_INK, muted: 'rgba(20,17,13,0.6)', rule: 'rgba(20,17,13,0.2)', accent: '#4a1a7a', mode: 'light' }  // pale violet
};

const INVERTED = { ...DARK_PALETTE, bg: '#14051e', accent: '#c49ad8' };

const spectrum = makeSpectrum({ ramp: RAMP, inverted: INVERTED });

export const { paletteFor, styleFor, modeFor } = spectrum;
