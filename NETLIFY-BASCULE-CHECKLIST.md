# Cattenom V19 — bascule Netlify : conditions et procédure regroupées

## Déjà préparé
- Même Supabase Production V18 (`qnarpgpbfmvbvmzfqlei`), donc aucune migration ni remise à zéro des participants, réservations ou séances.
- Domaine final `https://renforcementmusculairecattenom.netlify.app` confirmé dans Supabase Auth (Site URL et Redirect URLs).
- Fonctions de lecture V19 raccordées. Deux écritures personnelles seulement déverrouillées sur ce domaine : `v19_book_session` et `v19_cancel_booking`.
- Fonctions administrateur modifiant les données bloquées par l'interface candidate (ce n'est pas une restriction de sécurité Supabase).
- Récupération et modification de mot de passe activables uniquement sur le domaine final.
- OneSignal App ID public configuré ; worker `OneSignalSDKWorker.js` préparé. SDK et demande de permission **non activés**.

## Blocages à lever AVANT publication
1. Vérifier le mécanisme historique d'envoi OneSignal de V18 (fonctions SQL, Edge Functions, secrets côté serveur et éventuels déclencheurs). Ne pas créer un second déclencheur et ne pas placer de secrets dans GitHub.
2. Décider du fonctionnement des notifications à l'ouverture de V19 : le worker seul ne garantit aucun abonnement ni aucune notification.
3. Examiner les fonctions SQL de déplacement/annulation avec réservations ; tant qu'elles ne sont pas sûres, garder l'administration modificative bloquée.
4. Vérifier que les ressources statiques attendues sont bien présentes à la racine du site candidat (`index.html`, `config.js`, `onesignal-config.js`, `OneSignalSDKWorker.js`, logo et autres assets utilisés).
5. Décider explicitement de remplacer V18 sur le site Netlify ; **ne pas publier la branche candidate automatiquement**.

## Publication, une fois les conditions satisfaites
- Déployer le contenu approuvé sur le site Netlify existant (même domaine, même projet Supabase).
- Confirmer l'ouverture de la page et la connexion, puis la lecture des séances et réservations existantes ; vérifier le worker HTTP 200 JavaScript et les notifications selon le mécanisme choisi.
- Ne jamais exécuter de SQL destructeur, ni vider/recréer les tables.
- Ne pas supposer qu'un redéploiement Netlify restaure des données Supabase supprimées.

## État actuel
**NON PRÊT À PUBLIER EN PRODUCTION** : déclencheurs OneSignal et sécurité fonctionnelle de l'administration non certifiés. V18 Production doit rester en service.
