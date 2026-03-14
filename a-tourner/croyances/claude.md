# INSTRUCTIONS CLAUDE CODE — 4 Workflows n8n + Documents + PDFs

> **Règle absolue : zéro nœud Code hardcodé. Uniquement des nœuds natifs n8n. Les données sont dans de vrais fichiers. Les outputs sont des fichiers réels ou des emails réels. Tout doit être filmable à l'écran.**

---

## PRIORITÉ DE CONSTRUCTION

| Priorité | Workflow | Vidéos | Publication |
|---|---|---|---|
| 🔴 CE SOIR | A — Le Consolidateur | V1 + V2 | Lundi 16 mars |
| 🟠 DEMAIN MATIN | B — La Sentinelle | V3 + V4 | Lundi 23 mars |
| 🟠 DEMAIN MATIN | C — Le Générateur | V5 + V6 | Lundi 30 mars |
| 🟡 PEUT ATTENDRE | D — L'Extracteur | V7 + V8 | Lundi 6 avril |

---

## WORKFLOW A — LE CONSOLIDATEUR
**Vidéos : V1 + V2 | Publication : 16 mars**

### Ce que le workflow fait
Prend 3 fichiers Excel (taux contractuels ManCo, calcul admin externe, facturation comptable), les normalise, les fusionne sur la clé ISIN, et produit 2 outputs :
- **Output A** → fichier Excel consolidé (1 ligne par fonds, tout aligné) → V1
- **Output B** → rapport d'anomalies (chaque écart avec sévérité) → V2

### Architecture n8n — nœuds natifs UNIQUEMENT
```
[Read Binary File] × 3 — charge les 3 fichiers .xlsx
↓
[Spreadsheet File] × 3 — parse chaque fichier Excel
↓
[HTTP Request vers Claude API] — normalisation des colonnes
↓
[Merge] — joint sur la clé ISIN
↓
[HTTP Request vers Claude API] — détection des anomalies
↓
[Switch] — sépare les 2 branches
↓                    ↓
[Spreadsheet File]   [Spreadsheet File]
Output consolidé     Rapport anomalies
↓                    ↓
[Write Binary File]  [Write Binary File]
fichier_consolide.xlsx   rapport_anomalies.xlsx
```

### Fichiers à créer — FICHIER 1 : taux_contractuels.xlsx

Colonnes : Nom du Fonds | Code ISIN | Taux Mgt Fee (%) | Encours Moyen (M€) | Fee Attendu (€) | Période | Dernière MAJ

| Nom du Fonds | Code ISIN | Taux Mgt Fee (%) | Encours Moyen (M€) | Fee Attendu (€) | Période | Dernière MAJ |
|---|---|---|---|---|---|---|
| European Growth UCITS | LU0123456789 | 1.25 | 450.0 | 468750 | Jan 2025 | 15/01/2025 |
| Global Fixed Income AIFM | LU0234567890 | 0.85 | 820.0 | 580833 | Jan 2025 | 15/01/2025 |
| Asia Pacific Equity | LU0345678901 | 1.50 | 310.0 | 387500 | Jan 2025 | 15/01/2025 |
| Nordic Small Cap | LU0456789012 | 1.10 | 175.0 | 160417 | Jan 2025 | 15/01/2025 |
| EM Debt Opportunities | LU0567890123 | 0.95 | 540.0 | 427500 | Jan 2025 | 15/01/2025 |
| Sustainable Europe ESG | LU0678901234 | 1.20 | 290.0 | 290000 | Jan 2025 | 15/01/2025 |
| US Large Cap Growth | LU0789012345 | 0.75 | 680.0 | 425000 | Jan 2025 | 15/01/2025 |
| Luxembourg Real Estate | LU0890123456 | 1.80 | 150.0 | 225000 | Jan 2025 | 15/01/2025 |
| Multi-Asset Balanced | LU0901234567 | 1.00 | 410.0 | 341667 | Jan 2025 | 15/01/2025 |
| Credit Opportunities HY | LU1012345678 | 1.35 | 225.0 | 253125 | Jan 2025 | 15/01/2025 |
| Japan Equity Select | LU1123456789 | 1.40 | 195.0 | 227500 | Jan 2025 | 15/01/2025 |
| Global Macro Strategy | LU1234567890 | 1.15 | 360.0 | 345000 | Jan 2025 | 15/01/2025 |
| Infrastructure Debt Fund | LU1345678901 | 0.65 | 510.0 | 276250 | Jan 2025 | 15/01/2025 |
| Private Equity Feeder | LU1456789012 | 1.75 | 280.0 | 408333 | Jan 2025 | 03/09/2024 |
| Tech Innovation Fund | LU1567890123 | 1.30 | 425.0 | 460417 | Jan 2025 | 15/01/2025 |

**Anomalie cachée ligne 14 (PE Feeder) :** Dernière MAJ = 03/09/2024. Taux encore à 1.75% mais avenant signé en novembre → taux devrait être 1.50%.

### Fichiers à créer — FICHIER 2 : calcul_admin.xlsx

Colonnes en anglais (format admin externe). Dates en format MM/DD/YYYY. Encours en valeur absolue (pas en millions).

| Fund_ISIN | Fund_Name | Fee_Rate_Annual | Avg_AuM_EUR | Mgt_Fee_Calculated | Period | Calc_Date |
|---|---|---|---|---|---|---|
| LU0123456789 | European Growth | 1.25 | 450000000 | 468750.00 | 01/2025 | 02/05/2025 |
| LU0234567890 | Global Fixed Income | 0.85 | 818500000 | 579854.17 | 01/2025 | 02/05/2025 |
| LU0345678901 | Asia Pacific Eq | 1.50 | 312400000 | 390500.00 | 01/2025 | 02/05/2025 |
| LU0456789012 | Nordic Small Cap | 1.10 | 175000000 | 160416.67 | 01/2025 | 02/05/2025 |
| LU0567890123 | EM Debt Opps | 0.95 | 540000000 | 427500.00 | 01/2025 | 02/05/2025 |
| LU0678901234 | Sust Europe ESG | 1.20 | 290000000 | 290000.00 | 01/2025 | 02/05/2025 |
| LU0789012345 | US Large Cap | 0.75 | 680000000 | 425000.00 | 01/2025 | 02/05/2025 |
| LU0890123456 | Lux Real Estate | 1.80 | 162500000 | 243750.00 | 01/2025 | 02/05/2025 |
| LU0901234567 | Multi-Asset Bal | 1.00 | 410000000 | 341666.67 | 01/2025 | 02/05/2025 |
| LU1012345678 | Credit Opps HY | 1.35 | 225000000 | 253125.00 | 01/2025 | 02/05/2025 |
| LU1123456789 | Japan Eq Select | 1.40 | 195000000 | 227500.00 | 01/2025 | 02/05/2025 |
| LU1234567890 | Global Macro | 1.15 | 360000000 | 345000.00 | 01/2025 | 02/05/2025 |
| LU1345678901 | Infra Debt | 0.65 | 510000000 | 276250.00 | 01/2025 | 02/05/2025 |
| LU 1456789012 | PE Feeder | 1.50 | 280000000 | 350000.00 | 01/2025 | 02/05/2025 |
| LU1567890123 | Tech Innovation | 1.30 | 425000000 |  | 01/2025 | 02/05/2025 |

**Anomalies cachées :**
- Ligne 2 (Global FI) : encours 818.5M vs 820M → écart fee 979€
- Ligne 3 (Asia Pacific) : encours 312.4M vs 310M → écart fee 3 000€
- Ligne 8 (Lux Real Estate) : encours 162.5M vs 150M → écart fee 18 750€ — GROS
- Ligne 14 (PE Feeder) : ISIN avec espace "LU 1456789012" + taux 1.50% vs 1.75% → écart 58 333€ — CRITIQUE
- Ligne 15 (Tech Innovation) : fee calculé manquant
- Formats de date : MM/DD/YYYY ici vs DD/MM/YYYY dans Fichier 1

### Fichiers à créer — FICHIER 3 : facturation_reelle.xlsx

Colonnes en franglais (format compta ManCo).

| ISIN_Fonds | Libellé | Montant_Facturé_EUR | N°_Facture | Date_Facture | Période_Couverte | Statut_Paiement |
|---|---|---|---|---|---|---|
| LU0123456789 | Mgt Fee - European Growth | 468750.00 | INV-2025-001 | 05/02/2025 | Janvier 2025 | Payé |
| LU0234567890 | Mgt Fee - Global FI | 580833.00 | INV-2025-002 | 05/02/2025 | Janvier 2025 | Payé |
| LU0345678901 | Mgt Fee - Asia Pacific | 387500.00 | INV-2025-003 | 05/02/2025 | Janvier 2025 | Payé |
| LU0456789012 | Mgt Fee - Nordic SC | 160417.00 | INV-2025-004 | 05/02/2025 | Janvier 2025 | Payé |
| LU0567890123 | Mgt Fee - EM Debt | 427500.00 | INV-2025-005 | 05/02/2025 | Janvier 2025 | Payé |
| LU0678901234 | Mgt Fee - Sust Europe | 290000.00 | INV-2025-006 | 05/02/2025 | Janvier 2025 | Payé |
| LU0789012345 | Mgt Fee - US Large Cap | 425000.00 | INV-2025-007 | 05/02/2025 | Janvier 2025 | Payé |
| LU0890123456 | Mgt Fee - Lux RE | 225000.00 | INV-2025-008 | 05/02/2025 | Janvier 2025 | Payé |
| LU0901234567 | Mgt Fee - MultiAsset | 341667.00 | INV-2025-009 | 05/02/2025 | Janvier 2025 | Payé |
| LU1012345678 | Mgt Fee - Credit HY | 253125.00 | INV-2025-010 | 05/02/2025 | Janvier 2025 | Payé |
| LU1123456789 | Mgt Fee - Japan Eq | 227500.00 | INV-2025-011 | 05/02/2025 | Janvier 2025 | Payé |
| LU1234567890 | Mgt Fee - Global Macro | 345000.00 | INV-2025-012 | 05/02/2025 | Janvier 2025 | Payé |
| LU1345678901 | Mgt Fee - Infra Debt | 276250.00 | INV-2025-013 | 05/02/2025 | Janvier 2025 | Payé |
| LU1456789012 | Mgt Fee - PE Feeder | 408333.00 | INV-2025-014 | 05/02/2025 | Janvier 2025 | Payé |
| LU1567890123 | Mgt Fee - Tech Innov | 460417.00 | INV-2025-015 | 12/02/2025 | Janvier 2025 | En attente |
| LU0345678901 | Mgt Fee - Asia Pacific (CORR) | 3000.00 | INV-2025-003-C | 15/02/2025 | Janvier 2025 | En attente |

### Output A attendu : fichier_consolide.xlsx
1 ligne par fonds. Colonnes : ISIN | Nom | Taux F1 | Taux F2 | Encours F1 (M€) | Encours F2 (M€) | Fee F1 (€) | Fee F2 (€) | Montant Facturé F3 (€) | Statut Paiement

### Output B attendu : rapport_anomalies.xlsx
Colonnes : ISIN | Nom du Fonds | Type d'anomalie | Fichier(s) concerné(s) | Écart (€) | Sévérité (CRITIQUE/HAUTE/MOYENNE/BASSE) | Description

Les 13 anomalies à détecter sont documentées dans les données ci-dessus. Les 3 plus importantes pour la démo :
1. Taux discordant PE Feeder → 58 333€/mois → CRITIQUE
2. Écart encours Lux Real Estate → 18 750€ → HAUTE
3. ISIN avec espace PE Feeder → empêche le merge → HAUTE

---

## WORKFLOW B — LA SENTINELLE
**Vidéos : V3 + V4 | Publication : 23 mars**

### Ce que le workflow fait
Scrape le site cssf.lu, passe chaque publication dans Claude pour résumé + classification, et produit 2 outputs :
- **Output A** → email digest quotidien structuré par impact → V3
- **Output B** → tableau filtrable par rôle et par impact → V4

### Architecture n8n — nœuds natifs UNIQUEMENT
```
[Schedule Trigger] — chaque matin 6h00
↓
[HTTP Request] — GET cssf.lu/fr/documents-circulaires/
↓
[HTML Extract] — extrait titre, date, lien, catégorie de chaque publication
↓
[Split In Batches] — traite publication par publication
↓
[HTTP Request vers Claude API] — pour chaque publication :
  → Résumé en 3 lignes max
  → Impact : Haute / Moyenne / Basse
  → Rôle concerné : CO / COO / Compliance / MD
  → Type : circulaire / FAQ / communication / amende
  → Mots-clés : DORA / SFDR / AML / autre
↓
[Merge] — regroupe tous les résultats
↓
[Switch] — sépare les 2 branches
↓                         ↓
[Gmail / Send Email]      [Spreadsheet File]
Email digest HTML         tableau_veille.xlsx
↓
Output A : email reçu     Output B : fichier Excel
```

### Données simulées si le scraping cssf.lu échoue
Créer un fichier JSON avec 12 publications récentes copiées manuellement depuis cssf.lu. Le workflow les charge via un nœud Read Binary File au lieu du HTTP Request. La démo fonctionne de la même façon.

### Format email digest (Output A)
```
Objet : Veille CSSF — [DATE] — 3 publications dont 1 impact Haute

IMPACT HAUTE
━━━━━━━━━━━━
📋 Circulaire CSSF 25/123 — DORA : Register of Information
Résumé : La CSSF précise les exigences de documentation des prestataires ICT critiques.
Rôle : CO + Compliance
Action : Mettre à jour le Register of Information avant le 30 juin 2025

IMPACT MOYENNE
━━━━━━━━━━━━━
📋 FAQ SFDR — Mise à jour des champs PAI
...

IMPACT BASSE
━━━━━━━━━━━━
...
```

### Format tableau filtrable (Output B) : tableau_veille.xlsx
Colonnes : Date | Titre | Type | Résumé | Impact | Rôle CO | Rôle COO | Rôle Compliance | Rôle MD | Mots-clés | Lien | Action requise

---

## WORKFLOW C — LE GÉNÉRATEUR
**Vidéos : V5 + V6 | Publication : 30 mars**

### Ce que le workflow fait
Prend un fichier Excel de KPIs et un fichier de prestataires ICT, passe dans Claude pour analyse + rédaction, et produit 2 outputs :
- **Output A** → board pack auto-généré (Markdown → PDF) → V5
- **Output B** → template DORA pré-rempli → V6

### Architecture n8n — nœuds natifs UNIQUEMENT
```
[Read Binary File] — charge kpis_trimestriels.xlsx OU prestataires_ict.xlsx
↓
[Spreadsheet File] — parse le fichier
↓
[HTTP Request vers Claude API] — analyse + rédaction selon le template
↓
[Switch] — sépare Board Pack vs DORA
↓                              ↓
[Write Binary File]            [Spreadsheet File]
board_pack_Q4_2024.md          dora_register_rempli.xlsx
```

### Fichiers à créer — kpis_trimestriels.xlsx
DE Q
| Fonds | AuM (M€) | AuM Q3 (M€) | Variation (%) | Perf YTD (%) | Fee Revenue (€) | Erreurs NAV | Mandats Nouveaux |
|---|---|---|---|---|---|---|---|
| European Growth | 450 | 435 | +3.4 | +8.2 | 468750 | 0 | 0 |
| Global Fixed Income | 820 | 805 | +1.9 | +3.1 | 580833 | 0 | 0 |
| Asia Pacific Equity | 310 | 325 | -4.6 | -2.8 | 387500 | 0 | 0 |
| Nordic Small Cap | 175 | 160 | +9.4 | +12.1 | 160417 | 0 | 1 |
| EM Debt Opportunities | 540 | 550 | -1.8 | +1.5 | 427500 | 0 | 0 |
| Sustainable Europe ESG | 290 | 270 | +7.4 | +9.3 | 290000 | 0 | 0 |
| US Large Cap Growth | 680 | 650 | +4.6 | +15.7 | 425000 | 0 | 0 |
| Luxembourg Real Estate | 150 | 148 | +1.4 | -1.2 | 225000 | 2 | 0 |
| Multi-Asset Balanced | 410 | 400 | +2.5 | +5.4 | 341667 | 0 | 0 |
| Credit Opportunities HY | 225 | 218 | +3.2 | +6.8 | 253125 | 0 | 0 |
| Japan Equity Select | 195 | 188 | +3.7 | +7.2 | 227500 | 0 | 0 |
| Global Macro Strategy | 360 | 345 | +4.3 | +4.9 | 345000 | 1 | 0 |
| Infrastructure Debt | 510 | 505 | +1.0 | +2.3 | 276250 | 0 | 0 |
| Private Equity Feeder | 280 | 275 | +1.8 | +11.4 | 408333 | 0 | 0 |
| Tech Innovation | 425 | 380 | +11.8 | +22.3 | 460417 | 0 | 1 |
| **TOTAL** | **5820** | **5599** | **+2.8** | | **5277292** | **4** | **2** |

### Structure board pack à générer (Output A) : board_pack_Q4_2024.md
1. Executive Summary (3-5 phrases avec les tendances clés)
2. Tableau AuM par fonds avec variation Q/Q
3. Top 3 performers + Bottom 3 performers
4. Fee Revenue summary
5. Incidents (erreurs NAV : quels fonds, pattern identifié)
6. Nouveaux mandats
7. Points d'attention pour le prochain trimestre

### Fichiers à créer — prestataires_ict.xlsx (pour DORA)

| Prestataire | Type de service | Criticité | Pays | Cloud/OnPrem | Contrat Début | Contrat Fin | Montant Annuel (€) | Données Traitées | Sous-traitants |
|---|---|---|---|---|---|---|---|---|---|
| Bloomberg LP | Market Data | Critique | USA | Cloud | 01/01/2022 | 31/12/2025 | 85000 | Données de marché | Non |
| CACEIS | Fund Admin | Critique | Luxembourg | On-Prem | 15/03/2020 | 14/03/2026 | 320000 | NAV, positions, transactions | Oui (2) |
| Microsoft 365 | Productivité | Important | Irlande | Cloud | 01/07/2023 | 30/06/2026 | 24000 | Emails, documents internes | Oui (3+) |
| Temenos | Core Banking | Critique | Suisse | On-Prem | 01/01/2019 | 31/12/2025 | 180000 | Comptabilité fonds | Non |
| Salesforce | CRM | Standard | USA | Cloud | 01/04/2024 | 31/03/2027 | 15000 | Contacts investisseurs | Oui (2) |
| Broadridge | Reporting | Important | USA | Cloud | 01/09/2021 | 31/08/2026 | 65000 | Rapports réglementaires | Oui (1) |
| Clarence (POST) | Hosting | Critique | Luxembourg | Cloud souverain | 01/01/2024 | 31/12/2026 | 42000 | Infrastructure serveurs | Non |
| Arendt & Medernach | Legal Tech | Standard | Luxembourg | Cloud | 01/06/2023 | 31/05/2026 | 8000 | Veille juridique | Non |

### Output B attendu : dora_register_rempli.xlsx
Template DORA B_05.01 pré-rempli avec :
- Identification complète de chaque prestataire
- Évaluation de criticité avec justification
- Flag renouvellement si contrat expire dans moins de 6 mois
- Flag concentration géographique si 3+ prestataires critiques dans le même pays
- Flag sous-traitants si le prestataire en a

---

## WORKFLOW D — L'EXTRACTEUR
**Vidéos : V7 + V8 | Publication : 6 avril**

### Ce que le workflow fait
Extrait les données de rapports PDF de délégataires, les structure, et compare 2 mois :
- **Output A** → tableau Excel structuré depuis 1 PDF → V7
- **Output B** → rapport de variations entre 2 mois → V8

### Architecture n8n — nœuds natifs UNIQUEMENT
```
[Read Binary File] — charge rapport_caceis_janvier_2025.pdf
↓
[Extract from File] — extrait le texte du PDF (nœud natif n8n)
↓
[HTTP Request vers Claude API] — extraction structurée :
  → Identifie les tableaux
  → Extrait encours, transactions, incidents par fonds
  → Sort en JSON structuré
↓
[Spreadsheet File] — convertit JSON → Excel
↓
[Write Binary File]
donnees_janvier_2025.xlsx

BRANCHE B (comparaison) :
[Read Binary File] × 2 — janvier + décembre
↓ (même pipeline d'extraction × 2)
[HTTP Request vers Claude API] — comparaison :
  → Compare chaque métrique
  → Flag variations > 2%
  → Identifie les patterns transversaux
  → Classifie par sévérité
↓
[Spreadsheet File]
[Write Binary File]
rapport_variations_janv_vs_dec.xlsx
```

### PDFs à générer — rapport_caceis_janvier_2025.pdf

Créer un document HTML converti en PDF qui simule un vrai rapport de Transfer Agent. Structure :

**En-tête :**
CACEIS Fund Administration
Monthly Report — January 2025
Prepared for : [ManCo Name]
Report Date : 05/02/2025
Confidential

**Tableau 1 : AuM par fonds (15 fonds)**
Colonnes : Fund Name | ISIN | AuM Jan 2025 (M€) | AuM Dec 2024 (M€) | Variation (%) | YTD Performance (%)

Données janvier 2025 :
- European Growth | LU0123456789 | 450 | 435 | +3.4% | +8.2%
- Global Fixed Income | LU0234567890 | 820 | 805 | +1.9% | +3.1%
- Asia Pacific Equity | LU0345678901 | 310 | 325 | -4.6% | -2.8%
- Nordic Small Cap | LU0456789012 | 175 | 160 | +9.4% | +12.1%
- EM Debt Opportunities | LU0567890123 | 540 | 550 | -1.8% | +1.5%
- Sustainable Europe ESG | LU0678901234 | 290 | 270 | +7.4% | +9.3%
- US Large Cap Growth | LU0789012345 | 680 | 650 | +4.6% | +15.7%
- Luxembourg Real Estate | LU0890123456 | 150 | 148 | +1.4% | -1.2%
- Multi-Asset Balanced | LU0901234567 | 410 | 400 | +2.5% | +5.4%
- Credit Opportunities HY | LU1012345678 | 225 | 218 | +3.2% | +6.8%
- Japan Equity Select | LU1123456789 | 195 | 188 | +3.7% | +7.2%
- Global Macro Strategy | LU1234567890 | 360 | 345 | +4.3% | +4.9%
- Infrastructure Debt | LU1345678901 | 510 | 505 | +1.0% | +2.3%
- Private Equity Feeder | LU1456789012 | 280 | 275 | +1.8% | +11.4%
- Tech Innovation | LU1567890123 | 425 | 380 | +11.8% | +22.3%
- **TOTAL** | | **5820** | **5599** | **+2.8%** |

**Tableau 2 : Transactions du mois**
Colonnes : Fund Name | Souscriptions (nb) | Souscriptions (M€) | Rachats (nb) | Rachats (M€) | Net Flow (M€)

Données notables :
- Asia Pacific : 3 souscriptions / 12 rachats / Net -8.5M
- Tech Innovation : 15 souscriptions / 2 rachats / Net +42M
- Total rachats toutes classes : +25% vs décembre (signal transversal)

**Tableau 3 : Incidents et erreurs NAV**
Colonnes : Fund Name | Date | Type d'incident | Description | Résolution | Statut

Incidents janvier :
- Luxembourg Real Estate | 14/01/2025 | Erreur NAV | Prix immobilier mal valorisé | Corrigé le 15/01 | Résolu
- Luxembourg Real Estate | 28/01/2025 | Erreur NAV | Taux de change non mis à jour | Corrigé le 29/01 | Résolu

**Section commentaires (2-3 paragraphes)**
Analyste CACEIS commente les tendances du mois. Mentionner Asia Pacific en surveillance, Tech Innovation en forte croissance, rachats en hausse globale.

### PDFs à générer — rapport_caceis_decembre_2024.pdf

Même structure. Données décembre 2024 :
- Mêmes 15 fonds avec chiffres légèrement différents
- Asia Pacific : AuM 325M (vs 310M en janvier) — la baisse n'est pas encore visible
- Tech Innovation : AuM 380M (vs 425M en janvier)
- Luxembourg Real Estate : 0 incident (vs 2 en janvier)
- Rachats globaux : volume normal (vs +25% en janvier)

### Output A attendu : donnees_janvier_2025.xlsx
15 lignes (1 par fonds). Colonnes : ISIN | Fonds | AuM | Variation | Souscriptions | Rachats | Net Flow | Incidents

### Output B attendu : rapport_variations_janv_vs_dec.xlsx
Colonnes : ISIN | Fonds | Métrique | Valeur Déc | Valeur Jan | Variation (%) | Sévérité | Type (chiffre/pattern) | Commentaire

Variations à détecter et flaguer :
1. Asia Pacific AuM : -4.6% → Sévérité HAUTE
2. Rachats globaux : +25% → Sévérité HAUTE → Pattern transversal
3. Luxembourg Real Estate incidents : 0 → 2 → Sévérité HAUTE → Changement de pattern
4. Tech Innovation AuM : +11.8% → Sévérité INFO (positive)

---

## RÈGLES TECHNIQUES ABSOLUES

**Zéro nœud Code hardcodé.** Si une transformation est nécessaire, utiliser :
- Nœud Set pour renommer des champs
- Nœud Function UNIQUEMENT pour des transformations simples sans données hardcodées
- HTTP Request vers Claude API pour toute analyse ou normalisation intelligente

**Tous les fichiers de données sont de vrais fichiers .xlsx ou .pdf** stockés dans un dossier `/data/` accessible par n8n.

**Tous les outputs sont de vrais fichiers** écrits sur le disque via Write Binary File, ou de vrais emails envoyés via Gmail.

**Les workflows doivent être filmables.** Quand on clique Run dans n8n, on doit voir les nœuds s'activer un par un et le fichier output apparaître à la fin. C'est ça qui est à l'écran pendant le tournage.

**Tester chaque workflow end-to-end avant de confirmer qu'il est prêt.** Pas de "ça devrait marcher" — ça doit marcher, fichier output ouvert et vérifié.

---

## CHECKLIST DE VALIDATION PAR WORKFLOW

Avant de dire "c'est prêt" pour chaque workflow :

- [ ] Les fichiers input existent dans /data/ et s'ouvrent correctement
- [ ] Le workflow tourne sans erreur de A à Z
- [ ] L'output est un vrai fichier .xlsx ou .pdf ou un vrai email
- [ ] Les anomalies/variations prévues sont bien détectées dans l'output
- [ ] Le timestamp n8n est visible et inférieur à 60 secondes
- [ ] Zéro nœud Code avec des données hardcodées