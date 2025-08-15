// helpers/patchClientes.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

function patchClientes() {
  return new Promise((resolve, reject) => {
    const dbPath = path.join(app.getPath('userData'), 'tech-dashboard.db');

    if (!fs.existsSync(dbPath)) {
      return reject(new Error('Base de datos no encontrada en userData'));
    }

    const db = new sqlite3.Database(dbPath);

    db.all("PRAGMA table_info(clientes)", (err, columns) => {
      if (err) return reject(err);

      const existing = columns.map(col => col.name);
      const patches = [];

      if (!existing.includes('contacto')) {
        patches.push(`ALTER TABLE clientes ADD COLUMN contacto TEXT`);
      }
      if (!existing.includes('contacto_tipo')) {
        patches.push(`ALTER TABLE clientes ADD COLUMN contacto_tipo TEXT`);
      }

      if (patches.length === 0) {
        db.close();
        return resolve({ patched: false });
      }

      db.serialize(() => {
        patches.forEach(sql => db.run(sql));
        db.close();
        resolve({ patched: true });
      });
    });
  });
}

module.exports = patchClientes;
