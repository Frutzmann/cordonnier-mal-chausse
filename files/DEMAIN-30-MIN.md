# DEMAIN — 30 MINUTES — EXÉCUTION

---

## ARCHITECTURE

```
[Chat dans la slide HTML]
        ↓ webhook
[Agent n8n Claude]
   ↓ outil 1              ↓ outil 2              ↓ outil 3
[GitHub]                [Google Sheets]          [Gmail]
 Skills = compétences    Data = fiches clients    Action = draft email
 "comment relancer"      "Dupont = email,         Brouillon prêt
                          J+15, ton doux"          à envoyer
```

---

## LA DÉMO — 2 MESSAGES

### Message 1 : "Comment on formule une relance chez nous ?"

L'agent lit `skills/relances/SKILL.md` → répond avec le process interne du cabinet.
Le viewer voit : il connaît les règles.

### Message 2 : "Génère la relance pour Dupont et fais-en un draft Gmail."

L'agent lit `skills/relances/SKILL.md` + récupère la fiche Dupont dans Google Sheets + crée le draft Gmail.

Réponse attendue :
> Dupont Fiduciaire — retard de 18 jours.
> D'après nos règles : relance par email uniquement (jamais de téléphone pour Marie), ton amical, pas de mention de pénalités.
> 
> Draft créé dans Gmail ✅
> 
> Objet : Facture F-2026-018 — petit rappel
> Destinataire : m.dupont@dupont-fid.lu
> 
> Bonjour Marie,
> J'espère que tout va bien de votre côté...

Le viewer voit : un email RÉEL dans Gmail, au BON ton, avec les BONNES exceptions. En une phrase.

### Face caméra après :

"Un nouvel employé aurait eu besoin de 3 mois pour apprendre tout ça. L'IA l'a lu en 2 secondes."

"C'est pas de la magie. C'est de la mémoire."

---

## MINUTE PAR MINUTE

### 0-5 min : GitHub

1. Créer le repo `business-memory-skills` (public)
2. Upload le dossier `skills-repo/` :
   ```
   skills/
   ├── relances/SKILL.md
   ├── reporting/SKILL.md
   ├── facturation/SKILL.md
   └── onboarding/SKILL.md
   ```
3. Push.

### 5-10 min : Google Sheets

1. Importer `clients-database.xlsx` dans Google Sheets
2. Vérifier que les données sont propres (colonnes, accents, emojis priorité)
3. Partager le sheet (accès en lecture pour le service account n8n)
4. Copier l'ID du spreadsheet (dans l'URL entre /d/ et /edit)

### 10-25 min : n8n

1. Importer `business-memory-agent-v2.json`
2. Remplacer les placeholders :
   - `YOUR_GITHUB_USERNAME` → ton username
   - `YOUR_SPREADSHEET_ID` → l'ID du Google Sheet
   - Tous les credential IDs (Anthropic, GitHub, Google Sheets, Gmail)
3. ⚠️ Le node "Chercher un client" est un MVP — tu devras probablement :
   - Soit utiliser le node Google Sheets natif n8n (plus simple) comme outil de l'agent
   - Soit adapter l'URL de l'API Google Sheets avec ton credential
4. Activer le workflow
5. Tester : `Relance les clients en retard` puis `Génère la relance pour Dupont et fais-en un draft Gmail`

### 25-30 min : Slide HTML

1. Ouvrir `slides-demo-openclaw.html` (déjà livré)
2. Remplacer l'URL webhook
3. Tester le chat sur la slide 8

---

## ⚠️ POINTS D'ATTENTION

- **Google Sheets comme outil agent** : le node HTTP Request dans le workflow est un MVP. En pratique, utiliser le **node Google Sheets natif** de n8n comme tool de l'agent sera plus fiable. Claude Code peut t'aider à brancher ça.
- **Gmail draft** : le node HTTP Request pour Gmail nécessite un OAuth2 bien configuré. Alternative : utiliser le **node Gmail natif** de n8n comme tool.
- **Latence** : 3 outils = 3 appels. Prévoir 8-15 secondes de réponse. Le typing indicator dans la slide gère l'attente visuellement.
- **Fallback** : si le live bug, tu peux screener la démo depuis le chat n8n intégré et monter au montage.

---

## CE QUE TU MONTRES DANS LA VIDÉO (par ordre)

1. Structure GitHub 2-3 sec → "Ses compétences."
2. UN skill ouvert 2 sec → des instructions, un process
3. Google Sheet 2 sec → "Sa mémoire. Ses clients."
4. Le chat : message 1 → message 2 → draft Gmail
5. Face caméra : punchline
6. Cut n8n 5 sec : workflow exécuté, temps affiché
