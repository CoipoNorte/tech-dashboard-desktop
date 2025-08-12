// src/controllers/authController.js

const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.formLogin = (req, res) => {
  res.render('auth/login', { title: 'Iniciar sesión', error: null });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM usuarios WHERE username = ?', [username], async (err, usuario) => {
    if (err) {
      return res.render('auth/login', { title: 'Iniciar sesión', error: 'Error en la base de datos' });
    }
    if (!usuario) {
      return res.render('auth/login', { title: 'Iniciar sesión', error: 'Usuario o contraseña incorrectos' });
    }
    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.render('auth/login', { title: 'Iniciar sesión', error: 'Usuario o contraseña incorrectos' });
    }
    req.session.usuarioId = usuario.id;
    res.redirect('/dashboard');
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};