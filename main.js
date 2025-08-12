// main.js

const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');
const contextMenuModule = require('electron-context-menu');

const contextMenu = typeof contextMenuModule === 'function'
  ? contextMenuModule
  : contextMenuModule.default;

contextMenu({
  showSaveImageAs: true,
  showCopyImage: true,
  showCopyImageAddress: false,
  showInspectElement: false
});

function waitForServer(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      require('http').get(url, res => {
        resolve();
      }).on('error', () => {
        if (Date.now() - start > timeout) {
          reject(new Error('Servidor Express no arrancó a tiempo'));
        } else {
          setTimeout(check, 300);
        }
      });
    };
    check();
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    autoHideMenuBar: true
  });

  globalShortcut.register('Control+M', () => {
    const visible = win.isMenuBarVisible();
    win.setMenuBarVisibility(!visible);
  });

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  // Copiar base de datos si no existe
  const sourceDbPath = path.join(process.resourcesPath, 'data', 'tech-dashboard.db');
  const targetDbPath = path.join(app.getPath('userData'), 'tech-dashboard.db');

  if (!fs.existsSync(targetDbPath)) {
    try {
      fs.copyFileSync(sourceDbPath, targetDbPath);
      console.log('📦 Base de datos copiada a userData desde main.js');
    } catch (err) {
      console.error('❌ Error copiando la base de datos desde main.js:', err.message);
    }
  }

  // Ejecutar servidor Express
  const serverPath = path.join(__dirname, 'src/server.js');
  require(serverPath);

  waitForServer('http://localhost:3000')
    .then(() => {
      createWindow();
    })
    .catch(err => {
      console.error('No se pudo conectar al servidor Express:', err.message);
      app.quit();
    });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
