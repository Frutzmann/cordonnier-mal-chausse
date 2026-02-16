┌──────────────────┐
│ ⏰ CRON           │  Tous les jours 9h00
│ Quotidien        │  (Europe/Paris)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 📋 AIRTABLE      │  Table: Factures
│ SEARCH           │  Filtre: Statut paiement ≠ "Payée"
│ Factures         │  ET Date paiement = vide
│ impayées         │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 🧮 CODE           │  Pour chaque facture :
│ Calcul retard    │  • retard = aujourd'hui - date échéance
│                  │  • Catégorise : <30 / 30-45 / 45-60 / 60+
│                  │  • Filtre : ignore < 30 jours
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 👤 AIRTABLE      │  Pour chaque facture en retard :
│ GET Client       │  → Contact, Email (pour personnaliser)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 📋 AIRTABLE      │  Table: Templates Email
│ GET Template     │  → Récupère le bon template selon
│                  │     le niveau de relance
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ 🧮 CODE           │  Remplace les variables :
│ Merge template   │  {contact}, {numero}, {montant_ttc},
│                  │  {date_emission}, {jours_retard}
└────────┬─────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│              🔀 SWITCH (niveau relance)          │
│                                                  │
│   30-45 jours       45-60 jours       60+ jours  │
│       │                  │                │      │
│       ▼                  ▼                ▼      │
│  📧 GMAIL           📧 GMAIL        📧 GMAIL    │
│  Draft              Draft            Draft       │
│  Relance 1          Relance 2        Relance 3   │
│  (courtoise)        (ferme)          (urgente)   │
│       │                  │                │      │
│       ▼                  ▼                ▼      │
│  ✏️ Airtable        ✏️ Airtable      💬 SLACK   │
│  Update:            Update:          ALERTE      │
│  Statut →           Statut →         "🔴 {client}│
│  "Relance 1"        "Relance 2"      doit        │
│  Date relance       Date relance     {montant}€  │
│  = today            = today          depuis       │
│                                      {jours}j    │
│                                      APPELLE-LE" │
│                                           │      │
│                                           ▼      │
│                                      ✏️ Airtable │
│                                      Update:     │
│                                      Statut →    │
│                                      "Litige"    │
│                                      Date relance│
│                                      = today     │
└─────────────────────────────────────────────────┘
         │
         ▼
┌──────────────────┐
│ 💬 SLACK          │  Résumé quotidien :
│ Récapitulatif    │  "📊 Relances du jour :
│                  │   • 2 relances niveau 1
│                  │   • 1 relance niveau 2
│                  │   • 1 alerte critique
│                  │   Total impayés : X €"
└──────────────────┘