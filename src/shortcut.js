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

function createurlbarWindow(mainWindow) {
  urlbarWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
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

function registerShortcuts(mainWindow) {
  const isMainWindowFocused = () => mainWindow && mainWindow.isFocused();
  const isurlbarWindowFocused = () => urlbarWindow && urlbarWindow.isFocused();

  globalShortcut.register('Control+R', () => {
    if (isMainWindowFocused()) {
      mainWindow.reload();
    } else if (isurlbarWindowFocused()) {
      urlbarWindow.reload();
    }
  });

  globalShortcut.register('Control+Shift+R', () => {
    if (isMainWindowFocused()) {
      mainWindow.webContents.reloadIgnoringCache();
    } else if (isurlbarWindowFocused()) {
      urlbarWindow.webContents.reloadIgnoringCache();
    }
  });

  // Had to add this one since I was tired of reopening the program when a proxy didn't work.
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
  
    } else if (isurlbarWindowFocused()) {
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
      createurlbarWindow(mainWindow);
    } else if (isurlbarWindowFocused()) {
      urlbarWindow.webContents.loadFile('public/urlbar.html');
    }
  });

  globalShortcut.register('Control+W', () => {
    if (isMainWindowFocused()) {
      mainWindow.close();
    } else if (isurlbarWindowFocused()) {
      urlbarWindow.close();
    }
  });

  globalShortcut.register('Control+Q', () => {
    app.quit();
  });

  globalShortcut.register('F5', () => {
    if (isMainWindowFocused()) {
      mainWindow.webContents.reload();
    } else if (isurlbarWindowFocused()) {
      urlbarWindow.webContents.reload();
    }
  });

  globalShortcut.register('F1', () => {
    if (isMainWindowFocused()) {
      mainWindow.loadURL('https://github.com/Cat-Ling/xvideos-client?tab=readme-ov-file#keyboard-shortcuts');
    } else if (isurlbarWindowFocused()) {
      urlbarWindow.loadURL('https://github.com/Cat-Ling/xvideos-client?tab=readme-ov-file#keyboard-shortcuts');
    }
  });

  globalShortcut.register('Escape', () => {
      app.quit();

  });

  globalShortcut.register('Control+F5', () => {
    if (isMainWindowFocused()) {
      mainWindow.webContents.reloadIgnoringCache();
    } else if (isurlbarWindowFocused()) {
      urlbarWindow.webContents.reloadIgnoringCache();
    }
  });


globalShortcut.register('Control+Left', () => {
  if (isMainWindowFocused()) {
    if (mainWindow.webContents.canGoBack()) {
      mainWindow.webContents.goBack();
    }
  } else if (isurlbarWindowFocused()) {
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
  } else if (isurlbarWindowFocused()) {
    if (urlbarWindow.webContents.canGoForward()) {
      urlbarWindow.webContents.goForward();
  }
}
});

  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });
}

module.exports = registerShortcuts;
