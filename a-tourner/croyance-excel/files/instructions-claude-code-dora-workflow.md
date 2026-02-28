# INSTRUCTIONS CLAUDE CODE — Workflow n8n Démonstratif "DORA Reporting"

## Contexte

Ce workflow est créé pour une vidéo YouTube. Il n'a PAS besoin d'être connecté à des systèmes réels. Il doit être **visuellement impressionnant**, **fonctionnel en démo**, et **crédible** pour un COO de ManCo luxembourgeoise qui connaît DORA.

Le workflow simule l'automatisation du Register of Information DORA — le process par lequel une ManCo collecte, consolide, formate et monitore les données de ses prestataires ICT pour le régulateur (CSSF).

---

## Objectif

Créer un workflow n8n démonstratif qui couvre 5 étapes :

1. **Ingestion** — Réception automatique des données prestataires ICT
2. **Extraction** — Parsing des données depuis emails/PDFs
3. **Consolidation** — Agrégation dans une base structurée
4. **Formatage** — Transformation vers le format des templates DORA ITS
5. **Monitoring** — Dashboard de statut avec alertes

---

## Stack technique

| Composant | Outil | Justification |
|---|---|---|
| Orchestration | **n8n** (self-hosted) | Outil principal de Francis, crédibilité chaîne |
| Base de données | **Airtable** OU **Google Sheets** | Visuel, facile à montrer en démo, pas besoin de Supabase pour le demo |
| Email trigger | **Gmail** ou **IMAP** node n8n | Trigger réaliste — tout le monde comprend un email |
| PDF parsing | **Extract from File** node n8n OU **Claude API** | Extraction de données depuis PDF contrat |
| Dashboard | **Page HTML simple** OU **Airtable Interface** | Vue monitoring pour le COO |
| Alertes | **Slack** ou **Email** node | Notifications quand données manquantes |

---

## Architecture du workflow n8n

### Workflow 1 — Ingestion & Extraction

```
[Gmail Trigger] — Nouvel email avec pièce jointe d'un prestataire ICT
    ↓
[IF] — Vérifier que l'expéditeur est dans la liste des prestataires connus
    ↓
[Extract from File] — Parser le PDF joint (contrat, SLA, rapport d'incident)
    ↓
[Claude API / OpenAI] — Extraire les champs structurés depuis le texte :
    - Nom du prestataire
    - Type de service ICT
    - Criticité (critique / important / non-critique)
    - Localisation des données (pays, data center)
    - Sous-traitants du prestataire
    - SLA uptime (%)
    - Date de dernier incident
    - Clauses de sortie (résumé)
    - Date de renouvellement contrat
    ↓
[Airtable / Google Sheets] — Insérer ou mettre à jour la ligne du prestataire
    ↓
[Slack / Email] — Notification : "Données reçues de [Prestataire X] — 8/9 champs remplis"
```

### Workflow 2 — Formatage DORA

```
[Schedule Trigger] — Tous les lundis à 8h (ou trigger manuel pour la démo)
    ↓
[Airtable / Google Sheets] — Lire toutes les données prestataires
    ↓
[Code Node (JavaScript)] — Transformer les données vers la structure des templates ITS DORA :
    - Template B_01 : Register of contractual arrangements
    - Template B_02 : ICT service providers
    - Template B_05 : Assessment of criticality/importance
    ↓
[Spreadsheet File] — Générer le fichier Excel formaté selon les templates ITS
    ↓
[Google Drive / Email] — Sauvegarder le fichier généré + notifier le COO
    ↓
[Slack / Email] — "Register DORA mis à jour — 15/15 templates complets ✅"
```

### Workflow 3 — Monitoring & Alertes

```
[Schedule Trigger] — Tous les jours à 9h
    ↓
[Airtable / Google Sheets] — Vérifier pour chaque prestataire :
    - Données à jour ? (dernière mise à jour < 90 jours)
    - Tous les champs obligatoires remplis ?
    - Contrat expirant dans les 60 prochains jours ?
    - Incident non résolu ?
    ↓
[IF] — Si anomalie détectée
    ↓
[Slack / Email] — Alerte : "[Prestataire Y] — données obsolètes depuis 95 jours"
    ↓
[Airtable / Google Sheets] — Mettre à jour le statut dans le dashboard
    ↓
[Webhook] — (Optionnel) Mettre à jour la page HTML dashboard
```

---

## Données fictives à créer

### 10-12 prestataires ICT fictifs (réalistes pour une ManCo Tier 2-3)

| Prestataire | Type de service | Criticité |
|---|---|---|
| CloudLux Solutions | Hébergement infrastructure (cloud privé) | Critique |
| Temenos AG | Système de calcul NAV (Multifonds) | Critique |
| SimCorp | Monitoring compliance & risques | Critique |
| Finologee | Connectivité bancaire (LYNKS) | Important |
| FE fundinfo | Reporting réglementaire (eDesk) | Important |
| Kneip | Production KID/KIID | Important |
| CyberGuard Lux | Cybersécurité / SOC | Critique |
| DataStream SARL | Flux de données de marché (pricing) | Important |
| SecureComms | Email sécurisé / archivage | Non-critique |
| LuxOffice IT | Support IT interne / helpdesk | Non-critique |
| BackupPro | Sauvegarde et disaster recovery | Critique |
| CompliTech | Screening AML/sanctions | Important |

### Pour chaque prestataire, générer :

- Un faux PDF de "rapport trimestriel" ou "fiche contractuelle" (1-2 pages, texte structuré avec les champs DORA)
- Des données cohérentes : SLAs réalistes (99,5-99,99%), localisations luxembourgeoises et européennes, dates de contrat plausibles
- 2-3 prestataires avec des "problèmes" pour la démo d'alertes :
  - CloudLux : données pas mises à jour depuis 95 jours
  - SecureComms : contrat expire dans 45 jours
  - DataStream : champ "sous-traitants" non renseigné

---

## Structure de la base de données (Airtable / Google Sheets)

### Table principale : `ICT_Providers`

| Champ | Type | Description |
|---|---|---|
| provider_id | Auto | ID unique |
| provider_name | Texte | Nom du prestataire |
| service_type | Select | Hébergement / Calcul / Compliance / Connectivité / Sécurité / Support / Reporting / Données / Backup / AML |
| criticality | Select | Critique / Important / Non-critique |
| data_location_country | Texte | Luxembourg, Allemagne, Irlande... |
| data_location_datacenter | Texte | LuxConnect Bettembourg, AWS Frankfurt... |
| subcontractors | Texte long | Liste des sous-traitants avec localisation |
| sla_uptime_pct | Nombre | 99.95 |
| contract_start_date | Date | |
| contract_end_date | Date | |
| contract_renewal_type | Select | Automatique / Manuel |
| exit_clause_summary | Texte long | Résumé des conditions de sortie |
| last_incident_date | Date | |
| last_incident_summary | Texte long | |
| last_data_update | Date | Date de dernière mise à jour des données |
| completion_pct | Nombre | % de champs obligatoires remplis |
| status | Select | ✅ Complet / ⚠️ Incomplet / 🔴 Obsolète |
| dora_template_ref | Texte | B_01, B_02, B_05... |

### Table secondaire : `DORA_Templates_Status`

| Champ | Type | Description |
|---|---|---|
| template_id | Texte | B_01, B_02, B_03... B_15 |
| template_name | Texte | Nom officiel du template ITS |
| completion_pct | Nombre | % de complétion global |
| last_generated | Date | Dernière génération du fichier |
| status | Select | ✅ Prêt / ⚠️ Incomplet / 🔴 Non généré |

---

## Dashboard monitoring (page HTML simple)

Créer une page HTML/CSS/JS simple qui affiche :

### Vue principale
- **Titre** : "DORA Register — Monitoring Dashboard"
- **Score global** : barre de progression circulaire ou linéaire — "87% complet" (en vert/jaune/rouge selon le %)
- **Date de dernière mise à jour** du register complet

### Vue par prestataire
- Liste des 12 prestataires avec pour chacun :
  - Nom + type de service
  - Criticité (badge coloré)
  - Statut (✅ / ⚠️ / 🔴)
  - Dernière mise à jour
  - % de complétion des champs

### Vue par template
- Les 15 templates DORA avec statut de complétion
- Barre de progression par template

### Alertes actives
- Section en haut avec les alertes en cours :
  - "⚠️ CloudLux Solutions — données obsolètes (95 jours)"
  - "⚠️ SecureComms — contrat expire dans 45 jours"
  - "⚠️ DataStream SARL — champ sous-traitants manquant"

### Style
- **Dark theme** (cohérent avec la charte de la chaîne)
- Navy (#011638) background
- Violet (#9D4F9E) pour les accents et la progression
- Blanc (#EEF0F2) pour le texte
- Clean, pro, pas de fioritures — le genre de dashboard qu'un COO veut RÉELLEMENT voir
- **Responsive** — doit être montrable sur téléphone en démo (min 5:00 de la vidéo)

---

## Fichier Excel démonstratif "AVANT" (le chaos)

Créer un fichier Excel (.xlsx) visuellement impressionnant qui représente le "AVANT" — le chaos Excel que le workflow va remplacer.

### 12 onglets :
1. `DORA_ICT_Providers` — liste des prestataires, données partiellement remplies, colonnes mal alignées
2. `DORA_Risk_Assessment` — évaluation des risques, formules cassées visibles (#REF!, #VALUE!)
3. `DORA_Exit_Plans` — plans de sortie, cellules vides, commentaires "À COMPLÉTER"
4. `NAV_Control_Q4` — contrôles NAV, chiffres, formules imbriquées
5. `SFDR_Template_EET` — 600+ champs, scroll interminable
6. `AML_Screening_Log` — log de screening, dates, statuts
7. `Delegataire_Monitoring` — suivi des délégataires, données manuelles
8. `CSSF_Reporting_Q4` — reporting trimestriel, mise en page laborieuse
9. `Reconciliation_Master` — réconciliations, vlookups partout
10. `KYC_Tracker` — suivi KYC investisseurs
11. `Board_Pack_Data` — données pour le board pack
12. `ARCHIVE_2024` — vieilles données, onglet qu'on n'ose plus toucher

### Caractéristiques visuelles du fichier :
- Mélange de couleurs de cellules (jaune, vert, rouge) — le code couleur "maison" typique
- Formules VLOOKUP et INDEX/MATCH visibles dans la barre de formule
- 2-3 cellules avec #REF! ou #VALUE! (erreurs non résolues)
- Commentaires dans les cellules : "JEAN-MARC : vérifier ce chiffre", "MàJ en attente réponse prestataire"
- Colonnes de largeur inégale
- Quelques lignes masquées (le viewer expert reconnaît le pattern)
- Entre 200 et 500 lignes de données fictives au total

---

## PDFs prestataires (pour la démo d'ingestion)

Créer 3 PDFs fictifs minimalistes (1-2 pages chacun) :

### PDF 1 : "CloudLux Solutions — Rapport Trimestriel Q4 2025"
```
CLOUDLUX SOLUTIONS S.A.
Rapport trimestriel — Service d'hébergement infrastructure
Période : Q4 2025

Type de service : Hébergement cloud privé (IaaS)
Criticité : Critique
Localisation données : LuxConnect Bettembourg, Luxembourg
Sous-traitants : Proximus Luxembourg (connectivité réseau)

SLA Uptime : 99.97% (cible : 99.95%)
Incidents période : 1 incident mineur (12/11/2025 — latence réseau 45 min, résolu)

Contrat : LUX-CL-2022-0847
Date de début : 01/03/2022
Date d'expiration : 28/02/2026
Renouvellement : Automatique (préavis 90 jours)
Clause de sortie : Migration assistée sur 6 mois, données restituées sous 30 jours
```

### PDF 2 : "Temenos AG — Fiche Contractuelle"
```
TEMENOS AG
Fiche contractuelle — Système Multifonds (calcul NAV)

Type de service : Logiciel de calcul et supervision NAV
Criticité : Critique
Localisation données : Temenos SaaS — Francfort, Allemagne (EU)
Sous-traitants : AWS Frankfurt (infrastructure), Temenos India (support L2)

SLA Uptime : 99.99%
Incidents période : 0

Contrat : TEM-LUX-2021-1203
Date de début : 15/06/2021
Date d'expiration : 14/06/2026
Renouvellement : Manuel (négociation en cours)
Clause de sortie : Export données en format standard sous 90 jours
```

### PDF 3 : "DataStream SARL — Rapport Trimestriel Q4 2025"
```
DATASTREAM SARL
Rapport trimestriel — Flux de données de marché

Type de service : Données de marché (pricing titres)
Criticité : Important
Localisation données : Luxembourg (serveurs propres)
Sous-traitants : [NON RENSEIGNÉ]

SLA Uptime : 99.90% (cible : 99.95%) ⚠️ En dessous du SLA
Incidents période : 2 incidents (03/10 — flux interrompu 2h ; 18/12 — données erronées sur 12 titres, corrigé en 4h)

Contrat : DS-2023-0456
Date de début : 01/01/2023
Date d'expiration : 31/12/2025
Renouvellement : En discussion
Clause de sortie : Préavis 60 jours, pas de migration assistée
```

**Note :** DataStream a volontairement un champ sous-traitants manquant + un SLA en dessous de la cible. C'est le prestataire "problème" qui déclenche les alertes dans la démo.

---

## Séquence de démo pour le tournage

### Prise 1 — Le process manuel (30 sec de screen recording)
1. Ouvrir la boîte mail — montrer l'email de CloudLux avec le PDF joint
2. Ouvrir le PDF
3. Ouvrir le fichier Excel "AVANT" (le chaos)
4. Commencer à copier-coller manuellement les données du PDF vers Excel
5. Montrer la lenteur et le côté pénible — NE PAS accélérer

### Prise 2 — Le workflow n8n (60 sec de screen recording)
1. Montrer le workflow n8n complet (vue d'ensemble — le viewer voit l'architecture)
2. Déclencher le workflow manuellement (ou montrer le trigger email)
3. Montrer les données qui arrivent automatiquement dans la base structurée
4. Montrer la transformation vers le format DORA template
5. Montrer le fichier Excel de sortie — propre, formaté, complet

### Prise 3 — Le dashboard (30 sec de screen recording)
1. Desktop : montrer le dashboard complet avec les 12 prestataires
2. Zoomer sur les alertes actives (CloudLux, SecureComms, DataStream)
3. Mobile : même dashboard sur téléphone (le COO qui vérifie depuis son canapé)

### Prise 4 — L'avant/après split screen (10 sec)
1. Gauche : le fichier Excel chaos
2. Droite : le dashboard propre
3. Transition visuelle pour la vidéo

---

## Contraintes techniques

- **Données 100% fictives.** Aucun nom réel de ManCo, aucune donnée sensible.
- **Infrastructure Francis.** n8n self-hosted, Airtable/Google Sheets, pas de dépendance à des outils payants complexes.
- **Mention implicite data privacy.** Le workflow tourne en local / sur infra contrôlée. Mentionner "et évidemment, tout reste sur ton infrastructure" — une phrase, pas un chapitre.
- **Pas besoin de connexion réelle à eDesk/CISERO.** Le workflow s'arrête au fichier prêt à soumettre.

---

## Livrables attendus

1. ✅ Workflow n8n (3 sous-workflows) — importables via JSON
2. ✅ Base de données Airtable / Google Sheets avec 12 prestataires fictifs
3. ✅ Fichier Excel "AVANT" (le chaos — 12 onglets)
4. ✅ 3 PDFs prestataires fictifs
5. ✅ Dashboard HTML monitoring (responsive, dark theme, charte couleur)
6. ✅ Fichier Excel "APRÈS" (sortie formatée DORA templates)
