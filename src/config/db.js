// src/config/db.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

let dbPath;

// Detecta si está en Electron y si es build (producción)
const isElectron = !!process.versions.electron;
let isPackaged = false;
let userDataPath = null;

if (isElectron) {
  try {
    const electron = require('electron');
    isPackaged = (electron.app || electron.remote.app).isPackaged;
    userDataPath = (electron.app || electron.remote.app).getPath('userData');
  } catch (e) {
    isPackaged = false;
    userDataPath = null;
  }
}

if (isElectron && isPackaged && userDataPath) {
  // Producción: usar carpeta accesible del usuario
  dbPath = path.join(userDataPath, 'tech-dashboard.db');

  // Copiar desde resources si no existe
  const sourcePath = path.join(process.resourcesPath, 'data', 'tech-dashboard.db');
  if (!fs.existsSync(dbPath)) {
    try {
      fs.copyFileSync(sourcePath, dbPath);
      console.log('📦 Base de datos copiada a userData');
    } catch (err) {
      console.error('❌ Error copiando la base de datos:', err.message);
    }
  }
} else {
  // Desarrollo (Node.js puro o Electron dev)
  dbPath = path.join(__dirname, '../data/tech-dashboard.db');
}

const db = new sqlite3.Database(dbPath, err => {
  if (err) {
    console.error('❌ Error al abrir la base de datos:', err.message);
  } else {
    console.log('✅ Base de datos abierta en:', dbPath);
  }
});

module.exports = db;