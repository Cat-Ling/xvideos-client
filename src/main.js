/*
* Author : Cat-Ling
* Github : https://github.com/Cat-Ling
* License : GPL-3
* -----------------------------------------------------------------------------------------------------------------------
* Warning - This script is heavily based on the references I took from ChatGPT.
* Beware - This script was made by Cat-Ling, so there's always a chance of you just falling dead when you run this script.
*/
const { app, BrowserWindow, session } = require('electron');
const { setWebRTCBlockingPolicy } = require('./webrtc');
const path = require('path');
const { 
debuggerOn,
proxyEnable,
SecureDnsEnable,
AdBlockEnable
 } = require('../config');
const registerShortcuts = require('./shortcut');



// Set userData path to the current directory (only enable before building app)
const userDataPath = path.join(process.cwd(), 'xdata');
app.setPath('userData', userDataPath);


//AdBlock Config
if (AdBlockEnable) {
const { createAdblocker, disableBlocking, serializeAndDeserialize } = require('./adblock');
async function initAdblocker() {
  const adblocker = await createAdblocker();
}
  initAdblocker();
} else {
  console.log('AdBlock is disabled.')
} 


app.whenReady().then(() => {
  app.on('browser-window-created', (event, window) => {
    setWebRTCBlockingPolicy(window.webContents);
});
  const mainWindow = new BrowserWindow({
    frame: true,
    icon: 'public/x.png',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      disableRemoteModule: true,
      experimentalFeatures: false,
      nativeWindowOpen: true,
      offscreen: false,
      allowRunningInsecureContent: false,
      // This injects xvideos+ userscript from https://sleazyfork.org/en/scripts/459863-xvideos
      // Check the site to see what it does.
      // Although not expected, it mostly works, except for the button to download videos without login.
      // preload: path.join(__dirname, 'preload.js'),
      deviceScaleFactor: 0.8,
    },
  });

  
   // This is about to get messy.
   if (debuggerOn) {
    const debuggerOption = true;
    const enableDebugger = require('./debugger');
    console.log('Debugger is enabled.')
    enableDebugger(mainWindow, debuggerOption);
  } else {
    console.log('Debugger is disabled.')
  }

/*
// Load unpacked chrome extensions, mostly fails.
// Usage : Just put the directory in /src and change the YOUR_DIRECTORY_NAME.

const extensionPath = path.join(__dirname, 'YOUR_DIRECTORY_NAME');
session.defaultSession.loadExtension(extensionPath).then(({ id }) => {
})

*/

  // Remove the menu bar
  mainWindow.setMenu(null);


  // DNS Configuration

/* Notice : Since I couldn't find any way to explicitly force all DNS queries through proxy servers. I had to
 * use these DNS servers. Rest assured, they'll only be used as a failsafe the queries are mostly going to
 * through proxies.
 * Also, I reported the hidden domains (cuz i luv wut StevenBlack is doing) - 
 * https://github.com/StevenBlack/hosts/issues/2288
 * So I have no idea on what scale these domains are going to be blocked. Hence, the need for alternative DNS.
 * Please keep in mind the risks before you change the servers, especially if you're browsing
 * through hidden urls, as they'll most probably be detected by your ISP and then get blocked.
*/

    if (SecureDnsEnable) {
  app.configureHostResolver({
    secureDnsMode: 'secure',
    secureDnsServers: [
      'https://dns.digitale-gesellschaft.ch/dns-query',
      'https://doh.dns.sb/dns-query',
    ],
  });
  console.log('Secure DNS is Enabled')
        } else {
  app.configureHostResolver({
    secureDnsMode: 'automatic',
  });
  console.log('Secure DNS is Disabled')
  console.log('System DNS Settings will be used.')
      }

/* User-Agent Configuration

    
* The XXXAndroidApp/99.99 part is what allows us to browse the hidden urls.
* Somebody at XVideos knows that I'm doing these shenanigans. But yolo.
*/

  const userAgent =
    'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 XXXAndroidApp/99.99';
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = userAgent;
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

 setWebRTCBlockingPolicy(mainWindow.webContents); //not needed, but added as a failsafe

  // Load our index.html - the page we see right now on launch
mainWindow.loadFile('public/index.html');
//  mainWindow.loadURL('https://www.xvideos.com'); // Load a url, CTRL+S already lets you do that tho.


mainWindow.maximize();

  
  mainWindow.on('closed', () => {
    app.quit();
  });
  if (proxyEnable) {
    console.log('Proxy is enabled.')
    const { GetProxy, ConnectProxy } = require('./proxy');
    GetProxy();
    ConnectProxy(mainWindow)
  } else {
    console.log('Proxy has been disabled.')
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
      const mainWindow = BrowserWindow.getAllWindows()[0]
      .then(mainWindow.show())
      .then(mainWindow.setTitle('XVideos'))
    }
  });
  

  // Other security considerations / ChatGPT really thinks Cat-Ling can make secure apps. :p
  mainWindow.webContents.on('will-attach-webview', (event, webPreferences, params) => {
    // Disable webview to enhance security
    event.preventDefault();
  });
  // Register shortcuts from shortcut.js
  registerShortcuts(mainWindow);
});
