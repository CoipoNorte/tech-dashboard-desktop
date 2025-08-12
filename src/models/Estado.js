// src/models/Estado.js

const db = require('../config/db');

exports.getAll = (callback) => {
  db.all('SELECT * FROM estados', [], callback);
};

exports.getById = (id, callback) => {
  db.get('SELECT * FROM estados WHERE id = ?', [id], callback);
};

exports.create = (data, callback) => {
  db.run(
    'INSERT INTO estados (nombre, color, icono) VALUES (?, ?, ?)',
    [data.nombre, data.color || '#6c757d', data.icono || 'bi bi-flag'],
    callback
  );
};

exports.update = (id, data, callback) => {
  db.run(
    'UPDATE estados SET nombre = ?, color = ?, icono = ? WHERE id = ?',
    [data.nombre, data.color, data.icono, id],
    callback
  );
};

exports.delete = (id, callback) => {
  db.run('DELETE FROM estados WHERE id = ?', [id], callback);
};