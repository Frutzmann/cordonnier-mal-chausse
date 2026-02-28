# CHECKPOINT — Vidéo Claude Cowork Scheduled Tasks

**Date** : 2026-02-28
**Tournage** : demain soir (1er mars)
**Publication cible** : mardi 3 mars

---

## Contexte

Vidéo YouTube "J'ai automatisé mes 3 tâches les plus chiantes avec Claude Cowork" (~15 min). Première vidéo francophone sur les Scheduled Tasks de Claude Desktop.

**Angle** : 3 tâches réelles du quotidien solopreneur, automatisées avec Cowork. Résultats filmés post-process (hook = les 3 résultats déjà là au réveil).

**Contrainte critique** : les 3 tasks doivent tourner CETTE NUIT sur le Mac pour avoir des résultats réels au tournage demain soir.

---

## Ce qui est fait

### Contenu vidéo
- [x] Brief complet (`instructions.md`) : structure, hooks, mécanismes rétention, timing par section
- [x] Recherche productivité approfondie (`Productivité/skill.md` + `7_techniques_productivite.md`) : sources scientifiques, frameworks, Ericsson/Kleitman/Meyer validés

### Prompts Scheduled Tasks
- [x] **Task 1** — `prompt-task-1-productivite.md` : Daily 7h00. Todoist → planning markdown + Google Calendar "Cowork". Jugement des priorités, 3 blocs deep/shallow work, auto-amélioration
- [x] **Task 2** — `prompt-task-2-newsletters.md` : Daily 7h15. Gmail → tri newsletters → transfert "À LIRE" vers Readwise → récap → archivage
- [x] **Task 3** — `prompt-task-3-veille-youtube.md` : Weekly lundi 6h00. 20 chaînes YouTube → dashboard HTML autonome (top 10, tendances, opportunités, recommandations)

### Fichiers support
- [x] `chaines.txt` : 20 chaînes (6 FR automation/no-code, 3 FR tech, 10 EN AI/automation, 1 n8n officielle)
- [x] `SETUP-MAC.md` : guide pas-à-pas pour configurer le Mac ce soir (7 étapes + troubleshooting)

---

## Ce qui reste à faire

### Ce soir sur le Mac (obligatoire)

| # | Action | Durée est. | Statut |
|---|--------|-----------|--------|
| 1 | Mettre à jour Claude Desktop dernière version | 5 min | [ ] |
| 2 | Vérifier que Cowork + onglet "Scheduled" sont dispo | 2 min | [ ] |
| 3 | Créer `~/Desktop/Planning/` | 1 min | [ ] |
| 4 | Créer `~/Desktop/Veille-YouTube/` + copier `chaines.txt` | 2 min | [ ] |
| 5 | Créer le calendrier Google "Cowork" | 3 min | [ ] |
| 6 | Vérifier l'adresse Readwise (`add@readwise.io` ?) | 2 min | [ ] |
| 7 | Créer Scheduled Task 1 (Daily 7h00) + "Run now" pour tester | 10 min | [ ] |
| 8 | Créer Scheduled Task 2 (Daily 7h15) + "Run now" pour tester | 10 min | [ ] |
| 9 | Créer Scheduled Task 3 (Weekly Lundi 6h00) + "Run now" pour tester | 10 min | [ ] |
| 10 | Désactiver la mise en veille du Mac | 1 min | [ ] |

**Temps estimé : ~45 min**

### Vérifications demain matin

| Task | Résultat attendu | Check |
|------|------------------|-------|
| Task 1 | `~/Desktop/Planning/planning-2026-03-01.md` existe + section Jugement remplie | [ ] |
| Task 1 | Google Calendar "Cowork" a 3 blocs (8h-9h30, 9h40-11h10, 11h20-12h) | [ ] |
| Task 2 | Readwise Reader a reçu les newsletters "À LIRE" en entier | [ ] |
| Task 2 | Readwise Reader a reçu l'email récap "Veille — 2026-03-01" | [ ] |
| Task 2 | Gmail : newsletters archivées, inbox plus propre | [ ] |
| Task 3 | `~/Desktop/Veille-YouTube/veille-YYYY-MM-DD.html` existe (si demain = lundi) | [ ] |
| Task 3 | Dashboard lisible dans le navigateur, liens cliquables | [ ] |

### Avant le tournage (demain soir)

- [ ] Préparer les screen recordings des résultats (zoom lisible)
- [ ] Screenshot inbox Gmail "avant" (si possible, simuler un avant/après)
- [ ] Ouvrir le dashboard HTML Task 3 dans le navigateur, prêt à filmer
- [ ] Ouvrir le planning markdown Task 1, prêt à filmer
- [ ] Ouvrir Readwise Reader avec les newsletters reçues
- [ ] Filmer le HOOK EN DERNIER avec les vrais résultats

---

## Points d'attention / Risques

| Risque | Impact | Mitigation |
|--------|--------|-----------|
| Mac en veille cette nuit | Tasks ne tournent pas | Désactiver veille + brancher |
| Claude Desktop n'a pas Scheduled Tasks | Bloquant | Vérifier la version ce soir. Si absent, utiliser la bêta |
| Todoist vide / pas assez de tâches | Task 1 peu impressionnante | S'assurer qu'il y a 8-10 tâches actives avec des priorités variées |
| Pas de newsletters non lues | Task 2 ne fait rien | S'abonner à 5-6 newsletters la veille, ou garder des newsletters non lues exprès |
| Task 3 un jour non-lundi | Pas de résultat auto | Faire un "Run now" ce soir pour avoir un résultat immédiat |
| Adresse Readwise différente | Emails perdus | Vérifier AVANT dans Readwise Settings |
| Chaîne YouTube sans vidéo récente | Dashboard pauvre | Les 20 chaînes couvrent assez de volume |

---

## Fichiers dans ce dossier

```
a-tourner/claude-cowork/
├── CHECKPOINT.md                      ← Ce fichier
├── SETUP-MAC.md                       ← Guide setup Mac pas-à-pas
├── instructions.md                    ← Brief vidéo complet
├── prompt-task-1-productivite.md      ← Prompt Task 1 (Daily 7h00)
├── prompt-task-2-newsletters.md       ← Prompt Task 2 (Daily 7h15)
├── prompt-task-3-veille-youtube.md    ← Prompt Task 3 (Weekly Lundi 6h00)
├── chaines.txt                        ← 20 chaînes YouTube
└── Productivité/
    ├── skill.md                       ← Agrégation recherche productivité
    ├── 7_techniques_productivite.md   ← Recherche neuroscience
    └── neuroscience_productivite.md   ← (vide)
```
