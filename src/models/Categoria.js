const db = require('../config/db');

exports.getAll = (callback) => {
  db.all('SELECT * FROM categorias', [], callback);
};

exports.getById = (id, callback) => {
  db.get('SELECT * FROM categorias WHERE id = ?', [id], callback);
};

exports.create = (data, callback) => {
  db.run(
    'INSERT INTO categorias (nombre, icono) VALUES (?, ?)',
    [data.nombre, data.icono || 'bi bi-tag'],
    callback
  );
};

exports.update = (id, data, callback) => {
  db.run(
    'UPDATE categorias SET nombre = ?, icono = ? WHERE id = ?',
    [data.nombre, data.icono, id],
    callback
  );
};

exports.delete = (id, callback) => {
  db.run('DELETE FROM categorias WHERE id = ?', [id], callback);
};