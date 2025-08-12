// src/controllers/usuarioController.js

const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Mostrar perfil y lista de usuarios
exports.perfil = (req, res) => {
  if (!req.session.usuarioId) return res.redirect('/login');
  db.get('SELECT * FROM usuarios WHERE id = ?', [req.session.usuarioId], (err, usuario) => {
    if (!usuario) {
      req.session.destroy(() => {
        res.redirect('/login');
      });
      return;
    }
    db.all('SELECT * FROM usuarios', [], (err, usuarios) => {
      res.render('usuarios/perfil', { title: 'Mi Perfil', usuario, usuarios, error: null });
    });
  });
};

// Actualizar perfil
exports.actualizarPerfil = (req, res) => {
  if (!req.session.usuarioId) return res.redirect('/login');
  db.get('SELECT * FROM usuarios WHERE id = ?', [req.session.usuarioId], async (err, usuario) => {
    if (!usuario) {
      req.session.destroy(() => {
        res.redirect('/login');
      });
      return;
    }
    const { nombre, passwordActual, passwordNueva } = req.body;
    if (passwordActual && passwordNueva) {
      const valido = await bcrypt.compare(passwordActual, usuario.password);
      if (!valido) {
        db.all('SELECT * FROM usuarios', [], (err, usuarios) => {
          return res.render('usuarios/perfil', { title: 'Mi Perfil', usuario, usuarios, error: 'Contraseña actual incorrecta' });
        });
        return;
      }
      const hash = await bcrypt.hash(passwordNueva, 10);
      db.run('UPDATE usuarios SET nombre = ?, password = ? WHERE id = ?', [nombre, hash, usuario.id], () => {
        db.all('SELECT * FROM usuarios', [], (err, usuarios) => {
          res.render('usuarios/perfil', { title: 'Mi Perfil', usuario: { ...usuario, nombre }, usuarios, error: 'Perfil actualizado correctamente' });
        });
      });
    } else {
      db.run('UPDATE usuarios SET nombre = ? WHERE id = ?', [nombre, usuario.id], () => {
        db.all('SELECT * FROM usuarios', [], (err, usuarios) => {
          res.render('usuarios/perfil', { title: 'Mi Perfil', usuario: { ...usuario, nombre }, usuarios, error: 'Perfil actualizado correctamente' });
        });
      });
    }
  });
};

// Formulario para nuevo usuario
exports.formNuevoUsuario = (req, res) => {
  res.render('usuarios/nuevo', { title: 'Nuevo Usuario', error: null });
};

// Crear usuario
exports.crearUsuario = (req, res) => {
  const { nombre, username, password } = req.body;
  if (!nombre || !username || !password) {
    return res.render('usuarios/nuevo', { title: 'Nuevo Usuario', error: 'Todos los campos son obligatorios' });
  }
  db.get('SELECT * FROM usuarios WHERE username = ?', [username], async (err, existe) => {
    if (existe) {
      return res.render('usuarios/nuevo', { title: 'Nuevo Usuario', error: 'El usuario ya existe' });
    }
    const hash = await bcrypt.hash(password, 10);
    db.run('INSERT INTO usuarios (nombre, username, password) VALUES (?, ?, ?)', [nombre, username, hash], function(err) {
      if (err) {
        return res.render('usuarios/nuevo', { title: 'Nuevo Usuario', error: 'Error al crear usuario' });
      }
      res.render('usuarios/nuevo', { title: 'Nuevo Usuario', error: 'Usuario creado correctamente' });
    });
  });
};

// Formulario para editar usuario
exports.formEditarUsuario = (req, res) => {
  db.get('SELECT * FROM usuarios WHERE id = ?', [req.params.id], (err, usuario) => {
    if (!usuario) {
      return res.redirect('/usuarios/perfil');
    }
    res.render('usuarios/editar', { title: 'Editar Usuario', usuario, error: null });
  });
};

// Editar usuario
exports.editarUsuario = (req, res) => {
  db.get('SELECT * FROM usuarios WHERE id = ?', [req.params.id], async (err, usuario) => {
    if (!usuario) {
      return res.redirect('/usuarios/perfil');
    }
    const nombre = req.body.nombre;
    if (req.body.password && req.body.password.length > 0) {
      const hash = await bcrypt.hash(req.body.password, 10);
      db.run('UPDATE usuarios SET nombre = ?, password = ? WHERE id = ?', [nombre, hash, usuario.id], () => {
        res.redirect('/usuarios/perfil');
      });
    } else {
      db.run('UPDATE usuarios SET nombre = ? WHERE id = ?', [nombre, usuario.id], () => {
        res.redirect('/usuarios/perfil');
      });
    }
  });
};

// Eliminar usuario
exports.eliminarUsuario = (req, res) => {
  db.run('DELETE FROM usuarios WHERE id = ?', [req.params.id], function() {
    if (req.session.usuarioId == req.params.id) {
      req.session.destroy(() => {
        res.redirect('/login');
      });
    } else {
      res.redirect('/usuarios/perfil');
    }
  });
};