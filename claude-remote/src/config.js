// ── ANSI Color Codes ──────────────────────────────────────────────
const RESET = '\x1b[0m';
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const BG_RED = '\x1b[41m';
const BG_GREEN = '\x1b[42m';
const BG_YELLOW = '\x1b[43m';

// ── Scoring Weights (total = 100) ────────────────────────────────
const POIDS = {
  retard: 40,
  relances: 30,
  priorite: 15,
  ca: 15,
};

// ── Thresholds ───────────────────────────────────────────────────
const SEUILS = {
  retardGrave: 30,
  retardModere: 15,
  relancesMax: 5,
};

// ── Health Labels ────────────────────────────────────────────────
const SANTE = {
  bon: { min: 75, label: 'SAIN', color: GREEN },
  attention: { min: 50, label: 'ATTENTION', color: YELLOW },
  critique: { min: 0, label: 'CRITIQUE', color: RED },
};

module.exports = {
  RESET, RED, GREEN, YELLOW, CYAN, DIM, BOLD, BG_RED, BG_GREEN, BG_YELLOW,
  POIDS,
  SEUILS,
  SANTE,
};
