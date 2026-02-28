# Setup Mac — 3 Scheduled Tasks Claude Cowork

## Pré-requis

- [ ] Claude Desktop dernière version (Cowork + Scheduled Tasks dispo)
- [ ] Compte Todoist connecté (Task 1)
- [ ] Compte Gmail connecté (Task 1 + Task 2)
- [ ] Compte Google Calendar connecté (Task 1)
- [ ] Adresse Readwise Reader : `add@readwise.io` (vérifier dans Readwise > Settings > Email)
- [ ] Mac qui reste allumé cette nuit

---

## Étape 1 — Préparer les dossiers

```bash
mkdir -p ~/Desktop/Planning
mkdir -p ~/Desktop/Veille-YouTube
```

## Étape 2 — Copier chaines.txt

Copier le fichier `chaines.txt` de ce dossier vers `~/Desktop/Veille-YouTube/chaines.txt`.

```bash
# D'abord, se placer dans le dossier contenant chaines.txt
cd /chemin/vers/a-tourner/claude-cowork

cp chaines.txt ~/Desktop/Veille-YouTube/chaines.txt
```

Ou le créer manuellement avec les chaînes souhaitées (une par ligne).

## Étape 3 — Créer le calendrier Google "Cowork"

1. Google Calendar > + à côté de "Autres agendas" > Créer un agenda
2. Nom : **Cowork**
3. Couleur : au choix (violet ou bleu pour distinguer)
4. Sauvegarder

## Étape 4 — Vérifier l'adresse Readwise

1. Aller sur https://readwise.io/reader
2. Settings > Email > copier l'adresse d'envoi
3. Si c'est bien `add@readwise.io`, rien à changer dans le prompt Task 2
4. Sinon, modifier l'adresse dans le prompt Task 2 (2 occurrences)

## Étape 5 — Créer les 3 Scheduled Tasks

Ouvrir Claude Desktop > Cowork > Scheduled

### Task 1 — Assistant de productivité
- **Nom** : Productivité
- **Schedule** : Daily, 7h00
- **Prompt** : Copier le contenu ENTIER de `prompt-task-1-productivite.md`

### Task 2 — Tri des newsletters
- **Nom** : Newsletters
- **Schedule** : Daily, 7h15
- **Prompt** : Copier le contenu ENTIER de `prompt-task-2-newsletters.md`

### Task 3 — Veille concurrentielle YouTube
- **Nom** : Veille YouTube
- **Schedule** : Weekly, Lundi, 6h00
- **Prompt** : Copier le contenu ENTIER de `prompt-task-3-veille-youtube.md`

## Étape 6 — Tester chaque task

Pour chaque task :
1. Cliquer "Run now"
2. Vérifier que la task démarre et se termine sans erreur
3. Vérifier le résultat :

| Task | Vérification |
|------|-------------|
| Task 1 | Fichier `~/Desktop/Planning/planning-YYYY-MM-DD.md` créé + événements dans Google Calendar "Cowork" |
| Task 2 | Email(s) envoyé(s) à Readwise + newsletters archivées dans Gmail |
| Task 3 | Fichier `~/Desktop/Veille-YouTube/veille-YYYY-MM-DD.html` créé + ouvrable dans navigateur |

## Étape 7 — Laisser tourner

- Mac allumé cette nuit (désactiver la mise en veille ou brancher)
- Les tasks tourneront automatiquement :
  - Task 3 : lundi 6h00 (si demain = lundi)
  - Task 1 : 7h00
  - Task 2 : 7h15
- Résultats réels prêts pour le tournage demain matin/soir

---

## Vérification finale (demain matin)

- [ ] `~/Desktop/Planning/` contient un fichier planning du jour
- [ ] Google Calendar "Cowork" a les 3 blocs du jour
- [ ] Le planning a une section "Jugement" avec les contestations de priorités
- [ ] Readwise a reçu les newsletters "À LIRE" en entier
- [ ] Readwise a reçu l'email récap "Veille — [date]"
- [ ] Gmail : newsletters archivées, inbox plus propre
- [ ] `~/Desktop/Veille-YouTube/` contient le dashboard HTML (si lundi)
- [ ] Le dashboard s'ouvre dans le navigateur et est lisible

---

## Troubleshooting

**Task ne se lance pas :**
- Vérifier que le Mac est bien éveillé (pas en veille)
- Vérifier que Claude Desktop est ouvert
- Relancer avec "Run now"

**Task 1 — Pas d'accès Todoist :**
- Vérifier les permissions dans Claude Desktop settings
- Reconnecter le compte Todoist si nécessaire

**Task 2 — Pas d'accès Gmail :**
- Vérifier les permissions Gmail dans Claude Desktop
- Tester manuellement l'envoi vers l'adresse Readwise

**Task 3 — chaines.txt introuvable :**
- Vérifier le chemin : `~/Desktop/Veille-YouTube/chaines.txt`
- La task doit créer un fichier d'exemple si absent

---

## Fichiers dans ce dossier

```
a-tourner/claude-cowork/
├── SETUP-MAC.md                       ← Ce fichier
├── instructions.md                    ← Brief vidéo (existant)
├── prompt-task-1-productivite.md      ← Prompt Task 1 (copier dans Cowork)
├── prompt-task-2-newsletters.md       ← Prompt Task 2 (copier dans Cowork)
├── prompt-task-3-veille-youtube.md    ← Prompt Task 3 (copier dans Cowork)
├── chaines.txt                        ← Copier vers ~/Desktop/Veille-YouTube/
└── Productivité/                      ← Research files (existant)
```
