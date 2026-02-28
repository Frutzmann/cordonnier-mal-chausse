# SHOOTING FRAMEWORK FINAL — "Ton fichier Excel marche — jusqu'au jour où..."

## Métadonnées

| Élément | Valeur |
|---|---|
| **Type** | Alexandre-friendly |
| **Croyance** | CH1 — "Excel, ça marche" |
| **Structure** | Value Equation (5-8 min) |
| **Durée cible** | 7 minutes |
| **Titre** | "Ton fichier Excel marche — jusqu'au jour où..." |
| **Miniature** | "PIÉGÉ." — silhouette écrasée sous un fichier Excel géant |
| **CTA** | Lead magnet Audit Blueprint (PDF) + Calendly en description + commentaire pinné |
| **Rétention cible** | 40% |

---

## Préparation avant tournage

### Fichier Excel démonstratif (CRITIQUE)
Construire un fichier Excel visuellement impressionnant avec :
- **12 onglets minimum** avec noms réalistes : `DORA_ICT_Providers`, `DORA_Risk_Assessment`, `DORA_Exit_Plans`, `NAV_Control_Q4`, `SFDR_Template_EET`, `AML_Screening_Log`, `Delegataire_Monitoring`, `CSSF_Reporting_Q4`, `Reconciliation_Master`, `KYC_Tracker`, `Board_Pack_Data`, `ARCHIVE_2024`
- Formules visibles, cellules colorées, données fictives mais réalistes
- Le fichier doit être VISUELLEMENT impressionnant quand on scrolle — le viewer reconnaît son propre enfer en 2 secondes

### Workflow n8n démonstratif
Voir le fichier d'instructions Claude Code séparé.

### Templates ITS DORA
Télécharger depuis le site des ESAs. Avoir au moins 2-3 templates ouverts pour montrer à l'écran la structure et les champs.

---

## Script de tournage

### MIN 0:00-0:08 — HOOK

**Visuel :** Screen recording du fichier Excel massif. 12 onglets visibles. Francis scrolle. Formules partout. C'est le chaos organisé.

**Voix :**
> "Ce fichier Excel... il fait le job. Il a toujours fait le job. Jusqu'au jour où j'ai compté combien d'heures par semaine il coûtait RÉELLEMENT."

**Notes de tournage :**
- Le scroll doit être rapide et impressionnant — montrer l'AMPLEUR du fichier
- Ne PAS s'attarder — 8 secondes max, le hook est dans la voix, pas dans l'écran
- Retain #1 (Open loop) : "combien d'heures" → payoff à min 3:10

---

### MIN 0:08-1:00 — DREAM OUTCOME (Value Equation #1)

**Visuel :** Cut face caméra.

**Voix :**
> "J'ai reconstruit le workflow de reporting réglementaire d'une boîte de 30 personnes. Le genre de boîte qui gère des milliards d'actifs, avec 4 personnes qui passent leur vie à remplir des templates pour le régulateur."
>
> "15 fichiers Excel qui ne se parlent pas. Un nouveau reporting qui vient de tomber en 2025 — 15 templates supplémentaires à maintenir. En continu. Pas une fois par an. En continu."
>
> *[Beat. Regard caméra.]*
>
> "Aujourd'hui, leur reporting part en un clic. Et la personne qui gérait ça ? Elle fait enfin le métier pour lequel elle est payée."

**Notes de tournage :**
- SPCL Credibility : chiffres réels (milliards d'actifs, 15 templates, 30 personnes)
- SPCL Status : "part en un clic" = résultat tangible
- SPCL Likeness : Francis raconte, il ne vend pas
- Retain #4 (Micro-reward à 0:50) : le dream outcome est livré tôt

---

### MIN 1:00-3:00 — PERCEIVED LIKELIHOOD (Value Equation #2)

**⚠️ FIX INTÉGRÉ : commencer par le process manuel AVANT de montrer n8n**

#### Temps 1 (1:00-1:40) — L'ingestion

**Visuel :** Screen recording — d'abord l'email qui arrive (Outlook/Gmail, reconnaissable par tous). Puis le PDF joint ouvert. Puis le copier-coller vers Excel. Montrer la LENTEUR et la pénibilité du process actuel pendant 15-20 secondes. PUIS transition vers n8n qui fait la même chose en 3 secondes.

**Voix :**
> "Laisse-moi te montrer à quoi ça ressemble concrètement."
>
> "Le prestataire envoie ses données par email — contrat, SLAs, historique d'incidents. Avant, quelqu'un ouvrait l'email, ouvrait le PDF, cherchait les bonnes infos, copier-collait dans Excel. 15 minutes. Par prestataire. Par trimestre."
>
> *[Montrer le trigger n8n : email reçu → extraction automatique → données structurées]*
>
> "Là... c'est fait."

**Retain #3 ("Mais d'abord") à 1:40 :**
> "Mais attends — le plus intéressant c'est ce qui se passe APRÈS."

#### Temps 2 (1:40-2:20) — La consolidation

**Visuel :** Screen recording — données qui se déversent dans la base structurée (Airtable ou Supabase). PUIS split screen : le chaos Excel à gauche vs la base propre à droite.

**Voix :**
> "Toutes les données de tous les prestataires, consolidées au même endroit. Plus de fichier Excel par prestataire. Plus de copier-coller. Plus de 'attends, c'est dans quel onglet déjà ?'"

**Retain #4 (Micro-reward à 2:20) :** L'avant/après visuel. Le viewer VOIT la différence.

#### Temps 3 (2:20-3:00) — Le formatage automatique

**Visuel :** Screen recording — transformation automatique vers le format template réglementaire. Montrer les templates DORA ITS réels à l'écran (téléchargés depuis les ESAs).

**Voix :**
> "Et maintenant le truc qui prenait le plus de temps..."
>
> *[Montrer la transformation]*
>
> "Les données brutes → formatées selon les 15 templates exigés par le régulateur. Automatiquement. Ce qui prenait 2 jours par trimestre prend maintenant... 30 secondes."

**Retain #5 ("Et ce n'est pas tout") à 3:00 :** Le viewer pense avoir eu la valeur principale. On empile.

---

### MIN 3:00-5:00 — TIME DELAY + EFFORT (Value Equation #3)

**Visuel :** Retour face caméra.

**Voix :**
> "OK, mais combien de temps pour mettre ça en place ?"

**⚠️ Note : cette question directe réactive la curiosité au moment de la transition face cam — ne PAS la remplacer par une transition molle.**

> *[Payoff de l'open loop du hook]*
>
> "Le workflow que tu viens de voir, je l'ai construit en 2 semaines. Pas 6 mois. Pas un projet IT avec un comité de pilotage et 3 consultants. 2 semaines."

**→ Écrasement implicite CO4 ("on a déjà essayé") : "Pas un projet IT de 6 mois" = ce n'est PAS ce que tu as essayé avant.**

> "Et après ? C'est là que la plupart des gens se trompent. Ils pensent qu'il faut une équipe tech pour maintenir ça."

**Visuel :** Screen recording — dashboard de monitoring sur téléphone. Notifications, statuts, tout est vert.

> "Tout se monitore depuis ton téléphone. Si un prestataire n'a pas envoyé ses données à temps — alerte. Si une donnée est incohérente avec le trimestre précédent — alerte. Si un template n'est pas complet — alerte. Pas besoin d'être développeur. Pas besoin d'engager quelqu'un."

**→ Écrasement implicite CO8 ("pas les compétences en interne") : preuve visuelle que c'est simple à maintenir.**

**Visuel :** Screen recording — dashboard avec les 15 templates, statut de complétion, dates de dernière mise à jour.

> "Ce COO qui passait ses vendredis soir à consolider des fichiers ? Maintenant il ouvre son téléphone, il voit que tout est au vert, et il rentre chez lui."

**Retain #4 (Micro-reward à 4:30) :** Rebouclage émotionnel — le vendredi soir libéré.

**Retain #2 (Pattern interrupts) :** Face cam → screen recording téléphone → dashboard → face cam. Jamais >40 sec sur le même plan.

---

### MIN 5:00-6:30 — REWARD (Value Equation #4)

**⚠️ 3 FIXES INTÉGRÉS : micro-histoire + "mais d'abord" + formulations corrigées**

**Visuel :** Face caméra — ton sérieux, pas de sourire.

**Voix :**
> "Les chiffres maintenant."

**Retain #3 (Deuxième "mais d'abord") :**
> "Mais avant de te donner les chiffres, laisse-moi te raconter un truc. Un COO m'a dit : 'On a tourné 18 mois avec une formule cassée dans l'onglet 7. Personne ne l'a vue. On l'a découverte le jour où le régulateur a demandé un audit trail.' 18 mois. Onglet 7."
>
> *[Beat.]*

**⚠️ FORMULATION CORRIGÉE (anti-hallucination) :**
> "Sur les process manuels de ce type — consolidation de données, copier-coller, fichiers Excel — le taux d'erreur documenté, c'est entre 2 et 5%. Une formule cassée dans un onglet que personne ne vérifie. Une donnée copiée dans la mauvaise cellule."
>
> "Avec le workflow automatisé ? 0,1%. Et surtout — un audit trail complet. Chaque donnée, d'où elle vient, quand elle est rentrée, qui l'a validée. Plus de 'je crois que c'est Jean-Marc qui avait mis à jour ce fichier en mars.'"

**⚠️ FORMULATION CORRIGÉE (anti-hallucination) :**
> "Et le gain de temps ? Sur le reporting réglementaire seul, le gain potentiel, c'est l'équivalent de 2 à 3 personnes à temps plein récupérées. Des gens qui peuvent enfin faire de la supervision, de l'analyse, du conseil. Le métier pour lequel ils ont été embauchés."

> *[Regard caméra, pause]*
>
> "Le fichier Excel marche. Personne ne dit le contraire. Mais il coûte plus cher que tu ne le penses."

**Rebouclage sur le titre. La boucle narrative est fermée.**

---

### MIN 6:30-7:00 — CTA

**Visuel :** Face caméra — ton naturel, relâché.

**Voix :**
> "Si tu veux voir comment ça s'applique à ton setup — combien de temps tu perds sur tes fichiers, ce qui peut être automatisé, et ce que ça changerait concrètement — j'ai mis un lien en description vers un audit gratuit."
>
> "Et si tu veux aller plus loin sur l'automatisation, cette vidéo-là devrait te plaire."

**Visuel :** End screen — meilleure vidéo + abonnement.

---

## Checklist pré-tournage

- [ ] Fichier Excel démonstratif construit (12 onglets, noms réalistes, visuellement impressionnant)
- [ ] Templates ITS DORA téléchargés depuis les ESAs (2-3 templates ouverts)
- [ ] Workflow n8n démonstratif opérationnel (voir instructions Claude Code)
- [ ] Dashboard de monitoring prêt (version desktop + version mobile)
- [ ] Lead magnet Audit Blueprint (PDF) créé ou en cours
- [ ] Lien Calendly vérifié et en description
- [ ] Commentaire pinné rédigé

## Checklist retain

- [ ] Open loop dans les 8 premières secondes ✓
- [ ] Pattern interrupts : jamais >40 sec sur le même plan ✓
- [ ] 2x "mais d'abord" (min 1:40 + min 5:00) ✓
- [ ] 3x micro-rewards (0:50 / 2:20 / 4:30) ✓
- [ ] 1x "et ce n'est pas tout" (min 3:00) ✓
- [ ] Démo commence par le process MANUEL avant n8n ✓
- [ ] Formulations chiffres corrigées (anti-hallucination) ✓

## Pont LinkedIn

1. Post LinkedIn attaquant CH1 — "Excel ça marche" — éducation / croyance
2. CTA en commentaire : "je te montre comment je fais" → lien vidéo YouTube
