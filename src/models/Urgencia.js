// src/models/Urgencia.js

const db = require('../config/db');

exports.getAll = (callback) => {
  db.all('SELECT * FROM urgencias', [], callback);
};

exports.getById = (id, callback) => {
  db.get('SELECT * FROM urgencias WHERE id = ?', [id], callback);
};

exports.create = (data, callback) => {
  db.run(
    'INSERT INTO urgencias (nombre, color, icono) VALUES (?, ?, ?)',
    [data.nombre, data.color || '#6c757d', data.icono || 'bi bi-exclamation-circle-fill'],
    callback
  );
};

exports.update = (id, data, callback) => {
  db.run(
    'UPDATE urgencias SET nombre = ?, color = ?, icono = ? WHERE id = ?',
    [data.nombre, data.color, data.icono, id],
    callback
  );
};

exports.delete = (id, callback) => {
  db.run('DELETE FROM urgencias WHERE id = ?', [id], callback);
};