// Validation statique du candidat V19 : aucune connexion à Supabase ou OneSignal.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const html=fs.readFileSync('index.html','utf8');
const config=fs.readFileSync('config.js','utf8');
const one=fs.readFileSync('onesignal-config.js','utf8');
const init=fs.readFileSync('onesignal-init.js','utf8');
const worker=fs.readFileSync('OneSignalSDKWorker.js','utf8');
for(const [name,source] of [['config.js',config],['onesignal-config.js',one],['onesignal-init.js',init],['OneSignalSDKWorker.js',worker]]) {
  new Function(source); console.log('Syntaxe OK :',name);
}
for(const m of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
  if(m[1].trim()) new Function(m[1]);
}
assert.match(config,/qnarpgpbfmvbvmzfqlei/);
assert.match(html,/V19_APPROVED_HOST='renforcementmusculairecattenom\.netlify\.app'/);
assert.match(html,/v19_book_session/);
assert.match(html,/v19_cancel_booking/);
assert.match(html,/V19_ADMIN_WRITES_ENABLED=false/);
assert.match(html,/V19_ADMIN_MUTATION_RPCS/);
assert.match(html,/READ_ONLY_RPCS/);
assert.match(one,/2232e30e-1fed-4d48-8b26-824b718838a9/);
assert.match(one,/enabled:\s*false/);
assert.match(html,/src="onesignal-config\.js"/);
assert.match(html,/src="onesignal-init\.js"/);
assert.match(worker,/OneSignalSDK\.sw\.js/);
assert.doesNotMatch(config,/service_role|sb_secret_/);
for(const p of ['logo.png','index.html','config.js','onesignal-config.js','onesignal-init.js','OneSignalSDKWorker.js','netlify.toml']) {
  assert.ok(fs.existsSync(p),'Fichier manquant : '+p);
}
console.log('Contrôles statiques OK — aucun test fonctionnel de production exécuté.');
