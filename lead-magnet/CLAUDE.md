# Lead Magnet — L'Atelier Automatisation

## Objectif
Landing page opt-in + audit interactif pour generer des leads qualifies. L'utilisateur donne son email, fait un audit de ses competences metier non documentees, puis est invite a reserver un appel Calendly.

## Stack
- **Astro 5** (static output) + **Tailwind CSS 3** (utility-first, pas de CSS custom pour les composants)
- Font: Inter (Google Fonts)
- Build: `npx astro build` -> `dist/`
- Dev: `npm run dev`

## Architecture

### Pages
| Route | Fichier | Acces |
|---|---|---|
| `/` | `pages/index.astro` | Public — formulaire opt-in |
| `/audit` | `pages/audit.astro` | Gate — redirect vers `/` si pas de `lm_email` en localStorage |

### Composants (`src/components/`)
| Composant | Page | Role |
|---|---|---|
| `EmailGate.astro` | `/` | Formulaire opt-in (prenom, email, secteur chips single-select, pain points chips multi-select) |
| `Audit.astro` | `/audit` | 8 competences a cocher, score sticky, progress bar, messages contextuels |
| `Template.astro` | `/audit` | Template vide a remplir (17 champs), nudge apres 30s si <5 remplis |
| `Exemple.astro` | `/audit` | Exemple complet "Escalade client mecontent" avec timeline + regles TOUJOURS/JAMAIS/EXCEPTIONS |
| `Cta.astro` | `/audit` | Recap 3 etapes + CTA Calendly |

### Layout
`Layout.astro` — HTML shell, Google Fonts, IntersectionObserver global pour `.fade-in`, `window.trackEvent()` vers webhook n8n.

### Styles
`src/styles/global.css` — CSS variables (couleurs), animations (`fade-in`, `checkBounce`, `progressFill`, `dotPulse`, `countUp`), `.btn-glow`, `.input-focus`, `.audit-card`, `.field-always/never/exception`.

**Convention** : pas de classes CSS custom pour le layout/spacing — tout en Tailwind inline. Le CSS custom est reserve aux animations et etats interactifs (`.checked`, `:hover`, `:focus`).

## Design System

### Couleurs (Tailwind custom)
| Token | Hex | Usage |
|---|---|---|
| `purple` | `#9D4F9E` | CTA, bordures actives, accents |
| `purple-light` | `#C98BCA` | Texte accent, badges |
| `purple-dark` | `#7A3D7B` | Hover CTA |
| `navy` | `#011638` | Background principal |
| `navy-light` | `#1A2F52` | Cards, inputs, chips |
| `warm-gray` | `#D5D7DA` | Texte secondaire |
| `light-gray` | `#EEF0F2` | Texte body |
| `accent-gold` | `#D4A843` | Exceptions, alertes |

### Patterns UI
- **Chips single-select** : boutons `border-white/10 bg-navy-light/50 text-warm-gray`, au clic -> `border-purple bg-purple/10 text-white` (exclusif)
- **Chips multi-select** : meme style + coche SVG qui apparait au clic, hint "Plusieurs choix possibles" en `text-purple-light/60`
- **Selectable card** : `.audit-card` + `.checked` (bordure purple + glow)
- **Inputs** : `bg-navy-light/80 border-white/20 rounded-xl`, focus ring purple (`.input-focus`)

## Backend

### n8n Webhooks
| Webhook | Workflow | Role |
|---|---|---|
| `POST /webhook/lead-magnet-email` | `eVaXJMwhfc6KubQ2` | Capture opt-in -> Airtable + Gmail welcome |
| `POST /webhook/lead-magnet-event` | (tracking) | Events analytics (audit_completed, template_started, etc.) |

### Payload opt-in
```json
{
  "name": "Francois",
  "email": "francois@cabinet.com",
  "sector": "Finance / Comptabilite / Fiduciaire",
  "painPoint": ["Relances clients / suivi des paiements", "Reporting et documents recurrents"],
  "source": "lead-magnet",
  "userAgent": "..."
}
```
`painPoint` est un **array** (champ Airtable `multipleSelects`).

### Airtable
- **Base** : `appUxa9p0fQwPhQOd` (Atelier Automatisations)
- **Table** : `tblRGoFiPO6Tx5N2D` (Leads LM)
- Champs : Email, Prenom, Secteur, Pain_Point (multipleSelects), Source, User_Agent, Created_At
- Note: ancien champ `Pain_Point_old` (singleSelect, ID `fldNhF5Icmap33Ly6`) a supprimer manuellement dans l'UI Airtable

### localStorage
| Cle | Valeur | Set par |
|---|---|---|
| `lm_email` | email brut | EmailGate submit |
| `lm_name` | prenom | EmailGate submit |
| `lm_sector` | secteur selectionne | EmailGate submit |
| `lm_pain` | `JSON.stringify(array)` | EmailGate submit |

## Conventions
- Tailwind inline pour tout le styling visuel — pas de classes CSS intermediaires
- Labels de formulaire : `text-xs text-warm-gray/60 uppercase tracking-wider text-left`
- Animations d'entree : classe `.fade-in` + IntersectionObserver global dans Layout
- Tracking : `window.trackEvent(eventName, metadata)` disponible globalement
- Les `.env` ne sont pas commits (contient uniquement des variables de build Astro)
