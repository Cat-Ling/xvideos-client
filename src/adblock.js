/*
* Author : Cat-Ling
* Github : https://github.com/Cat-Ling
* License : GPL-3
* -----------------------------------------------------------------------------------------------------------------------
* Warning - This script is heavily based on the references I took from ChatGPT.
* Beware - This script was made by Cat-Ling, so there's always a chance of you just falling dead when you run this script.
*/
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const { session } = require('electron');
const fetch = require('cross-fetch');
const fs = require('fs').promises;

async function createAdblocker() {
  // Option 1: From prebuilt ads and tracking
  const blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch);
  blocker.enableBlockingInSession(session.defaultSession);
  console.error(`[createAdblocker()] Adblocking enabled.`);
  return blocker;


/*
// Option 2: From specified adblock lists
const blocker = await ElectronBlocker.fromLists(fetch, [
      blocker.enableBlockingInSession(session.defaultSession);
  console.error(`[createAdblocker()] Adblocking enabled.`);
  'https://easylist.to/easylist/easylist.txt'
]);
*/

// Im tired and i don't want to add more, please check the below link.
// https://www.npmjs.com/package/@cliqz/adblocker-electron

}

// To disable blocking in a session
function disableBlocking(blocker) {
  blocker.disableBlockingInSession(session.defaultSession);
}

// To manually serialize and deserialize
async function serializeAndDeserialize(blocker) {
/*
// manual method - i dunno what im doing
  const buffer = blocker.serialize();
  const restoredBlocker = ElectronBlocker.deserialize(buffer);
  // `restoredBlocker` is deep-equal to `blocker`!
*/
ElectronBlocker.fromPrebuiltAdsAndTracking(fetch, {
    path: 'engine.bin',
    read: fs.readFile,
    write: fs.writeFile,
  }).then((blocker) => {
    blocker.enableBlockingInSession(session.defaultSession);
  });
}

module.exports = { createAdblocker, disableBlocking, serializeAndDeserialize };
