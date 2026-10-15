/* Intégration OneSignal V19 en attente d'activation.
 * N'exécute aucun appel réseau OneSignal lorsque enabled=false.
 * Ne doit pas être activée avant contrôle des notifications historiques V18.
 */
(function () {
  const config = window.V19_ONESIGNAL_CONFIG;
  if (!config || config.enabled !== true) return;
  if (location.origin !== config.productionOrigin) return;
  if (!config.appId) return;
  window.OneSignalDeferred = window.OneSignalDeferred || [];
  window.OneSignalDeferred.push(async function (OneSignal) {
    await OneSignal.init({
      appId: config.appId,
      serviceWorkerPath: 'OneSignalSDKWorker.js',
      serviceWorkerParam: { scope: '/' },
      notifyButton: { enable: false },
      promptOptions: { slidedown: { enabled: false } }
    });
  });
  const script = document.createElement('script');
  script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
  script.async = true;
  script.onerror = () => console.error('OneSignal V19 : SDK indisponible');
  document.head.appendChild(script);
})();
