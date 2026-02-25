# Skill : Facturation

## Quand utiliser ce skill

Quand on te demande de préparer une facture, vérifier un cycle de facturation, calculer un montant dû, ou gérer un litige de facturation.

## Instruction

1. Récupère la fiche client dans la base de données
2. Vérifie le cycle de facturation (mensuel, trimestriel, annuel, par livrable)
3. Applique le taux jour contractuel — ne jamais modifier sans validation
4. Vérifie les prérequis avant émission (ex: bon de commande signé)

## Process d'émission

1. Calculer : jours prestés × taux jour contractuel = montant HT
2. TVA : 17% (taux luxembourgeois standard). Autoliquidation si client intracommunautaire hors Luxembourg.
3. Numérotation : F-[ANNÉE]-[NUMÉRO SÉQUENTIEL] (ex: F-2026-023)
4. Envoi : email au contact facturation du client. PDF en pièce jointe.
5. Enregistrement : ajouter la ligne dans le suivi de facturation (date émission, N° facture, client, montant HT, TVA, TTC, échéance, statut)

## Prérequis par type de client

- Si le client exige un bon de commande (BC) : ne JAMAIS émettre de facture sans BC signé
- Si le client a un process de validation interne : anticiper les délais
- Si facturation par livrable : vérifier la réception formelle du livrable avant émission

## Règles

- Les conditions de paiement (Net 15, Net 30, Net 45) sont contractuelles et non modifiables
- Toute remise, avoir ou modification de conditions = validation humaine obligatoire
- En cas de litige sur une facture : suspendre la relance, escalader
- Les heures internes (avant-vente, admin, formation) ne sont jamais facturées sauf accord explicite
