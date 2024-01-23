/*
* Author : Cat-Ling
* Github : https://github.com/Cat-Ling
* License : GPL-3
* -----------------------------------------------------------------------------------------------------------------------
* Warning - This script is heavily based on the references I took from ChatGPT.
* Beware - This script was made by Cat-Ling, so there's always a chance of you just falling dead when you run this script.
*/
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');


contextBridge.exposeInMainWorld('electronAPI', {

  sendMessageToMain: (message) => {
    ipcRenderer.send('messageToMain', message);
  },



});


window.addEventListener('DOMContentLoaded', async () => {

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const dependency of ['electron', 'node', 'NodeList', 'HTMLCollection']) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }


  try {
    require('electron').remote;
  } catch (e) {
    console.error('Error: Disallowed remote module access in the renderer process.');
  }


  try {
    const scriptPath = path.join(__dirname, 'functionality.js');
    const scriptContent = await fs.promises.readFile(scriptPath, 'utf-8');
    window.eval(scriptContent);
  } catch (error) {
    console.error(`Error loading and executing the local script: ${error.message}`);
  }
});
