// src/models/Trabajo.js

const db = require('../config/db');

// Obtener todos los trabajos con joins para mostrar nombres y iconos
exports.getAll = (callback) => {
  db.all(`
    SELECT t.*, 
      c.nombre AS cliente_nombre, c.id AS cliente_id,
      cat.nombre AS categoria_nombre, cat.icono AS categoria_icono,
      e.nombre AS estado_nombre, e.color AS estado_color, e.icono AS estado_icono,
      u.nombre AS urgencia_nombre, u.color AS urgencia_color, u.icono AS urgencia_icono
    FROM trabajos t
    JOIN clientes c ON t.cliente_id = c.id
    JOIN categorias cat ON t.categoria_id = cat.id
    JOIN estados e ON t.estado_id = e.id
    JOIN urgencias u ON t.urgencia_id = u.id
  `, [], callback);
};

exports.getById = (id, callback) => {
  db.get(`
    SELECT t.*, 
      c.nombre AS cliente_nombre, c.id AS cliente_id,
      cat.nombre AS categoria_nombre, cat.icono AS categoria_icono,
      e.nombre AS estado_nombre, e.color AS estado_color, e.icono AS estado_icono,
      u.nombre AS urgencia_nombre, u.color AS urgencia_color, u.icono AS urgencia_icono
    FROM trabajos t
    JOIN clientes c ON t.cliente_id = c.id
    JOIN categorias cat ON t.categoria_id = cat.id
    JOIN estados e ON t.estado_id = e.id
    JOIN urgencias u ON t.urgencia_id = u.id
    WHERE t.id = ?
  `, [id], callback);
};

exports.create = (data, callback) => {
  db.run(
    `INSERT INTO trabajos 
      (cliente_id, descripcion, observaciones, precio, fechaIngreso, fechaEntrega, carpetaDriveId, categoria_id, estado_id, urgencia_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.cliente_id,
      data.descripcion,
      data.observaciones,
      data.precio,
      data.fechaIngreso,
      data.fechaEntrega,
      data.carpetaDriveId,
      data.categoria_id,
      data.estado_id,
      data.urgencia_id
    ],
    function(err) {
      if (err) return callback(err);
      callback(null, this.lastID);
    }
  );
};

exports.update = (id, data, callback) => {
  db.run(
    `UPDATE trabajos SET 
      cliente_id = ?, descripcion = ?, observaciones = ?, precio = ?, fechaIngreso = ?, fechaEntrega = ?, carpetaDriveId = ?, categoria_id = ?, estado_id = ?, urgencia_id = ?
      WHERE id = ?`,
    [
      data.cliente_id,
      data.descripcion,
      data.observaciones,
      data.precio,
      data.fechaIngreso,
      data.fechaEntrega,
      data.carpetaDriveId,
      data.categoria_id,
      data.estado_id,
      data.urgencia_id,
      id
    ],
    callback
  );
};

exports.delete = (id, callback) => {
  db.run('DELETE FROM trabajos WHERE id = ?', [id], callback);
};

// Imágenes asociadas a trabajos
exports.getImagenes = (trabajoId, callback) => {
  db.all('SELECT * FROM imagenes WHERE trabajo_id = ?', [trabajoId], callback);
};

exports.addImagen = (trabajoId, data, callback) => {
  db.run(
    'INSERT INTO imagenes (trabajo_id, url, nombre, driveId) VALUES (?, ?, ?, ?)',
    [trabajoId, data.url, data.nombre, data.driveId],
    callback
  );
};

exports.deleteImagen = (imagenId, callback) => {
  db.run('DELETE FROM imagenes WHERE id = ?', [imagenId], callback);
};

exports.updateImagen = (imagenId, data, callback) => {
  db.run(
    'UPDATE imagenes SET nombre = ? WHERE id = ?',
    [data.nombre, imagenId],
    callback
  );
};