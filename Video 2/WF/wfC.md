┌──────────────────┐
│ ⏰ CRON           │  Tous les lundis 9h00
│ Hebdomadaire     │  (ou quotidien selon la granularité voulue)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 👤 AIRTABLE      │  Table: Clients
│ GET ALL Clients  │  Filtre: Statut = "Actif"
│ actifs           │  → Récupère Nom + Forfait mensuel
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ ⏱️ AIRTABLE      │  Table: Suivi Temps
│ GET Heures       │  Filtre: Date ≥ premier jour du mois
│ du mois          │  → Toutes les entrées du mois en cours
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 📋 AIRTABLE      │  Table: Factures
│ GET Factures     │  Filtre: Date émission ≥ premier jour mois
│ du mois          │  → Revenus réels facturés par client
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 🧮 CODE           │  Pour chaque client actif :
│ Calcul           │  • Total heures = Σ heures trackées
│ rentabilité      │  • Coût interne = heures × 80€
│                  │  • Revenu = forfait (ou factures si variable)
│                  │  • Marge = (revenu - coût) / revenu × 100
│                  │  • Statut : 🟢 >40% / 🟡 0-40% / 🔴 <0%
│                  │  
│                  │  Génère aussi :
│                  │  • Top collaborateur par client
│                  │  • Heures vs estimé (% dépassement)
│                  │  • Ranking clients par rentabilité
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ ✏️ AIRTABLE      │  Option : mettre à jour un champ
│ UPDATE Clients   │  "Marge actuelle (%)" dans la table
│ (optionnel)      │  Clients pour avoir la donnée en live
└────────┬─────────┘
         │
         ├──────────────────────┐
         ▼                      ▼
┌──────────────────┐   ┌──────────────────────────┐
│ 💬 SLACK          │   │ 🔴 IF marge < 0%          │
│ Dashboard        │   │ pour au moins 1 client    │
│ hebdomadaire     │   └────────────┬─────────────┘
│                  │                │
│ "📊 Rentabilité  │                ▼
│  Janvier 2026    │   ┌──────────────────────────┐
│                  │   │ 💬 SLACK ALERTE            │
│  🟢 LegalStart   │   │ "🚨 ALERTE MARGE           │
│    65% | 22h     │   │                            │
│  🟢 Comptoir     │   │  🔴 TechnoVert : -67%      │
│    49% | 16h     │   │     62.5h pour 3000€       │
│  🟡 MaisonBio    │   │     → Scope creep CSRD     │
│    28% | 18h     │   │                            │
│  🔴 FitCoach     │   │  🔴 FitCoach : -49%        │
│    -49% | 28h    │   │     28h pour 1500€         │
│  🔴 TechnoVert   │   │     → 2 changements brief  │
│    -67% | 62.5h" │   │                            │
│                  │   │  Action requise."          │
└──────────────────┘   └──────────────────────────┘