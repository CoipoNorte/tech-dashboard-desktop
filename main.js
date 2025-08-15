const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const fs = require('fs');
const contextMenuModule = require('electron-context-menu');
const ElectronStore = require('electron-store').default; // 👈 Importación corregida

// 🧠 Configuración del store con esquema
const schema = {
  windowSize: {
    type: 'object',
    properties: {
      width: { type: 'number' },
      height: { type: 'number' }
    },
    default: { width: 1200, height: 800 }
  },
  windowPosition: {
    type: 'object',
    properties: {
      x: { type: ['number', 'null'] },
      y: { type: ['number', 'null'] }
    },
    default: { x: null, y: null }
  },
  windowMaximized: {
    type: 'boolean',
    default: false
  }
};

const store = new ElectronStore({ schema });

// 🧁 Context menu personalizado
const contextMenu = typeof contextMenuModule === 'function'
  ? contextMenuModule
  : contextMenuModule.default;

contextMenu({
  showSaveImageAs: true,
  showCopyImage: true,
  showCopyImageAddress: false,
  showInspectElement: false
});

// 🕒 Esperar a que Express esté listo
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

// 🪟 Crear ventana principal
function createWindow() {
  const iconPath = path.join(__dirname, 'public', 'icon', 'icon.ico');

  const { width, height } = store.get('windowSize');
  const { x, y } = store.get('windowPosition');
  const wasMaximized = store.get('windowMaximized');

  const win = new BrowserWindow({
    width,
    height,
    x: x ?? undefined,
    y: y ?? undefined,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    autoHideMenuBar: true
  });

  // Restaurar estado maximizado si aplica
  if (wasMaximized) win.maximize();

  // Guardar tamaño si no está maximizada
  win.on('resize', () => {
    if (!win.isMaximized()) {
      const [newWidth, newHeight] = win.getSize();
      store.set('windowSize', { width: newWidth, height: newHeight });
    }
  });

  // Guardar posición
  win.on('move', () => {
    const [newX, newY] = win.getPosition();
    store.set('windowPosition', { x: newX, y: newY });
  });

  // Guardar estado maximizado
  win.on('maximize', () => store.set('windowMaximized', true));
  win.on('unmaximize', () => store.set('windowMaximized', false));

  // 🎹 Atajo para mostrar/ocultar menú
  globalShortcut.register('Control+M', () => {
    const visible = win.isMenuBarVisible();
    win.setMenuBarVisibility(!visible);
  });

  win.loadURL('http://localhost:3000');
}

// 🚀 App ready
app.whenReady().then(() => {
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

  const serverPath = path.join(__dirname, 'src', 'server.js');
  require(serverPath);

  waitForServer('http://localhost:3000')
    .then(() => {
      createWindow();
    })
    .catch(err => {
      console.error('❌ No se pudo conectar al servidor Express:', err.message);
      app.quit();
    });
});

// 🧹 Cerrar app si no es macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
