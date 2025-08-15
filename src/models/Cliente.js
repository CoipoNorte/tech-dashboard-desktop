// src/models/Cliente.js

const db = require('../config/db');

exports.getAll = (callback) => {
  db.all('SELECT * FROM clientes ORDER BY fechaCreacion DESC', [], callback);
};

exports.getById = (id, callback) => {
  db.get('SELECT * FROM clientes WHERE id = ?', [id], callback);
};

exports.create = (data, callback) => {
  db.run(
    `INSERT INTO clientes (nombre, telefono, email, contacto, contacto_tipo, direccion, observaciones) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.nombre, 
      data.telefono, 
      data.email, 
      data.contacto, 
      data.contacto_tipo, 
      data.direccion, 
      data.observaciones
    ],
    callback
  );
};

exports.update = (id, data, callback) => {
  db.run(
    `UPDATE clientes 
     SET nombre = ?, telefono = ?, email = ?, contacto = ?, contacto_tipo = ?, direccion = ?, observaciones = ? 
     WHERE id = ?`,
    [
      data.nombre, 
      data.telefono, 
      data.email, 
      data.contacto, 
      data.contacto_tipo, 
      data.direccion, 
      data.observaciones, 
      id
    ],
    callback
  );
};

exports.delete = (id, callback) => {
  db.run('DELETE FROM clientes WHERE id = ?', [id], callback);
};

// Métodos adicionales útiles
exports.getByContactType = (tipo, callback) => {
  db.all('SELECT * FROM clientes WHERE contacto_tipo = ? ORDER BY nombre', [tipo], callback);
};

exports.search = (query, callback) => {
  const searchTerm = `%${query}%`;
  db.all(
    `SELECT * FROM clientes 
     WHERE nombre LIKE ? 
     OR telefono LIKE ? 
     OR email LIKE ? 
     OR contacto LIKE ? 
     OR direccion LIKE ?
     ORDER BY nombre`,
    [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm],
    callback
  );
};

// Estadísticas de tipos de contacto
exports.getContactTypeStats = (callback) => {
  db.all(
    `SELECT 
      contacto_tipo,
      COUNT(*) as total
     FROM clientes 
     WHERE contacto_tipo IS NOT NULL AND contacto_tipo != ''
     GROUP BY contacto_tipo
     ORDER BY total DESC`,
    [],
    callback
  );
};

// Obtener clientes con información incompleta
exports.getIncomplete = (callback) => {
  db.all(
    `SELECT * FROM clientes 
     WHERE (contacto IS NULL OR contacto = '') 
     AND (email IS NULL OR email = '')
     ORDER BY nombre`,
    [],
    callback
  );
};