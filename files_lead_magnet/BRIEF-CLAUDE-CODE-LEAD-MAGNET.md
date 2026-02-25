# BRIEF CLAUDE CODE — Site Lead Magnet Interactif
## "Tes compétences métier valent 130 000 €"

---

## CONTEXTE

Tu construis un site web interactif qui sert de lead magnet pour L'Atelier Automatisation.

**Objectif** : L'utilisateur (dirigeant PME, 35-55 ans) donne son email, accède au site, fait un audit de ses compétences métier, réalise qu'elles ne sont documentées nulle part, essaie de remplir un template, galère, et finit par cliquer sur le CTA Calendly.

**C'est un funnel de qualification déguisé en outil gratuit.**

---

## STACK TECHNIQUE

- **Frontend** : Next.js (App Router) + Tailwind CSS
- **Auth / Email gate** : Supabase (simple — email + timestamp, pas de password)
- **Hosting** : Vercel
- **Pas de backend complexe** — le site est essentiellement statique avec un email gate et du state local

---

## CODE COULEURS (OBLIGATOIRE)

```
--purple: #9D4F9E
--purple-light: #C98BCA
--purple-dark: #7A3D7B
--navy: #011638
--navy-light: #1A2F52
--light-gray: #EEF0F2
--white: #FFFFFF
--warm-gray: #D5D7DA
--accent-gold: #D4A843
```

**Direction esthétique** : Premium, épuré, dark mode dominant (navy), touches de purple sur les éléments interactifs. Pas de "startup vibes" — on parle à des dirigeants de PME qui gèrent des budgets. Penser "cabinet de conseil haut de gamme" pas "SaaS coloré". Typographie forte et lisible.

---

## STRUCTURE DU SITE — 5 SECTIONS (scroll vertical, single page après email gate)

---

### SECTION 0 — EMAIL GATE (landing page)

**C'est la seule page séparée. Tout le reste est derrière.**

#### Contenu :
- **Titre** : "Tes compétences métier valent 130 000 €."
- **Sous-titre** : "Elles sont dans ta tête. Nulle part ailleurs."
- **2 stats** :
  - "3 mois — pour former un employé à tes méthodes"
  - "60-70% — de ton temps passé sur de l'admin répétitif" (Source : PwC Luxembourg)
- **Texte d'accroche** : "En 5 minutes, identifie les compétences qui font tourner ta boîte — et découvre celles que personne d'autre ne maîtrise."
- **Champ email** + **bouton CTA** : "Accéder à l'audit gratuit →"
- **Micro-texte** sous le bouton : "Pas de spam. Un email de bienvenue, c'est tout."

#### Technique :
- Sauvegarder l'email dans Supabase (table `leads` : id, email, created_at)
- Après soumission → redirect vers le site complet (ou reveal avec scroll)
- Pas de vérification email complexe — on veut zéro friction

---

### SECTION 1 — L'AUDIT (la checklist interactive)

**C'est le coeur du site. Guillaume coche ses cases et voit son score monter.**

#### 8 compétences à auditer :

Chaque item = une carte cliquable avec :
- **Checkbox interactive**
- **Titre** (en gras)
- **Sous-description** (détails)
- **Question piquante** (en italique/purple, apparaît au hover ou toujours visible)

```
1. Comment on relance un client en retard
   Quel ton ? Quel canal ? Quand on escalade ? Quelles exceptions ?
   → "Si un nouveau gère tes relances demain, il fait quoi exactement ?"

2. Comment on facture
   Quels prérequis ? Quel cycle ? Comment on gère les litiges ?
   → "Ton process de facturation est documenté quelque part ?"

3. Comment on accueille un nouveau client
   Quelles étapes ? Dans quel ordre ? Quel premier livrable ?
   → "Ton onboarding est reproductible sans toi ?"

4. Comment on communique avec chaque client
   Qui préfère l'email ? Qui veut des calls ? Quel ton pour qui ?
   → "Les préférences de tes clients sont écrites où ?"

5. Comment on fait le reporting
   Quel format ? Quelle fréquence ? Quels KPIs par client ?
   → "Quelqu'un d'autre pourrait produire ton reporting mensuel ?"

6. Comment on traite une urgence
   C'est quoi une urgence ? Qui on prévient ? En combien de temps ?
   → "Ton équipe sait gérer une crise sans te déranger en vacances ?"

7. Comment on priorise les tâches
   Quels critères ? Client VIP vs standard ? Deadline vs importance ?
   → "Tes critères de priorisation, c'est de l'instinct ou un système ?"

8. Comment on gère les exceptions
   Quels clients ont des règles spéciales ? Pourquoi ? Depuis quand ?
   → "Les cas particuliers, c'est toi qui les connais ou tout le monde ?"
```

#### Score en temps réel :
- Compteur visible (sticky ou en haut) : "X / 8 compétences à risque"
- Barre de progression qui se remplit en purple
- Quand le score atteint certains seuils, afficher un message :
  - **0-2** : "Ta boîte survit sans toi. Rare."
  - **3-5** : "Zone de risque. Ces compétences dépendent de toi."
  - **6-8** : "Ton business, c'est toi. Si tu t'arrêtes, tout s'arrête."
- Animation subtile quand on coche (micro-interaction — scale + check mark)

#### Transition vers section suivante :
- Bouton : "Maintenant, essaie d'en documenter une →"
- N'apparaît que quand au moins 1 case est cochée

---

### SECTION 2 — LE TEMPLATE (formulaire remplissable)

**Guillaume essaie de documenter UNE compétence. C'est là qu'il galère.**

#### Champs du formulaire (tous éditables en ligne) :

```
Nom de la compétence : [champ texte]
Placeholder : "Ex : Comment on relance un client en retard de paiement"

Quand utiliser cette compétence : [champ texte]
Placeholder : "Ex : Quand une facture dépasse 7 jours de retard"

Les étapes du process : [5 champs numérotés]
Placeholder pour chaque : "Étape X..."
Instruction : "Dans l'ordre. Comme si tu l'expliquais à quelqu'un qui commence demain."

TOUJOURS (règles absolues) : [3 champs]
Style : encadré vert subtil
Placeholder : "Ce qu'on fait systématiquement..."

JAMAIS (interdits) : [3 champs]
Style : encadré rouge subtil
Placeholder : "Ce qu'on ne fait sous aucun prétexte..."

Exceptions connues : [3 champs]
Format par exception : "Client/Situation : ___ → Règle spéciale : ___"
Style : encadré doré/ambre subtil
```

#### UX critique :
- Les champs sont éditables mais la donnée reste en local (localStorage ou state)
- Indicateur de complétion : "X / 17 champs remplis"
- Quand l'utilisateur galère (< 5 champs remplis après 30 secondes de scroll) → afficher un message subtil : "C'est plus dur qu'on croit, non ? Regarde à quoi ça ressemble quand c'est bien fait. ↓"
- Bouton "Voir l'exemple →" toujours visible en bas de section

---

### SECTION 3 — L'EXEMPLE REMPLI (lecture seule, showcase)

**Montrer à quoi ça ressemble quand c'est bien fait. Créer le contraste.**

#### Contenu : Skill "Relances" du Cabinet Morel

```
COMPÉTENCE : Relance des factures impayées

DÉCLENCHEUR : Dès qu'une facture dépasse 7 jours calendaires après échéance

PROCESS D'ESCALADE :
1. J+7 — Rappel amical
   Email cordial. Ton : "petit rappel". Pas de mention de pénalités.

2. J+15 — Relance formelle
   Email structuré. Référence facture + montant + échéance dépassée.

3. J+30 — Relance ferme
   Mise en demeure douce. Mention des conditions contractuelles.

4. J+45 — Escalade
   Appel téléphonique direction. Dernier recours avant contentieux.

5. J+60 — Transfert
   Dossier transmis au service juridique / recouvrement externe.

TOUJOURS :
• Vérifier le BC signé avant relance
• Adapter le ton au profil client
• Logger chaque relance dans le CRM
• Attendre 48h entre deux contacts

JAMAIS :
• Menacer de pénalités en premier email
• Relancer par téléphone avant J+30
• Mettre le boss en copie sans prévenir
• Envoyer une relance un vendredi soir

EXCEPTIONS :
• Dupont Fiduciaire → Email uniquement. Jamais de téléphone à Marie. Ton amical, jamais de pénalités.
• Patrimonia Family Office → VIP. Email crypté uniquement. SLA 4h. Escalade directe si J+10.
• Keysource Management → Emails en anglais, 5 lignes max. Fenêtre : 7h-9h uniquement.
```

#### Design :
- Cards bien structurées, lecture seule, design premium
- Timeline visuelle pour le process d'escalade (dots + lignes connectées)
- Couleurs cohérentes : vert pour TOUJOURS, rouge pour JAMAIS, doré pour EXCEPTIONS
- Effet de "wow" — le contraste entre le template vide de la section 2 et cet exemple rempli doit être brutal

---

### SECTION 4 — LE GAP + CTA

**Le moment où Guillaume réalise qu'il ne peut pas faire ça seul.**

#### Contenu :

**Récap** (3 lignes) :
- "01 — Tu as identifié les compétences qui font tourner ta boîte."
- "02 — Tu as essayé d'en documenter une."
- "03 — Tu as vu ce que ça donne quand c'est bien fait."

**La question** (gros texte, centré) :
"Tu as tes compétences sur papier. Et maintenant ?"
"Comment tu les donnes à une IA qui les exécute pour toi, dans un cadre que tu contrôles ?"

**CTA Principal** :
- Bouton large, purple, prominent : "Réserve ton appel stratégique →"
- Lien : vers Calendly (placeholder URL : https://calendly.com/latelierautomatisation/appel-strategique)
- Sous le bouton : "30 minutes • Gratuit • Sans engagement"

**Description** :
"On regarde ensemble tes compétences documentées, on identifie les 2-3 qui auraient le plus d'impact automatisées, et tu repars avec un plan d'action clair."

**Footer** : "L'Atelier Automatisation — latelierautomatisation.com"

---

## INTERACTIONS & MICRO-ANIMATIONS

- Checkbox : scale bounce + check mark animé au clic
- Score : counter animation (nombre qui monte/descend smooth)
- Barre de progression : fill animé en purple
- Sections : fade-in au scroll (IntersectionObserver ou Framer Motion)
- Boutons CTA : hover effect subtil (glow purple ou scale léger)
- Cartes de l'exemple : stagger animation à l'entrée dans le viewport
- Messages de score : fade-in avec léger slide-up
- Template fields : focus state avec border purple

---

## RESPONSIVE

- **Desktop** : layout optimal, colonnes côte à côte pour TOUJOURS/JAMAIS
- **Mobile** : stack vertical, boutons full-width, score sticky en haut
- **Breakpoints** : sm (640px), md (768px), lg (1024px)

---

## CE QUE LE SITE NE FAIT PAS

- Pas de compte utilisateur complexe
- Pas de sauvegarde serveur des réponses du template (tout en local)
- Pas de paiement
- Pas de login/password
- Pas de dashboard admin (pour l'instant)

---

## SUPABASE — SETUP MINIMAL

Table `leads` :
```sql
create table leads (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default now()
);
```

C'est tout. On veut juste capturer l'email.

---

## PRIORITÉS

1. **Email gate qui fonctionne** (capture l'email, donne accès)
2. **Audit interactif avec score en temps réel** (c'est le hook)
3. **Template remplissable** (c'est la prise de conscience)
4. **Exemple showcase** (c'est la preuve)
5. **CTA Calendly** (c'est la conversion)
6. **Animations et polish** (c'est le premium)

---

## FICHIER DE RÉFÉRENCE

Le PDF joint contient le contenu exact des 5 pages. Le site web reprend ce contenu mais en version interactive. Le PDF sert de référence pour les textes, pas pour le design (le design du site doit être largement supérieur).
