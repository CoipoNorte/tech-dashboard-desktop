const db = require('../config/db');

exports.getAll = (callback) => {
  db.all('SELECT * FROM clientes', [], callback);
};

exports.getById = (id, callback) => {
  db.get('SELECT * FROM clientes WHERE id = ?', [id], callback);
};

exports.create = (data, callback) => {
  db.run(
    'INSERT INTO clientes (nombre, telefono, email, direccion, observaciones) VALUES (?, ?, ?, ?, ?)',
    [data.nombre, data.telefono, data.email, data.direccion, data.observaciones],
    callback
  );
};

exports.update = (id, data, callback) => {
  db.run(
    'UPDATE clientes SET nombre = ?, telefono = ?, email = ?, direccion = ?, observaciones = ? WHERE id = ?',
    [data.nombre, data.telefono, data.email, data.direccion, data.observaciones, id],
    callback
  );
};

exports.delete = (id, callback) => {
  db.run('DELETE FROM clientes WHERE id = ?', [id], callback);
};