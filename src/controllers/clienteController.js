// src/controllers/clienteController.js

const db = require('../config/db');

// Listar clientes
exports.listar = (req, res) => {
  const { q } = req.query;
  if (q) {
    db.all('SELECT * FROM clientes WHERE nombre LIKE ?', [`%${q}%`], (err, clientes) => {
      res.render('clientes/index', { title: 'Clientes', clientes, q });
    });
  } else {
    db.all('SELECT * FROM clientes', [], (err, clientes) => {
      res.render('clientes/index', { title: 'Clientes', clientes, q });
    });
  }
};

// Formulario para nuevo cliente
exports.formNuevo = (req, res) => {
  res.render('clientes/form', { title: 'Nuevo Cliente', cliente: {}, action: '/clientes', method: 'POST' });
};

// Crear cliente
exports.crear = (req, res) => {
  const { nombre, telefono, email, direccion, observaciones } = req.body;
  db.run(
    'INSERT INTO clientes (nombre, telefono, email, direccion, observaciones) VALUES (?, ?, ?, ?, ?)',
    [nombre, telefono, email, direccion, observaciones],
    function(err) {
      res.redirect('/clientes');
    }
  );
};

// Detalle de cliente y trabajos asociados (con joins para mostrar nombres e iconos)
exports.detalle = (req, res) => {
  db.get('SELECT * FROM clientes WHERE id = ?', [req.params.id], (err, cliente) => {
    if (!cliente) return res.redirect('/clientes');
    db.all(`
      SELECT t.*, 
        cat.nombre AS categoria_nombre, cat.icono AS categoria_icono,
        e.nombre AS estado_nombre, e.color AS estado_color, e.icono AS estado_icono,
        u.nombre AS urgencia_nombre, u.color AS urgencia_color, u.icono AS urgencia_icono
      FROM trabajos t
      JOIN categorias cat ON t.categoria_id = cat.id
      JOIN estados e ON t.estado_id = e.id
      JOIN urgencias u ON t.urgencia_id = u.id
      WHERE t.cliente_id = ?
    `, [cliente.id], (err, trabajos) => {
      res.render('clientes/detalle', { title: 'Detalle Cliente', cliente, trabajos });
    });
  });
};

// Formulario para editar cliente
exports.formEditar = (req, res) => {
  db.get('SELECT * FROM clientes WHERE id = ?', [req.params.id], (err, cliente) => {
    if (!cliente) return res.redirect('/clientes');
    res.render('clientes/form', { title: 'Editar Cliente', cliente, action: `/clientes/${cliente.id}`, method: 'POST' });
  });
};

// Editar cliente
exports.editar = (req, res) => {
  const { nombre, telefono, email, direccion, observaciones } = req.body;
  db.run(
    'UPDATE clientes SET nombre = ?, telefono = ?, email = ?, direccion = ?, observaciones = ? WHERE id = ?',
    [nombre, telefono, email, direccion, observaciones, req.params.id],
    function(err) {
      res.redirect('/clientes');
    }
  );
};

// Eliminar cliente
exports.eliminar = (req, res) => {
  db.run('DELETE FROM clientes WHERE id = ?', [req.params.id], function() {
    res.redirect('/clientes');
  });
};