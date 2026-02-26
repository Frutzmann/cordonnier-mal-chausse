const {
  RESET, RED, GREEN, YELLOW, CYAN, DIM, BOLD,
  BG_RED, BG_GREEN, BG_YELLOW,
  POIDS, SEUILS, SANTE,
} = require('./config');
const clients = require('./clients');

// ── Scoring Engine ───────────────────────────────────────────────

function calculerScore(client) {
  let score = 100;

  // Retard de paiement (poids: 40)
  if (client.joursRetard > SEUILS.retardGrave) {
    score -= POIDS.retard;
  } else if (client.joursRetard > SEUILS.retardModere) {
    score -= POIDS.retard * 0.6;
  } else if (client.joursRetard > 0) {
    score -= POIDS.retard * 0.3;
  }

  // Relances envoyees (poids: 30, proportionnel)
  const ratioRelances = Math.min(client.relancesEnvoyees / SEUILS.relancesMax, 1);
  score -= POIDS.relances * ratioRelances;

  // Priorite (poids: 15 — bonus/malus)
  if (client.priorite === 'haute') {
    score += POIDS.priorite * 0.5;
  } else if (client.priorite === 'basse') {
    score -= POIDS.priorite * 0.3;
  }

  // Chiffre d'affaires (poids: 15 — bonus)
  if (client.caAnnuel > 80000) {
    score += POIDS.ca;
  } else if (client.caAnnuel > 50000) {
    score += POIDS.ca * 0.5;
  }

  // Clamp 0–100
  return Math.max(0, Math.min(100, Math.round(score)));
}

// ── Progress Bar ─────────────────────────────────────────────────

function barreProgression(score, largeur = 20) {
  const rempli = Math.round((score / 100) * largeur);
  const vide = largeur - rempli;

  let couleur;
  if (score >= SANTE.bon.min) {
    couleur = BG_GREEN;
  } else if (score >= SANTE.attention.min) {
    couleur = BG_YELLOW;
  } else {
    couleur = BG_RED;
  }

  const barRemplie = couleur + ' '.repeat(rempli) + RESET;
  const barVide = DIM + '░'.repeat(vide) + RESET;
  return barRemplie + barVide;
}

// ── Health Label ─────────────────────────────────────────────────

function labelSante(score) {
  if (score >= SANTE.bon.min) {
    return SANTE.bon.color + BOLD + SANTE.bon.label + RESET;
  } else if (score >= SANTE.attention.min) {
    return SANTE.attention.color + BOLD + SANTE.attention.label + RESET;
  } else {
    return SANTE.critique.color + BOLD + SANTE.critique.label + RESET;
  }
}

// ── Helpers ──────────────────────────────────────────────────────

function pad(str, len) {
  const s = String(str);
  return s.length >= len ? s.slice(0, len) : s + ' '.repeat(len - s.length);
}

function padLeft(str, len) {
  const s = String(str);
  return s.length >= len ? s.slice(0, len) : ' '.repeat(len - s.length) + s;
}

// ── Main Dashboard ───────────────────────────────────────────────

function afficherDashboard() {
  const largeurTotal = 96;
  const tiret = '═'.repeat(largeurTotal - 2);
  const ligne = CYAN + '║' + DIM + '─'.repeat(largeurTotal - 2) + RESET + CYAN + '║' + RESET;

  // Header
  console.log('');
  console.log(CYAN + '╔' + tiret + '╗' + RESET);
  const titre = 'CLIENT HEALTH DASHBOARD';
  const sousTitre = "L'Atelier de l'Automatisation";
  const paddingTitre = Math.floor((largeurTotal - 2 - titre.length) / 2);
  const paddingSousTitre = Math.floor((largeurTotal - 2 - sousTitre.length) / 2);
  console.log(CYAN + '║' + RESET + ' '.repeat(paddingTitre) + BOLD + CYAN + titre + RESET + ' '.repeat(largeurTotal - 2 - paddingTitre - titre.length) + CYAN + '║' + RESET);
  console.log(CYAN + '║' + RESET + ' '.repeat(paddingSousTitre) + DIM + sousTitre + RESET + ' '.repeat(largeurTotal - 2 - paddingSousTitre - sousTitre.length) + CYAN + '║' + RESET);
  console.log(CYAN + '╠' + tiret + '╣' + RESET);

  // Column headers
  const header =
    '  ' +
    BOLD + pad('CLIENT', 26) +
    pad('PRIORITE', 12) +
    padLeft('SCORE', 6) + '  ' +
    pad('BARRE', 22) +
    padLeft('RETARD', 8) +
    padLeft('RELANCES', 10) + '  ' +
    pad('STATUT', 10) + RESET;
  console.log(CYAN + '║' + RESET + header + CYAN + '║' + RESET);
  console.log(ligne);

  // Calculate and sort (worst first)
  const resultats = clients.map((c) => ({
    ...c,
    score: calculerScore(c),
  }));
  resultats.sort((a, b) => a.score - b.score);

  // Counters
  let nbSain = 0;
  let nbAttention = 0;
  let nbCritique = 0;

  // Rows
  for (const r of resultats) {
    if (r.score >= SANTE.bon.min) nbSain++;
    else if (r.score >= SANTE.attention.min) nbAttention++;
    else nbCritique++;

    const couleurScore = r.score >= SANTE.bon.min
      ? GREEN
      : r.score >= SANTE.attention.min
        ? YELLOW
        : RED;

    const retardStr = r.joursRetard === 0 || r.joursRetard === '0'
      ? DIM + '—' + RESET
      : RED + r.joursRetard + 'j' + RESET;

    const relancesStr = r.relancesEnvoyees === 0
      ? DIM + '—' + RESET
      : YELLOW + r.relancesEnvoyees + RESET;

    // Build row (raw content without ANSI for padding calc)
    const nomStr = pad(r.nom, 26);
    const prioStr = pad(r.priorite, 12);
    const scoreStr = padLeft(String(r.score), 6);
    const barre = barreProgression(r.score);
    const retardPad = padLeft(String(r.joursRetard === 0 ? '—' : r.joursRetard + 'j'), 8);
    const relancesPad = padLeft(String(r.relancesEnvoyees === 0 ? '—' : String(r.relancesEnvoyees)), 10);
    const statut = labelSante(r.score);

    const row =
      '  ' +
      nomStr +
      prioStr +
      couleurScore + scoreStr + RESET + '  ' +
      barre + '  ' +
      (r.joursRetard === 0 || r.joursRetard === '0' ? DIM + retardPad + RESET : RED + retardPad + RESET) +
      (r.relancesEnvoyees === 0 ? DIM + relancesPad + RESET : YELLOW + relancesPad + RESET) + '  ' +
      statut;

    console.log(CYAN + '║' + RESET + row);
  }

  // Separator
  console.log(CYAN + '╠' + tiret + '╣' + RESET);

  // Summary
  const resume =
    '  ' + BOLD + 'Resume: ' + RESET +
    GREEN + nbSain + ' sain' + (nbSain > 1 ? 's' : '') + RESET + '  ' +
    YELLOW + nbAttention + ' attention' + RESET + '  ' +
    RED + nbCritique + ' critique' + (nbCritique > 1 ? 's' : '') + RESET;
  console.log(CYAN + '║' + RESET + resume);

  // Average delay
  let totalRetard = 0;
  for (const c of clients) {
    totalRetard += c.joursRetard;
  }
  const retardMoyen = Math.round(totalRetard / clients.length);
  const moyenneLine = '  ' + DIM + 'Retard moyen: ' + RESET +
    (retardMoyen > 15 ? RED : retardMoyen > 0 ? YELLOW : GREEN) +
    retardMoyen + ' jours' + RESET;
  console.log(CYAN + '║' + RESET + moyenneLine);

  // Date
  const date = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateLine = '  ' + DIM + 'Genere le ' + date + RESET;
  console.log(CYAN + '║' + RESET + dateLine);

  // Footer
  console.log(CYAN + '╚' + tiret + '╝' + RESET);
  console.log('');
}

// ── Run ──────────────────────────────────────────────────────────
afficherDashboard();
