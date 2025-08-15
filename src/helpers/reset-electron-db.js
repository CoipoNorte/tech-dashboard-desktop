// src/helpers/reset-electron-db.js

const fs = require('fs');
const path = require('path');
const os = require('os');
const sqlite3 = require('sqlite3').verbose();
const generateSchema = require('./generate_sql_db');

// Simula el userDataPath de Electron en Windows
const userDataPath = path.join(os.homedir(), 'AppData', 'Roaming', 'tech-dashboard-desktop');
const dbPath = path.join(userDataPath, 'tech-dashboard.db');

// Asegura que la carpeta exista
if (!fs.existsSync(userDataPath)) {
  fs.mkdirSync(userDataPath, { recursive: true });
  console.log('📁 Carpeta creada:', userDataPath);
}

// Eliminar base anterior si existe
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('🧹 Base eliminada en producción:', dbPath);
}

// Generar nueva base con esquema
const db = new sqlite3.Database(dbPath);
generateSchema(db);
db.close(() => {
  console.log('✅ Base generada desde cero en producción:', dbPath);
});
