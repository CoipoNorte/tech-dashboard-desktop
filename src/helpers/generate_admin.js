// src/helpers/generate_admin.js

const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function crearAdmin() {
  const nombre = 'Admin';
  const username = 'admin';
  const password = await bcrypt.hash('Admin123', 10);

  db.get('SELECT * FROM usuarios WHERE username = ?', [username], (err, usuario) => {
    if (usuario) {
      console.log('El usuario admin ya existe.');
      process.exit();
    } else {
      db.run(
        'INSERT INTO usuarios (nombre, username, password) VALUES (?, ?, ?)',
        [nombre, username, password],
        function(err) {
          if (err) {
            console.error('Error al crear admin:', err);
          } else {
            console.log('Usuario admin creado: admin / Admin123');
          }
          process.exit();
        }
      );
    }
  });
}

crearAdmin();