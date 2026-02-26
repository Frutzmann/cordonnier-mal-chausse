# Shooting Framework — Claude Code Remote Control

## Infos vidéo

- **Titre A :** 1 commande, et ton IA tourne sans toi (Claude Code Remote) (57 chars)
- **Titre B :** Je pilote mon IA depuis mon téléphone — voilà ce que ça donne (60 chars)
- **Croyance fil rouge :** "L'IA, c'est un truc de développeur collé à son écran"
- **Format :** 70% face cam / 30% screen recording
- **Durée cible :** 7–8 minutes
- **Source de preuve :** Niveau 1 — propre utilisation + données tierces (Anthropic, VentureBeat)
- **SPCL :** Status ✅ / Power ✅ / Credibility ✅ / Likeness ⚠️ partiel

---

## Ordre de tournage

> **IMPORTANT : Le Bloc 1 (Ouverture) se tourne EN DERNIER.**
> Tu auras fait toute la démo, tu sauras quel moment est le plus impressionnant, et tu le filmes comme hook d'ouverture.

1. Bloc 2 — C'est quoi Claude Code Remote
2. Bloc 3 — Setup live
3. Bloc 4 — Démo (3 Flashs)
4. Bloc 5 — Limites et sécurité
5. Bloc 6 — Verdict + CTA
6. **Bloc 1 — Ouverture (tourné en dernier)**

---

## BLOC 1 — Ouverture / Hook (0:00–0:45)

**Format :** Face cam + insert téléphone
**Objectif :** Montrer le RÉSULTAT avant d'expliquer quoi que ce soit. Show first, explain after.

### Séquence :

**0–10s — MUTE, visual payoff pur :**
- Toi sur ton téléphone, tu envoies une instruction
- Ton ordi exécute en temps réel
- Le viewer voit le résultat apparaître — sans un mot

**10–30s — Narration + open loop explicite :**
> "Anthropic vient de sortir Remote Control pour Claude Code. Mon téléphone pilote mon agent IA — en local, sur ma machine. Et le plus fou c'est que tout ça tourne en LOCAL. Je vais te montrer comment, les trucs qui m'ont bluffé, et le truc que personne ne montre encore."

### 🔒 Tips rétention :

- **Payoff immédiat :** Le viewer voit le résultat en < 10 secondes. Pas d'intro, pas de logo, pas de "salut c'est François". Le MUTE force l'attention visuelle
- **Boucle ouverte triple :** "comment" + "trucs qui m'ont bluffé" + "truc que personne ne montre" = trois raisons de rester
- **Pattern interrupt :** L'insert du téléphone avec le code qui s'exécute casse le rythme visuel dès la première seconde

---

## BLOC 2 — C'est quoi Claude Code Remote (0:45–2:15)

**Format :** Face cam + inserts visuels (doc, annonce X, schéma)
**Objectif :** Expliquer Remote Control (PAS Claude Code — on part du principe que le viewer connaît) et ce que ça rend possible.

### Ouverture Dream Outcome (15s) :

> "Imagine : tu es en rendez-vous client, tu ouvres ton tel, tu dis à ton agent 'prépare le devis' — et quand tu rentres au bureau, c'est fait."

### Ce que tu couvres :

1. **Remote Control c'est quoi :** une feature sortie hier qui connecte ton app Claude (iOS/Android/web) à ta session Claude Code locale. Ton téléphone = télécommande pour ton agent IA.

2. **Ce que ça permet concrètement :**
   - Lancer tes agents sur ton ordi, partir, continuer à les piloter depuis ton smartphone
   - Monitorer ce que fait ton agent en temps réel
   - Envoyer de nouvelles instructions à la volée
   - Tout reste synchronisé entre tous tes appareils

3. **La nuance clé :** ça tourne toujours en LOCAL sur ta machine. Tes fichiers, tes MCP servers, ton contexte projet — tout reste chez toi. Le téléphone c'est juste une fenêtre. ≠ Claude Code on the web qui tourne dans le cloud d'Anthropic.

4. **Pourquoi c'est un shift :** avant tu étais collé à ton terminal. Les bidouilleurs faisaient du SSH + tmux + Tailscale pour bricoler un accès mobile. Maintenant c'est une commande, un QR code, c'est fait.

### Ce que tu peux montrer à l'écran (inserts rapides) :

- L'annonce officielle de Claude sur X/Threads
- La page de la doc
- Un schéma simple : ordi ←→ Anthropic API ←→ téléphone

### 🔒 Tips rétention :

- **Dream Outcome en ouverture** avant toute explication technique — le viewer se projette DANS le bénéfice
- **Rythme visuel :** Alterne face cam / insert toutes les 15-20 secondes. Ne reste JAMAIS 30 secondes sur le même plan
- **Boucle ouverte :** À la fin du bloc, tease la démo : "OK assez parlé, je vais te montrer ce que ça donne en vrai"
- **Pas de jargon non expliqué :** Si tu dis "MCP servers", explique en une phrase ("des outils externes que Claude Code peut utiliser — genre ton Google Calendar, ton n8n, etc.")

---

## BLOC 3 — Setup en live (2:15–3:45)

**Format :** Screen recording + face cam en picture-in-picture
**Objectif :** Montrer le setup complet. Le viewer doit se dire "c'est VRAIMENT simple."

### Séquence :

1. **Terminal ouvert, naviguer vers un vrai projet**
   > "Je suis dans [nom du projet]. Je tape une seule commande..."

2. **Taper `claude remote-control`**
   - Le QR code apparaît
   - Commenter : montrer que c'est littéralement UNE commande

3. **Scanner le QR code avec le téléphone**
   - Filmer TOI en train de scanner (pas un screencast du scan)
   - Montrer la connexion qui s'établit sur le téléphone

4. **Montrer la session active sur les deux écrans**
   - Le terminal sur l'ordi
   - L'interface sur le téléphone
   - Pointer que c'est la même session

5. **Si ça bug → le montrer**
   - Simon Willison et d'autres ont eu un bug d'auth au premier lancement
   - "Premier essai, ça marche pas. Je me déconnecte, `/login`, je retente... et là c'est bon."
   - L'authenticité d'un vrai test > un tuto léché

### Alternative : `/rc` depuis une session existante

- Si tu es déjà dans une session Claude Code, tu peux taper `/rc` ou `/remote-control`
- La session existante + son historique deviennent accessibles depuis le téléphone
- Montrer les deux options

### 🔒 Tips rétention :

- **Speed :** Le setup doit paraître RAPIDE. Si t'as un moment de chargement, coupe ou accélère en post-prod (×2 ou ×4)
- **Face cam PiP :** Ta réaction en miniature dans le coin pendant le screen recording maintient le lien humain
- **Payoff du bloc :** Le moment où le téléphone se connecte = moment de satisfaction. Marque-le : petite pause, "et voilà, je suis connecté"

---

## BLOC 4 — Démo : 3 Flashs en escalation (3:45–6:00)

**Format :** Screen recording + face cam PiP + alternance face cam entre les Flashs
**Objectif :** Montrer ce qui est VRAIMENT possible, avec une escalade de complexité. Chaque Flash est plus impressionnant que le précédent.

### Flash 1 — Lecture / Audit flash (30 sec)

- Envoie depuis ton tel :
  ```
  Lis tous les fichiers dans src/ et donne-moi un diagnostic complet :
  architecture, qualités, bugs potentiels, et un score de maturité sur 10.
  ```
- Claude lit 3 fichiers (`config.js`, `clients.js`, `dashboard.js`), comprend le scoring engine, les relations entre modules
- **Sans qu'on lui dise** → il trouve le bug tout seul (`joursRetard: '12'` string)
- Montre l'ordi qui exécute en temps réel
- Commente : **"Je ne touche pas mon clavier. Il a lu, compris et diagnostiqué 3 fichiers en quelques secondes."**
- Le viewer comprend le concept de base en 30 secondes

### Flash 2 — Bugfix DEPUIS LE CANAPÉ (60 sec)

**C'est le Flash clé — la preuve visuelle de la proposition de valeur.**

- **Te lever physiquement de ton bureau, aller au canapé/autre pièce.** Ce plan = la preuve incarnée que tu ne touches plus ton ordi.
- Depuis ton tel (variante courte — on lui dit où) :
  ```
  Dans src/clients.js, Comptaflex a joursRetard: '12' en string
  au lieu de number. Corrige le bug, puis lance node src/dashboard.js
  pour vérifier que le retard moyen est redevenu normal.
  ```
- Variante longue encore plus impressionnante (il doit trouver seul) :
  ```
  Le retard moyen du dashboard affiche 107323 jours.
  Trouve le bug, corrige-le, et prouve que c'est fixé.
  ```
- Claude ouvre `clients.js` → change `'12'` en `12` → relance le script → retard moyen passe de 107 323 jours à ~19 jours
- Montrer le before/after
- Mentionner la synchro bidirectionnelle en passant : **"D'ailleurs regarde, la conversation se synchronise en temps réel des deux côtés."**
- Face cam entre les moments d'exécution pour commenter ce qui se passe
- **Le plan "walking away"** = shot le plus important de toute la vidéo. Le viewer VOIT que l'IA bosse sans toi à côté.

### Flash 3 — MCP Airtable depuis le téléphone (45 sec)

**Le climax. Ce que personne ne montre encore.**

- Depuis ton tel :
  ```
  Utilise l'outil Airtable MCP pour lire les 7 clients de la table Clients
  et compare avec les données locales dans src/clients.js.
  Dis-moi s'il y a des différences.
  ```
- Claude fait un appel MCP Airtable **en live** (on voit la requête passer) → lit les 7 records avec 20 champs → ouvre `clients.js` (9 champs) → produit un diff structuré des champs manquants
- Commente : **"Là on est sur un autre niveau. Depuis mon téléphone, l'IA accède à mes outils externes — mes VRAIS outils, mes VRAIES données."**
- C'est LE truc technique que personne ne montre encore

### Récap : progression lire → agir → connecter

| Flash | Prompt | Ce que le public retient |
|-------|--------|--------------------------|
| 1 — Lecture | "Lis src/ et diagnostique" | "Il a lu et compris 3 fichiers en 5 secondes" |
| 2 — Bugfix | "Le retard moyen affiche 107323 jours. Trouve et corrige." | "Il a corrigé du code depuis un téléphone" |
| 3 — MCP | "Lis Airtable et compare avec clients.js" | "Il parle à Airtable depuis le terminal local" |

### Entre chaque Flash : face cam rapide (10-15 sec)

- Ta réaction honnête
- Ce qui t'impressionne ou te déçoit
- Transition vers le Flash suivant

### 🔒 Tips rétention :

- **Escalade claire :** Flash 1 = simple, Flash 2 = wow, Flash 3 = "attends QUOI ?!". Le viewer sent la montée en puissance
- **Varier le rythme visuel toutes les 30 secondes.** Screen → face cam → split screen → insert téléphone. Ne reste JAMAIS sur le même plan trop longtemps
- **Chaque Flash = mini boucle ouverte.** "Maintenant je vais tester un truc..." → exécution → résultat. Ouvre, ferme, ouvre, ferme.
- **Couper les temps morts.** Si Claude met 20 secondes à exécuter, accélère en post-prod ou commente par-dessus
- **Le moment "wow" :** C'est probablement le plan "walking away" du Flash 2 ou le rapport MCP du Flash 3. C'est celui que tu utiliseras pour filmer le Bloc 1 ensuite

---

## BLOC 5 — Ce qu'il faut savoir : limites et sécurité (6:00–7:00)

**Format :** Face cam + bullet points visuels à l'écran
**Objectif :** Crédibilité. Tu montres que tu ne vends pas du rêve.

### Les points à couvrir :

1. **Prérequis :**
   - Plan Pro ($20/mois) ou Max ($100-200/mois) obligatoire
   - Pas de clé API — authentification via `/login`
   - Pas encore dispo sur Team ou Enterprise

2. **Ce qui doit rester allumé :**
   - Ton ordi doit rester allumé
   - Le terminal doit rester ouvert
   - Connexion internet requise — déconnexion après ~10 minutes sans réseau

3. **Limitations actuelles :**
   - Une seule session remote à la fois
   - On ne peut pas DÉMARRER une nouvelle session depuis le téléphone — seulement continuer une session existante
   - C'est un research preview — il y a des bugs

4. **⚠️ DISCLAIMER CYBERSÉCURITÉ — Surface d'attaque de Remote Control :**

   **Ce que tu ouvres quand tu actives Remote Control :**
   > "Cette feature est puissante. Mais il faut comprendre ce qu'on expose."

   | Risque | Impact | Mitigation |
   |--------|--------|------------|
   | **URL de session = clé d'accès totale** | N'importe qui avec le lien lit/écrit/supprime tes fichiers locaux | Ne JAMAIS partager l'URL ou le QR code. Pas par Slack, pas par email, pas en screenshot |
   | **Pas de 2FA** | Aucune vérification d'identité au-delà du lien. Pas de code SMS, pas de biométrie | Considérer le lien comme un mot de passe root |
   | **MCP servers exposés à distance** | Depuis le téléphone, l'agent accède à TOUS tes MCP : Airtable, bases de données, APIs, GitHub... | Auditer quels MCP sont connectés AVANT d'activer Remote Control. Désactiver ceux qui ne sont pas nécessaires |
   | **Relay via Anthropic** | Tes instructions transitent par l'API Anthropic (chiffrées TLS, mais pas E2E) | Ne pas envoyer de secrets (mots de passe, tokens API) dans le chat Remote |
   | **Session persistante** | Le terminal reste ouvert et actif tant que tu ne le tues pas. Si ton ordi est compromis, la session aussi | Tuer la session avec `Ctrl+C` dès que tu as fini. Ne pas laisser tourner la nuit |
   | **Pas d'audit trail séparé** | Impossible de distinguer ce qui a été fait en local vs en remote dans les logs | Vérifier le `git diff` après une session remote |
   | **Research preview** | Pas de SLA sécurité, pas de pentest publié, pas de bug bounty dédié | Ne pas utiliser sur des projets clients sensibles ou des environnements de production |

   **Phrase à dire en vidéo :**
   > "Remote Control, c'est comme donner les clés de ton bureau à distance. C'est pratique, mais si tu laisses la porte ouverte, n'importe qui entre. Le lien de session = accès root à ta machine. Ne le partagez JAMAIS."

   **Bonnes pratiques à afficher à l'écran (bullet points rapides) :**
   - Tuer la session quand c'est fini (`Ctrl+C`)
   - Ne jamais screenshot le QR code
   - Auditer tes MCP connectés avant d'activer
   - Ne pas envoyer de secrets dans le chat
   - Pas de Remote Control sur un projet prod/client sensible
   - Vérifier `git log` / `git diff` après chaque session

5. **Remote Control vs Claude Code on the web :**
   - Remote Control = LOCAL (tes fichiers, tes MCP, ton contexte)
   - Claude Code web = CLOUD (sandbox Anthropic, pas d'accès à tes fichiers locaux)
   - Les deux ont leur utilité, mais Remote Control c'est pour le vrai travail sur tes projets

### 🔒 Tips rétention :

- **Ce bloc peut tuer la rétention s'il est trop long.** Max 60 secondes. Rapide, factuel, visuel.
- **Bullet points à l'écran** pendant que tu parles — le viewer peut lire ET écouter
- **Finir sur un hook vers le verdict :** "OK, maintenant que tu sais tout — voilà ce que j'en pense vraiment"

---

## BLOC 6 — Verdict honnête + CTA (7:00–8:00)

**Format :** Face cam
**Objectif :** Ton avis franc. Le viewer est resté jusqu'ici, il mérite une conclusion claire.

### Direction (structure inversée — wow d'abord, caveat après) :

**1. Moment wow spécifique :**
> "Ce qui m'a scotché c'est [Flash 2 ou Flash 3 — le plus impressionnant]. L'IA corrige un bug depuis mon canapé. Ça c'est nouveau."

**2. Caveat honnête :**
> "Mais c'est un research preview — le terminal doit rester ouvert, pas de démarrage à distance, y'a des bugs."

**3. Vision forward + destruction de croyance :**
> "Remote Control c'est la preuve que l'IA sort du terminal. T'as plus besoin d'être collé à ton écran. Et on n'est qu'au début."

**4. CTA :**

**CTA soft (aligné avec le sujet de la vidéo) :**
> "Si tu veux voir d'autres tests de features IA — les vrais tests, pas les démos marketing — abonne-toi, c'est ici que ça se passe."

**Comment hook :**
> "Dis-moi en commentaire : c'est quoi le premier truc que tu testerais en remote ?"

**Next video teaser (signal algo 2026) :**
> "Et la semaine prochaine je te montre [teaser next video] — ça va être encore plus dingue."

**CTA hard :**
> "Et si t'as déjà des process à automatiser et que tu veux qu'on en parle — lien Calendly juste en dessous, 30 minutes."

### 🔒 Tips rétention :

- **Structure inversée :** Wow → caveat → vision. Tu commences par l'émotion positive, pas par le doute. Le viewer repart sur une note haute.
- **Tu n'as plus besoin de retenir — tu dois SATISFAIRE.** Le viewer qui est là à 7:00 est un fan potentiel. Donne-lui un verdict clair et un CTA.
- **Comment hook** booste l'engagement algo + te donne des idées de contenu
- **Next video teaser** = signal de récurrence pour l'algo YouTube 2026
- **Pas de traîne.** Wow → caveat → vision → CTA → "À la prochaine." C'est fini. 45-60 secondes max.

---

## Tips rétention globaux

### Les 5 règles de survie

1. **Premier payoff avant 10 secondes.** Le résultat visible MUTE avant toute narration.
2. **Varier le rythme visuel toutes les 20-30 secondes.** Face cam → screen → insert → split screen → face cam. JAMAIS le même plan plus de 30 sec.
3. **Boucles ouvertes en cascade.** Chaque bloc ouvre une question que le suivant résout. La fin d'un bloc tease le suivant.
4. **Couper tout ce qui ne sert pas le viewer.** Chaque seconde doit apporter de l'info, de l'émotion ou de la curiosité. Si ça sert ton ego et pas le viewer → coupe.
5. **Les moments de chargement = ennemis de la rétention.** Accélère en post-prod (×2, ×4) ou commente par-dessus.

### Transitions entre blocs

| De → Vers | Transition |
|-----------|-----------|
| Bloc 1 → Bloc 2 | "Et le truc c'est que ça existe depuis hier. UNE commande, un QR code, et ton téléphone pilote tout." |
| Bloc 2 → Bloc 3 | "OK assez parlé, je vais te montrer comment on l'installe" |
| Bloc 3 → Bloc 4 | "OK ça c'était la partie facile. Maintenant la vraie question : est-ce que ça marche VRAIMENT ?" |
| Bloc 4 → Bloc 5 | "Avant de te donner mon verdict — les trucs à savoir" |
| Bloc 5 → Bloc 6 | "OK, maintenant que tu sais tout — voilà ce que j'en pense" |

### Checklist post-tournage

- [ ] Le Bloc 1 a été tourné EN DERNIER avec le vrai meilleur moment de la démo
- [ ] Le Bloc 1 commence par 10s MUTE avec payoff visuel avant toute narration
- [ ] Le Dream Outcome (rendez-vous client) ouvre le Bloc 2 avant l'explication technique
- [ ] Flash 2 inclut le plan "walking away" (se lever du bureau)
- [ ] Flash 3 utilise un vrai MCP server (Airtable) depuis le téléphone
- [ ] Aucun plan ne dure plus de 30 secondes sans changement visuel
- [ ] Les temps de chargement/exécution sont accélérés
- [ ] Chaque bloc se termine par un tease du suivant
- [ ] Le CTA soft mentionne "tests de features IA" (pas facturation/relances/reporting)
- [ ] Le comment hook est inclus ("premier truc que tu testerais en remote")
- [ ] Le teaser next video est inclus (signal algo 2026)
- [ ] Durée totale : 7-8 minutes
