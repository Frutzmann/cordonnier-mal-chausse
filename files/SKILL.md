# Skill : Relance de factures impayées

## Quand utiliser ce skill

Quand on te demande de relancer un client, formuler une relance, ou faire le point sur les impayés.

## Instruction

1. Récupère la fiche du client concerné dans la base de données (Google Sheets)
2. Identifie le nombre de jours de retard
3. Détermine l'étape de relance applicable selon le barème ci-dessous
4. Vérifie les exceptions client (canal préféré, ton, restrictions) dans la fiche client
5. Les exceptions client PRIMENT TOUJOURS sur le process standard
6. Rédige la relance dans le ton et le canal appropriés

## Barème de relance

| Étape | Déclencheur | Canal | Ton | Objectif |
|-------|-------------|-------|-----|----------|
| 1 — Rappel amical | J+7 | Email | Léger — "probablement un oubli" | Rappeler sans froisser |
| 2 — Rappel formel | J+15 | Email avec AR | Factuel — ouvrir le dialogue | Obtenir une date de paiement |
| 3 — Relance ferme | J+30 | Email + appel le même jour | Direct — mention des pénalités possibles | Créer l'urgence |
| 4 — Mise en demeure | J+45 | Lettre recommandée AR | Juridique | Dernier avertissement |
| 5 — Recouvrement | J+60 | Transmission avocat | — | Récupération |

## Règles

- La relance est un SERVICE, pas une menace. On facilite le paiement.
- Les étapes 1 et 2 peuvent être automatisées. Les étapes 3+ nécessitent validation humaine.
- Si le client a un prérequis administratif (ex: bon de commande à signer), traiter le prérequis AVANT la relance de facture.
- Ne jamais engager de procédure (étape 5) pour un montant inférieur à 5 000 €.
- Toujours proposer un échéancier si le client signale des difficultés de trésorerie.

## Format de sortie

Quand on te demande de GÉNÉRER une relance :
- Rédige l'email complet (objet + corps) prêt à envoyer
- Respecte la langue du client (FR par défaut, EN si indiqué)
- Respecte le ton prescrit par l'étape ET par les exceptions client
- Si un draft Gmail est demandé, utilise l'outil Gmail pour le créer
