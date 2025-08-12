// src/models/Usuario.js

const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getByUsername = (username, callback) => {
  db.get('SELECT * FROM usuarios WHERE username = ?', [username], callback);
};

exports.getById = (id, callback) => {
  db.get('SELECT * FROM usuarios WHERE id = ?', [id], callback);
};

exports.create = async (data, callback) => {
  const hash = await bcrypt.hash(data.password, 10);
  db.run(
    'INSERT INTO usuarios (nombre, username, password) VALUES (?, ?, ?)',
    [data.nombre, data.username, hash],
    callback
  );
};

exports.update = async (id, data, callback) => {
  if (data.password) {
    const hash = await bcrypt.hash(data.password, 10);
    db.run(
      'UPDATE usuarios SET nombre = ?, password = ? WHERE id = ?',
      [data.nombre, hash, id],
      callback
    );
  } else {
    db.run(
      'UPDATE usuarios SET nombre = ? WHERE id = ?',
      [data.nombre, id],
      callback
    );
  }
};

exports.delete = (id, callback) => {
  db.run('DELETE FROM usuarios WHERE id = ?', [id], callback);
};

exports.compararPassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};