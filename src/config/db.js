// src/config/db.js

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

let dbPath;

if (app.isPackaged) {
  // Producción: usar carpeta accesible
  const userDataPath = app.getPath('userData');
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
  // Desarrollo
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
