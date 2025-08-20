/*
* Author : Cat-Ling
* Github : https://github.com/Cat-Ling
* License : GPL-3
* -----------------------------------------------------------------------------------------------------------------------
* Warning - This script is heavily based on the references I took from ChatGPT.
* Beware - This script was made by Cat-Ling, so there's always a chance of you just falling dead when you run this script.
*/
const axios = require('axios');

async function GetProxy() {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Fetching proxy list...');
      const response = await axios.get('https://raw.githubusercontent.com/monosans/proxy-list/refs/heads/main/proxies/socks5.txt');
      global.proxyList = response.data.split('\n').filter(Boolean);
      console.log('Proxy list fetched successfully.');
      resolve();
    } catch (error) {
      console.error('Error fetching proxy list:', error.message);
      reject(error);
    }
  });
}

function ConnectProxy(mainWindow) {
  return new Promise(async (resolve, reject) => {
    const waitForProxyList = () => {
      if (global.proxyList) {
        const randomProxy = global.proxyList[Math.floor(Math.random() * global.proxyList.length)];
        console.log(`Using proxy: ${randomProxy}`);
        const session = mainWindow.webContents.session;
        session.closeAllConnections();
        session.setProxy({
          mode: 'fixed_servers',
          proxyRules: `socks5://${randomProxy}`
        }, () => {
          console.log('Connecting to ' + randomProxy);
          resolve();
        });
      } else {
        setTimeout(waitForProxyList, 100); // Retry after 100 milliseconds
      }
    };

    waitForProxyList();
  });
}

module.exports = {
  GetProxy,
  ConnectProxy,
};

