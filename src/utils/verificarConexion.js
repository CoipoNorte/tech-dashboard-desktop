const db = require('../config/db');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function preguntar(pregunta) {
  return new Promise(resolve => rl.question(pregunta, resolve));
}

async function verificarUsuario() {
  try {
    const username = await preguntar('Usuario: ');
    const password = await preguntar('Contraseña: ');

    db.get('SELECT * FROM usuarios WHERE username = ?', [username], async (err, usuario) => {
      if (err) {
        console.error('❌ Error en la base de datos:', err.message);
        rl.close();
        process.exit(1);
      }
      if (!usuario) {
        console.log('❌ Usuario no encontrado.');
        rl.close();
        process.exit(1);
      }
      const valido = await bcrypt.compare(password, usuario.password);
      if (valido) {
        console.log('✅ Conexión y login funcionando correctamente.');
        console.log('Usuario:', usuario.nombre, '| ID:', usuario.id);
      } else {
        console.log('❌ Contraseña incorrecta.');
      }
      rl.close();
      process.exit(0);
    });
  } catch (e) {
    console.error('❌ Error:', e.message);
    rl.close();
    process.exit(1);
  }
}

verificarUsuario();