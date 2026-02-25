# DEMAIN — 30 MINUTES — PLAN D'EXÉCUTION

**Lis ce doc. Fais dans l'ordre. Ne réfléchis pas.**

---

## LES 3 FLASHS (validés Hormozi + Guillaume)

Le principe : l'IA ne RÉSUME pas. Elle AGIT. Avec les bonnes règles. Sans qu'on lui dise.

### Flash 1 — "Voici ce que je lui demande" (20 sec)

**Tu tapes dans le chat :**
```
Relance les clients en retard ce mois-ci.
```

Pas "fais le point". Pas "résume". **Relance.** Un verbe d'action.

---

### Flash 2 — "Voici ce qu'il fait" (30 sec)

**Réponse attendue de l'agent (à calibrer dans le system prompt si besoin) :**

> **3 clients en retard ce mois-ci. Voici les relances préparées :**
>
> **Dupont Fiduciaire** — Retard : 18 jours
> → Email envoyé (pas téléphone — Marie le prend mal)
> → Ton amical, pas de mention de pénalités
> → "Je me permets un rappel concernant la facture F-2026-018..."
>
> **Ardian Luxembourg** — Retard : 12 jours
> → ⚠️ Bon de commande toujours pas signé par Émilie
> → Relance BC d'abord, PUIS facture
> → Email envoyé à Émilie avec rappel BC en PJ
>
> **Comptaflex** — Retard : 9 jours
> → Pas de relance. Pierre a un circuit de validation interne lent.
> → Normal avant J+20. On attend.

**Punchline face caméra :** "Regarde. Il sait que Marie déteste les appels. Il sait qu'Émilie oublie les bons de commande. Il sait que Pierre est juste lent. Je lui ai rien dit dans le prompt. Il le SAIT."

**Deuxième punchline :** "C'est pas de la magie. C'est de la mémoire."

---

### Flash 3 — Le moteur (5 sec)

Cut rapide sur n8n : le workflow a tourné. Temps d'exécution affiché. On voit les nœuds. Pas de zoom. 5 secondes. Cut.

---

## LES SKILLS — REVERSE-ENGINEERED DEPUIS LES FLASHS

3 fichiers. Le minimum pour que les réponses ci-dessus sortent correctement.

### Fichier 1 : skills/gestion-clients/SKILL.md

```markdown
# Skill : Gestion de la relation client

## Instruction

Tu gères les communications et actions client du cabinet. Avant toute action concernant un client, tu DOIS :
1. Consulter la fiche client dans data/clients.md
2. Appliquer les règles spécifiques de ce client (ton, canal, exceptions)
3. Ne jamais contredire une exception client, même si elle semble illogique

## Règles de priorisation

- 🔴 HAUTE : réponse/action immédiate
- 🟡 MOYENNE : SLA 24h ouvrées
- 🟢 STANDARD : SLA 48h ouvrées
- Conflit entre deux 🔴 : prioriser par CA décroissant
- Exception : si Patrimonia marque "urgent", elle passe devant tout le monde

## Règles de communication

- Vouvoiement par défaut sauf indication contraire
- Français par défaut. Anglais si le client est marqué lang: EN
- Jamais de données sensibles dans le corps d'un email — PJ chiffrée si nécessaire
- Les décisions commerciales (remise, délai, scope) = validation François uniquement

## Facturation

Consulter les conditions par client dans data/clients.md. Ne jamais modifier un taux jour ou un cycle de facturation sans validation.
```

### Fichier 2 : skills/gestion-clients/data/clients.md

```markdown
# Fiches clients — Cabinet Morel & Associés

## 🔴 PRIORITÉ HAUTE

### Dupont Fiduciaire S.A.
- Contact : Marie Dupont (Managing Partner)
- CA : 84 000 €/an | Taux jour : 950€ | Cycle : Mensuel | Net 30 (réel : net 53)
- Langue : FR
- ⚠️ PAIEMENT : Toujours en retard. Moyenne 23 jours après échéance.
- ⚠️ RELANCE : Ne JAMAIS relancer avant J+15. Marie le prend mal.
- ⚠️ CANAL : Email uniquement. Jamais de téléphone pour les relances.
- ⚠️ TON : Factuel, amical, pas accusateur. Pas de mention de pénalités avant J+30.
- ⚠️ SENSIBILITÉ : Très attachée au contrôle. Dire "supervision" pas "remplacement".
- Incident nov. 2025 : rapport avec données du mauvais trimestre. Confiance fragile.

### Keysource Management S.à r.l.
- Contact : James Walker (COO)
- CA : 126 000 €/an | Taux jour : 1 200€ | Cycle : Mensuel | Net 15
- Langue : EN
- ⚠️ COMMUNICATION : Emails max 5 lignes. Bullet points. Pas de "je vous propose" → "here's what we'll do".
- ⚠️ DISPONIBILITÉ : Ne répond qu'entre 7h-9h. Inutile d'envoyer après midi.
- ⚠️ PAIEMENT : Toujours à l'heure. Si retard → problème réel → appeler directement dès J+3.
- Toujours inclure un ROI chiffré dans chaque communication.

### Patrimonia Family Office
- Contact : Sophie Kieffer (Directrice)
- CA : 72 000 €/an | Taux jour : 1 100€ | Cycle : Mensuel | Net 30
- Langue : FR
- ⚠️ VIP : Temps de réponse max 4h ouvrées.
- ⚠️ COPIE : Toujours mettre Claire Meyer (assistante) en copie.
- ⚠️ CONFIDENTIALITÉ : Jamais de données dans le corps d'un email. PJ chiffrée + mdp par SMS.
- Ton chaleureux mais professionnel.

## 🟡 PRIORITÉ MOYENNE

### BGL Advisory Services
- Contact : Marc Schneider (Head of Ops)
- CA : 48 000 €/an | Taux jour : 850€ | Cycle : Trimestriel | Net 30
- ⚠️ SCOPE : Demandes hors scope fréquentes. Toujours chiffrer AVANT exécution.

### Nordea Fund Services Luxembourg
- Contact : Anna Lindström (Project Manager)
- CA : 36 000 €/an | Taux jour : 1 000€ | Par livrable | Net 45
- Langue : EN
- ⚠️ VALIDATION : 3 niveaux d'approbation interne. Prévoir +10 jours sur chaque deadline.
- ⚠️ ENJEU : PoC qui détermine un contrat de 120K€/an. Zéro erreur.

### Comptaflex S.A.
- Contact : Pierre Lambert (Gérant)
- CA : 24 000 €/an | Taux jour : 750€ | Cycle : Mensuel | Net 30
- ⚠️ PAIEMENT : Circuit de validation interne lent. Normal jusqu'à J+20. Ne pas relancer avant.
- ⚠️ VOCABULAIRE : Ne JAMAIS dire "IA". Dire "système automatisé" ou "assistant numérique".
- ⚠️ TON : Patient, pédagogue. Pierre pose beaucoup de questions = opportunités de confiance.

## 🟢 STANDARD

### Ardian Luxembourg S.A.
- Contact : Émilie Fontaine (Office Manager)
- CA : 15 000 €/an | Contrat maintenance | Renouvellement mars
- ⚠️ ADMIN : Émilie oublie systématiquement de signer les bons de commande. Relancer 2x.
- ⚠️ RELANCE FACTURE : Toujours vérifier que le BC est signé AVANT de relancer la facture.
```

### Fichier 3 : skills/relances/SKILL.md

```markdown
# Skill : Processus de relance

## Instruction

Quand on te demande de relancer les clients en retard, tu DOIS :
1. Consulter les fiches clients (skill gestion-clients) pour les exceptions
2. Appliquer le process standard SAUF si une exception client existe
3. L'exception client PRIME TOUJOURS sur le process standard
4. Rédiger le texte de la relance, prêt à envoyer

## Process standard

| Étape | Délai | Canal | Ton |
|-------|-------|-------|-----|
| 1 - Rappel amical | J+7 | Email | Léger, "probablement un oubli" |
| 2 - Rappel formel | J+15 | Email AR | Factuel, ouverture au dialogue |
| 3 - Relance ferme | J+30 | Email + Appel | Direct, mention pénalités |
| 4 - Mise en demeure | J+45 | Recommandé AR | Juridique — validation François |
| 5 - Recouvrement | J+60 | Avocat | Décision François uniquement |

## Exceptions connues

- **Dupont** : Commencer à l'Étape 2 (pas avant J+15). Ton Étape 2 = ton Étape 1. Email uniquement.
- **Keysource** : Si retard → appel direct dès J+3. En anglais. C'est anormal, donc problème réel.
- **Patrimonia** : Relance à Claire (assistante), pas à Sophie. Sophie en copie à partir de l'Étape 3.
- **Comptaflex** : Ne pas relancer avant J+20. Circuit interne lent = normal.
- **Ardian** : Vérifier que le BC est signé AVANT toute relance facture.

## Règle fondamentale

La relance est un service, pas une menace. On facilite le paiement. Le ton monte progressivement mais ne devient jamais agressif.

## Automatisation

Les étapes 1-2 sont automatisées via n8n (CRON quotidien 8h30, source Google Sheets "Suivi Facturation"). Les étapes 3+ nécessitent une intervention humaine.
```

---

## WIRING — 30 MINUTES CHRONO

### Minute 0-10 : GitHub

1. Créer le repo `business-memory-skills` (public)
2. Upload les 3 fichiers ci-dessus dans la structure :
   ```
   skills/
   ├── gestion-clients/
   │   ├── SKILL.md
   │   └── data/clients.md
   └── relances/
       └── SKILL.md
   ```
3. Push.

### Minute 10-25 : n8n

1. Importer le workflow `business-memory-agent.json` (déjà livré hier)
2. Remplacer les 3 placeholders (GitHub username, credentials)
3. Activer
4. Tester avec : `Relance les clients en retard ce mois-ci.`
5. Si la réponse mentionne les exceptions (Dupont = email doux, Ardian = BC d'abord, Comptaflex = on attend) → ça marche
6. Si la réponse est générique → vérifier que l'agent lit bien les skills (logs d'exécution)

### Minute 25-30 : Slide HTML

1. Ouvrir `slides-demo-openclaw.html`
2. Remplacer l'URL webhook (ligne `const N8N_WEBHOOK_URL = ...`)
3. Naviguer jusqu'à la slide 8, tester le chat
4. Done.

---

## PEAUFINAGE AVEC CLAUDE CODE (APRÈS, PAS MAINTENANT)

- [ ] Ajuster le system prompt de l'agent si les réponses ne sont pas assez spécifiques
- [ ] Ajouter un skill `reporting/` si tu veux un Flash 2bis
- [ ] Améliorer le styling des slides
- [ ] Ajouter des animations d'entrée
- [ ] Optimiser la latence du webhook

---

## RAPPEL — CE QUE LE VIEWER VOIT

1. Un chat propre dans une slide
2. Tu tapes "Relance les clients en retard"
3. L'IA répond avec les BONNES exceptions par client
4. Face caméra : "C'est pas de la magie. C'est de la mémoire."
5. Cut 5 sec sur n8n : le workflow a tourné
6. Cut.

C'est tout. 60 secondes de démo. Le reste c'est du storytelling.
