// src/helpers/copy-dev-db-to-electron.js

const fs = require('fs');
const path = require('path');
const os = require('os');

const userDataPath = path.join(os.homedir(), 'AppData', 'Roaming', 'tech-dashboard-desktop');
const sourcePath = path.join(__dirname, '../data/tech-dashboard.db');
const targetPath = path.join(userDataPath, 'tech-dashboard.db');

if (!fs.existsSync(sourcePath)) {
  console.error('❌ Base de desarrollo no encontrada:', sourcePath);
  process.exit(1);
}

fs.copyFileSync(sourcePath, targetPath);
console.log('📦 Base copiada a producción:', targetPath);
