# CHECKPOINT — Vidéo "Employé IA 512 failles"

> Dernière MAJ : 2026-02-25
> Statut : **Pré-planification terminée, prêt à exécuter**

---

## Contexte

Vidéo YouTube sur le thème : "Un employé IA sans mémoire métier = un stagiaire brillant qui comprend rien."
Angle : attaquer OpenClaw (outil IA avec 512 failles) et montrer l'alternative — un agent IA doté de skills (process internes) + données clients + actions (Gmail draft).

## Décisions prises

| Question | Décision |
|----------|----------|
| Source données clients | **Airtable** (pas Google Sheets) |
| Repo GitHub skills | A créer chez **Frutzmann/business-memory-skills** |
| LLM pour l'agent | **OpenRouter — Haiku 4.5** (credential existant sur n8n) |
| Design slides | **Polish** sur la base existante (pas de refonte) |
| Skills en démo | Afficher les 4 sur GitHub, démo live sur **relances uniquement** |

## Les 4 chantiers à exécuter

### 1. Airtable — Migration base clients
- Transférer les 7 clients de `files/clients-database.xlsx` dans une base+table Airtable
- 20 colonnes : Client, Contact, Email, Rôle, Langue, Priorité, CA_annuel, Taux_jour, Cycle_facturation, Conditions_paiement, Canal_relance, Ton_relance, Délai_relance_min, Prérequis_relance, Format_reporting, Fréquence_reporting, Destinataires_reporting, Préférences_reporting, Sensibilités, Notes
- Créer d'éventuelles tables supplémentaires si la démo le nécessite (ex: table Factures pour contexte relances)
- **Base ID** : `appUxa9p0fQwPhQOd`
- **Table ID** : `tblOsQdltpPG8Jxcd` (table "Clients")
- 7 records insérés, 20 champs typés (singleSelect, number, email, multilineText...)
- **Statut** : FAIT

### 2. GitHub — Repo skills
- Repo créé : `Frutzmann/business-memory-skills` (public)
- 4 skills pushés :
  - `skills/relance/SKILL.md`
  - `skills/facturation/SKILL.md`
  - `skills/reporting/SKILL.md`
  - `skills/onboarding/SKILL.md`
- API skills index : `https://api.github.com/repos/Frutzmann/business-memory-skills/contents/skills/`
- **Statut** : FAIT

### 3. n8n — Workflow "Business Memory Agent"
- **v2** — Reproduit template #13270 (skills-first architecture)
- Architecture :
  ```
  Chat Trigger (webhook)
       ↓
  Set GitHub Repo URLs ["Frutzmann/business-memory-skills"]
       ↓
  Split Out
       ↓ (parallel)
  ┌─ List Root Dirs (github)
  └─ List Skills Dirs (github, onError: continueRegularOutput)
       ↓                    ↓
  Filter root          Filter skills
       ↓                    ↓
  Merge Directory Structures
       ↓
  AI Agent (v3.1, executeOnce, maxIterations 150)
    ├── Chat Model (OpenRouter Haiku 4.5)     [ai_languageModel]
    ├── List Files by Path Name (githubTool)   [ai_tool]
    ├── Get a File From GitHub (httpRequest)    [ai_tool]
    ├── Chercher un client (airtableTool)      [ai_tool]  ← AJOUT
    ├── Créer draft Gmail (toolHttpRequest)    [ai_tool]  ← AJOUT
    └── Simple Memory                          [ai_memory]
  ```
- Credentials : GitHub (`nRnTQCp4tNC4KMzD`), OpenRouter (`HQBPZJgj7C1eSvvr`), Airtable (`UB9UH3QdfkJNKYgJ`), Gmail (`PDKygmbDCIXc7YCh`)
- **Workflow ID** : `7ldori0Uez9v569J`
- **Statut** : FAIT (v2)
  - 15 nodes, 14 connections
  - System prompt : Cabinet Morel, skills-first, interdit drafts avant lecture skill+client
  - Workflow activé

### 4. Slides — Polish + connexion démo
- Fichier : `files/slides-demo-openclaw.html`
- Webhook URL : `https://n8n.srv824812.hstgr.cloud/webhook/business-memory-chat`
- Chat Trigger CORS : `allowedOrigins: "*"` configuré sur le workflow n8n
- AbortController timeout 60s (messages différenciés : timeout vs erreur connexion)
- sessionId `slides-demo` envoyé pour persistance mémoire entre messages
- Markdown amélioré : **bold** → `<strong>`, `\n` → `<br>`, `- item` → bullet
- Chat wrapper height : 460px → 520px
- **Statut** : FAIT

## Ordre d'exécution

```
1. Airtable (base + tables)          ← aucune dépendance
2. GitHub (repo + skills)             ← aucune dépendance (parallélisable avec 1)
3. n8n workflow                       ← dépend de 1 (IDs Airtable) + 2 (repo URL)
4. Slides polish + connexion webhook  ← dépend de 3 (URL webhook)
```

## Fichiers dans /files

| Fichier | Rôle | Statut |
|---------|------|--------|
| `DEMAIN-30-MIN.md` | Plan de shooting minute par minute | Référence |
| `SKILL.md` | Skill relances (racine) | A pusher sur GitHub |
| `mnt/.../skills/reporting/SKILL.md` | Skill reporting | A pusher sur GitHub |
| `mnt/.../skills/facturation/SKILL.md` | Skill facturation | A pusher sur GitHub |
| `mnt/.../skills/onboarding/SKILL.md` | Skill onboarding | A pusher sur GitHub |
| `clients-database.xlsx` | 7 clients, 20 colonnes | A migrer vers Airtable |
| `business-memory-agent-v2.json` | Workflow n8n template | A adapter et déployer |
| `slides-demo-openclaw.html` | 10 slides + chat live | A polisher et connecter |

## n8n Instance
- URL : `https://n8n.srv824812.hstgr.cloud`
- API key dans `.mcp.json`
