# OneSignal — activation V19 différée

## Préparé sur la branche candidate-netlify-v19
- App ID public dans `onesignal-config.js` : `2232e30e-1fed-4d48-8b26-824b718838a9`.
- Domaine OneSignal actuel : `https://renforcementmusculairecattenom.netlify.app`.
- Fichier `OneSignalSDKWorker.js` à la racine, important le worker OneSignal Web SDK v16.
- Le SDK client n'est pas chargé et `enabled` reste à `false` : pas de demande de permission, pas d'inscription automatique.

## Avant activation
1. Déterminer comment V18 gère les notifications (déclencheurs SQL, Edge Functions, secrets, abonnements navigateur). Ne jamais recopier les clés privées dans le dépôt.
2. Vérifier qu'aucun second mécanisme d'envoi ne crée des notifications en double.
3. Confirmer que les abonnements historiques utilisent la même application OneSignal et le même domaine.
4. Après déploiement autorisé seulement, contrôler que `/OneSignalSDKWorker.js` sert bien du JavaScript, pas une 404 ou du HTML.
5. Initialiser le SDK uniquement après validation, sur le domaine de production ; vérifier le comportement du prompt de consentement.

## Limites
Le worker n'est pas encore présent sur Netlify et sa présence seule ne garantit pas les notifications. La branche ne doit pas être déployée sur le site V18 sans décision explicite de bascule. Aucun changement SQL ni de réservation n'est requis pour ces fichiers.
