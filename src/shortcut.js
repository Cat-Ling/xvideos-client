/*
* Author : Cat-Ling
* Github : https://github.com/Cat-Ling
* License : GPL-3
* -----------------------------------------------------------------------------------------------------------------------
* Warning - This script is heavily based on the references I took from ChatGPT.
* Beware - This script was made by Cat-Ling, so there's always a chance of you just falling dead when you run this script.
*/
const { app, globalShortcut, BrowserWindow } = require('electron');
const { GetProxy, ConnectProxy } = require('./proxy');
let urlbarWindow;
let shortcutsRegistered = false;

function createurlbarWindow(mainWindow) {
  urlbarWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
    },
    parent: mainWindow,
    modal: false,
    alwaysOnTop: false,
  });

  urlbarWindow.removeMenu();
  urlbarWindow.on('closed', () => {
    urlbarWindow = null;
  });

  urlbarWindow.loadFile('public/urlbar.html');
}

function unregisterShortcuts() {
  globalShortcut.unregister('Control+R');
  globalShortcut.unregister('Control+Shift+R');
  globalShortcut.unregister('Control+Space');
  globalShortcut.unregister('Control+S');
  globalShortcut.unregister('Control+W');
  globalShortcut.unregister('Control+Q');
  globalShortcut.unregister('F5');
  globalShortcut.unregister('F1');
  globalShortcut.unregister('Escape');
  globalShortcut.unregister('Control+F5');
  globalShortcut.unregister('Control+Left');
  globalShortcut.unregister('Control+Right');
  shortcutsRegistered = false;
}

function registerShortcuts(mainWindow) {
  if (!shortcutsRegistered) {
    const isMainWindowFocused = () => mainWindow && mainWindow.isFocused();
    const isUrlbarWindowFocused = () => urlbarWindow && urlbarWindow.isFocused();
    const isUrlbarWindowOpen = () => !!urlbarWindow;

    globalShortcut.register('Control+R', () => {
      if (isMainWindowFocused()) {
        mainWindow.reload();
      } else if (isUrlbarWindowFocused()) {
        urlbarWindow.reload();
      }
    });

    globalShortcut.register('Control+Shift+R', () => {
      if (isMainWindowFocused()) {
        mainWindow.webContents.reloadIgnoringCache();
      } else if (isUrlbarWindowFocused()) {
        urlbarWindow.webContents.reloadIgnoringCache();
      }
    });

    const executeWithDelay = async (callback, delay) => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      callback();
    };
    
    globalShortcut.register('Control+Space', async () => {
      if (isMainWindowFocused()) {
        GetProxy();
    
        await executeWithDelay(() => {
          ConnectProxy(mainWindow);
        }, 1000);
    
    
        await executeWithDelay(() => {
          mainWindow.webContents.reload();
        }, 2000);
    
      } else if (isUrlbarWindowFocused()) {
        GetProxy();
    
        await executeWithDelay(() => {
          ConnectProxy(mainWindow);
        }, 1000);
    
    
        await executeWithDelay(() => {
          urlbarWindow.webContents.reload();
        }, 2000);
      }
    });

    globalShortcut.register('Control+S', () => {
      if (isMainWindowFocused()) {
        if (!isUrlbarWindowOpen()) {
          createurlbarWindow(mainWindow);
        }
      } else if (isUrlbarWindowFocused()) {
        urlbarWindow.webContents.loadFile('public/urlbar.html');
      }
    });

    globalShortcut.register('Control+W', () => {
      if (isMainWindowFocused()) {
        mainWindow.close();
      } else if (isUrlbarWindowFocused()) {
        urlbarWindow.close();
      }
    });

    globalShortcut.register('Control+Q', () => {
      app.quit();
    });

    globalShortcut.register('F5', () => {
      if (isMainWindowFocused()) {
        mainWindow.webContents.reload();
      } else if (isUrlbarWindowFocused()) {
        urlbarWindow.webContents.reload();
      }
    });

    globalShortcut.register('F1', () => {
      if (isMainWindowFocused()) {
        mainWindow.loadURL('https://github.com/Cat-Ling/xvideos-client?tab=readme-ov-file#keyboard-shortcuts');
      } else if (isUrlbarWindowFocused()) {
        urlbarWindow.loadURL('https://github.com/Cat-Ling/xvideos-client?tab=readme-ov-file#keyboard-shortcuts');
      }
    });

    globalShortcut.register('Escape', () => {
      app.quit();
    });

    globalShortcut.register('Control+F5', () => {
      if (isMainWindowFocused()) {
        mainWindow.webContents.reloadIgnoringCache();
      } else if (isUrlbarWindowFocused()) {
        urlbarWindow.webContents.reloadIgnoringCache();
      }
    });

    globalShortcut.register('Control+Left', () => {
      if (isMainWindowFocused()) {
        if (mainWindow.webContents.canGoBack()) {
          mainWindow.webContents.goBack();
        }
      } else if (isUrlbarWindowFocused()) {
        if (urlbarWindow.webContents.canGoBack()) {
          urlbarWindow.webContents.goBack();
        }
      }
    });

    globalShortcut.register('Control+Right', () => {
      if (isMainWindowFocused()) {
        if (mainWindow.webContents.canGoForward()) {
          mainWindow.webContents.goForward();
        }
      } else if (isUrlbarWindowFocused()) {
        if (urlbarWindow.webContents.canGoForward()) {
          urlbarWindow.webContents.goForward();
        }
      }
    });

    shortcutsRegistered = true;
  }
}

app.on('browser-window-blur', () => {
  unregisterShortcuts();
});

app.on('browser-window-focus', () => {
  const mainWindow = BrowserWindow.getFocusedWindow();
  if (mainWindow) {
    registerShortcuts(mainWindow);
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

module.exports = registerShortcuts;
