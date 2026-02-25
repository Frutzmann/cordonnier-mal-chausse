# Skill : Processus de relance

## Instruction

Quand on te demande de relancer les clients en retard, tu DOIS :
1. Consulter les fiches clients (skill gestion-clients) pour les exceptions
2. Appliquer le process standard SAUF si une exception client existe
3. L'exception client PRIME TOUJOURS sur le process standard
4. Rédiger le texte de la relance, prêt à envoyer

## Process standard

| Étape | Délai | Canal | Ton |
|-------|-------|-------|-----|
| 1 - Rappel amical | J+7 | Email | Léger, "probablement un oubli" |
| 2 - Rappel formel | J+15 | Email AR | Factuel, ouverture au dialogue |
| 3 - Relance ferme | J+30 | Email + Appel | Direct, mention pénalités |
| 4 - Mise en demeure | J+45 | Recommandé AR | Juridique — validation François |
| 5 - Recouvrement | J+60 | Avocat | Décision François uniquement |

## Exceptions connues

- **Dupont** : Commencer à l'Étape 2 (pas avant J+15). Ton Étape 2 = ton Étape 1. Email uniquement.
- **Keysource** : Si retard → appel direct dès J+3. En anglais. C'est anormal, donc problème réel.
- **Patrimonia** : Relance à Claire (assistante), pas à Sophie. Sophie en copie à partir de l'Étape 3.
- **Comptaflex** : Ne pas relancer avant J+20. Circuit interne lent = normal.
- **Ardian** : Vérifier que le BC est signé AVANT toute relance facture.

## Règle fondamentale

La relance est un service, pas une menace. On facilite le paiement. Le ton monte progressivement mais ne devient jamais agressif.

## Automatisation

Les étapes 1-2 sont automatisées via n8n (CRON quotidien 8h30, source Google Sheets "Suivi Facturation"). Les étapes 3+ nécessitent une intervention humaine.
