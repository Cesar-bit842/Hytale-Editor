const { app, BrowserWindow, Menu  } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,  
    },
    icon: path.join(__dirname, 'Core/Hytale Editor.png')
  });

  win.loadURL(`file://${__dirname}/Hytale Editor (Open Source)/index.html?x=nop`);
  Menu.setApplicationMenu(null);
}

app.whenReady().then(createWindow);
