# Cordonnier Mal Chaussé - Automatisation n8n

Série YouTube montrant comment automatiser les processus d'une agence digitale fictive avec n8n.

## Contenu

### Vidéo 1 - Rapport Hebdomadaire Client
- `slides.html` - Slides de présentation
- `shooting_framework_v2_final.docx` - Script de tournage
- `excel/` - Données mock pour Google Sheets
- `bckp/backup.json` - Backup du workflow n8n

### Vidéo 2 - Relances Factures Impayées
- `shooting_framework_video2.docx` - Script de tournage
- `Video 2/CSVs/` - Données mock Airtable (Clients, Factures, Projets, Suivi Temps, Templates Email)
- `Video 2/WF/` - Spécifications des workflows (wfA, wfB, wfC)

## Workflows n8n

| Workflow | Description |
|----------|-------------|
| Rapport Hebdomadaire | Google Sheets → Merge → HTML → Email + Slack |
| Tableau de Bord Rentabilité | Airtable → Calcul marges → Slack dashboard |
| Relances Factures Impayées | Airtable → Switch par retard → Slack approval → Email |
| Facture Automatique | Airtable trigger → HTML → PDF → Gmail draft → Slack approval |

## Stack

- **n8n** (self-hosted)
- **Airtable** (base de données)
- **Google Sheets** (reporting)
- **Slack** (notifications & approbations)
- **Gmail** (envoi emails)
