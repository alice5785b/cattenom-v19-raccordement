# Préparation de la version finale V19 sur Netlify

Statut : PRÉPARATION UNIQUEMENT — NE PAS DÉPLOYER CETTE BRANCHE SUR LE DOMAINE DE PRODUCTION.

## Continuité des données
- Conserver le projet Supabase V18 `qnarpgpbfmvbvmzfqlei` : ne pas recréer les utilisateurs Auth, les tables `allowed_users`, `bookings`, `extra_sessions`, `session_exceptions`, les annulations et verrous.
- Ne lancer aucun script de réinitialisation, suppression ou import écrasant des données.
- La version de préparation bloque actuellement les RPC d'écriture ; elle ne permet donc pas de réserver en production.
- Les quatre fonctions administrateur SQL sont installées mais leur comportement complet en conditions réelles n'est pas certifié.

## Netlify
- Domaine final existant : https://renforcementmusculairecattenom.netlify.app
- Publier les fichiers statiques à la racine du site seulement après validation ; ne pas changer le domaine sans revoir OneSignal.
- Ne pas déployer automatiquement la branche de préparation sur le site Netlify actuellement utilisé par V18.
- Conserver les paramètres Supabase publics dans `config.js` ; ne jamais y mettre de clé `service_role` ou secret OneSignal.

## OneSignal — vérifications avant bascule
- Configuration Web Push OneSignal actuelle : site Typical site, URL https://renforcementmusculairecattenom.netlify.app, auto-resubscribe activé.
- Vérifier l'App ID, les fichiers de service worker réellement servis par Netlify et la présence éventuelle d'un SDK OneSignal dans le site V18 actuel ; aucun SDK direct n'a été identifié dans `index.html` V19.
- Identifier les fonctions/Edge Functions Supabase qui déclenchent les notifications V18, sans modifier leurs secrets ni réactiver les essais OneSignal V19 TEST.
- Vérifier les risques de doublon avant toute activation de notifications côté client V19.
- La capture de configuration ne suffit pas à confirmer un envoi réel ou la continuité des abonnements.

## Conditions de bascule
1. Corriger ou désactiver les actions susceptibles de supprimer des réservations ; vérifier notamment annulation et déplacement.
2. Préparer une version finale distincte où seules les écritures validées sont autorisées.
3. Vérifier le parcours de connexion et les lectures des réservations sur le domaine final.
4. Conserver V18 accessible jusqu'à la décision explicite de bascule.
5. Une redéploiement Netlify répare du code, pas des données Supabase supprimées.

Aucune opération SQL, notification ou publication Netlify n'est effectuée par ce document.
