const { app, globalShortcut, BrowserWindow } = require('electron');
const { GetProxy, ConnectProxy } = require('./proxy');
const { setWebRTCBlockingPolicy } = require('./webrtc');
let urlbarWindow;

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

  setWebRTCBlockingPolicy(urlbarWindow.webContents); //not needed, but added as a failsafe
  urlbarWindow.loadFile('public/urlbar.html');
}

function unregisterShortcuts() {
  globalShortcut.unregisterAll();
}

function registerAllShortcuts(mainWindow) {
  const isMainWindowFocused = () => mainWindow && mainWindow.isFocused();
  const isUrlbarWindowFocused = () => urlbarWindow && urlbarWindow.isFocused();
  const isUrlbarWindowOpen = () => !!urlbarWindow;

  // Function to unregister shortcuts when the application loses focus
  const unregisterShortcutsOnBlur = () => {
    unregisterShortcuts();
  };

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
      if (mainWindow.webContents.navigationHistory.goBack()) {
        mainWindow.webContents.navigationHistory.goBack();
      }
    } else if (isUrlbarWindowFocused()) {
      if (urlbarWindow.webContents.navigationHistory.goBack()) {
        urlbarWindow.webContents.navigationHistory.goBack();
      }
    }
  });

  globalShortcut.register('Control+Right', () => {
    if (isMainWindowFocused()) {
      if (mainWindow.webContents.navigationHistory.goForward()) {
        mainWindow.webContents.navigationHistory.goForward();
      }
    } else if (isUrlbarWindowFocused()) {
      if (urlbarWindow.webContents.navigationHistory.goForward()) {
        urlbarWindow.webContents.navigationHistory.goForward();
      }
    }
  });
}

function registerShortcuts(mainWindow) {
  app.on('browser-window-created', (event, window) => {
    setWebRTCBlockingPolicy(window.webContents);
  });

  app.on('browser-window-blur', () => {
    unregisterShortcuts();
  });

  app.on('browser-window-focus', () => {
    registerAllShortcuts(mainWindow);
  });

  app.on('will-quit', () => {
    unregisterShortcuts();
  });
}

module.exports = registerShortcuts;
