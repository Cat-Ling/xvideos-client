/*
* Author : Cat-Ling
* Github : https://github.com/Cat-Ling
* License : GPL-3
* -----------------------------------------------------------------------------------------------------------------------
* Warning - This script is heavily based on the references I took from ChatGPT.
* Beware - This script was made by Cat-Ling, so there's always a chance of you just falling dead when you run this script.
*/
module.exports = function enableDebugger(mainWindow, debuggerOption) {
  const logEvent = (eventName, ...args) => {
    if (debuggerOption) {
      console.log(`[${eventName}]`, ...args);
    }
  };

  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    logEvent('ConsoleMessage', level, message, `(Line: ${line}, Source: ${sourceId})`);
  });

  mainWindow.webContents.on('page-title-updated', (event, title) => {
    logEvent('PageTitleUpdated', title);
  });

  mainWindow.webContents.on('did-start-loading', () => {
    logEvent('DidStartLoading');
  });

  mainWindow.webContents.on('did-stop-loading', () => {
    logEvent('DidStopLoading');
  });

  mainWindow.webContents.on('dom-ready', () => {
    logEvent('DomReady');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL, isMainFrame) => {
    logEvent('DidFailLoad', `Error: ${errorDescription} (${errorCode}), Validated URL: ${validatedURL}`);
  });

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    logEvent('NewWindow', `URL: ${url}`);
  });
/*
// Highly unsafe, it will log everything you type.
  mainWindow.webContents.on('before-input-event', (event, input) => {
    logEvent('BeforeInputEvent', `Type: ${input.type}, Key: ${input.key}`);
  });
*/
  mainWindow.webContents.on('will-navigate', (event, url) => {
    logEvent('WillNavigate', `URL: ${url}`);
  });

  mainWindow.webContents.on('did-navigate', (event, url) => {
    logEvent('DidNavigate', `URL: ${url}`);
  });

  mainWindow.webContents.on('did-navigate-in-page', (event, url, isMainFrame) => {
    logEvent('DidNavigateInPage', `URL: ${url}, IsMainFrame: ${isMainFrame}`);
  });

  mainWindow.webContents.on('did-frame-finish-load', (event, isMainFrame, frameProcessId, frameRoutingId) => {
    logEvent('DidFrameFinishLoad', `IsMainFrame: ${isMainFrame}, ProcessId: ${frameProcessId}, RoutingId: ${frameRoutingId}`);
  });

  mainWindow.webContents.on('page-favicon-updated', (event, favicons) => {
    logEvent('PageFaviconUpdated', favicons);
  });

  mainWindow.webContents.on('did-finish-navigation', (event, url, isInPlace, isMainFrame, frameProcessId, frameRoutingId) => {
    logEvent('DidFinishNavigation', `URL: ${url}, IsInPlace: ${isInPlace}, IsMainFrame: ${isMainFrame}, ProcessId: ${frameProcessId}, RoutingId: ${frameRoutingId}`);
  });

  mainWindow.webContents.on('found-in-page', (event, result) => {
    logEvent('FoundInPage', result);
  });

  mainWindow.webContents.on('media-started-playing', () => {
    logEvent('MediaStartedPlaying');
  });

  mainWindow.webContents.on('media-paused', () => {
    logEvent('MediaPaused');
  });

  mainWindow.webContents.on('did-change-theme-color', (event, color) => {
    logEvent('DidChangeThemeColor', color);
  });

  mainWindow.webContents.on('devtools-opened', () => {
    logEvent('DevToolsOpened');
  });

  mainWindow.webContents.on('devtools-closed', () => {
    logEvent('DevToolsClosed');
  });

  // Add more event listeners as needed
};
