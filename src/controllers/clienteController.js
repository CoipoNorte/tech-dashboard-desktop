// src/controllers/clienteController.js

const db = require('../config/db');

// Listar clientes
exports.listar = (req, res) => {
  const { q } = req.query;
  if (q) {
    db.all(
      `SELECT * FROM clientes 
       WHERE nombre LIKE ? 
       OR telefono LIKE ? 
       OR email LIKE ? 
       OR contacto LIKE ?
       ORDER BY fechaCreacion DESC`, 
      [`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`], 
      (err, clientes) => {
        res.render('clientes/index', { title: 'Clientes', clientes, q });
      }
    );
  } else {
    db.all('SELECT * FROM clientes ORDER BY fechaCreacion DESC', [], (err, clientes) => {
      res.render('clientes/index', { title: 'Clientes', clientes, q });
    });
  }
};

// Formulario para nuevo cliente
exports.formNuevo = (req, res) => {
  res.render('clientes/form', { 
    title: 'Nuevo Cliente', 
    cliente: {}, 
    action: '/clientes', 
    method: 'POST' 
  });
};

// Crear cliente
exports.crear = (req, res) => {
  const { nombre, telefono, email, contacto, contacto_tipo, direccion, observaciones } = req.body;
  db.run(
    `INSERT INTO clientes (nombre, telefono, email, contacto, contacto_tipo, direccion, observaciones) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, telefono, email, contacto, contacto_tipo, direccion, observaciones],
    function(err) {
      if (err) {
        console.error('Error al crear cliente:', err);
      }
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
      ORDER BY t.fechaIngreso DESC
    `, [cliente.id], (err, trabajos) => {
      res.render('clientes/detalle', { title: 'Detalle Cliente', cliente, trabajos });
    });
  });
};

// Formulario para editar cliente
exports.formEditar = (req, res) => {
  db.get('SELECT * FROM clientes WHERE id = ?', [req.params.id], (err, cliente) => {
    if (!cliente) return res.redirect('/clientes');
    res.render('clientes/form', { 
      title: 'Editar Cliente', 
      cliente, 
      action: `/clientes/${cliente.id}`, 
      method: 'POST' 
    });
  });
};

// Editar cliente
exports.editar = (req, res) => {
  const { nombre, telefono, email, contacto, contacto_tipo, direccion, observaciones } = req.body;
  db.run(
    `UPDATE clientes 
     SET nombre = ?, telefono = ?, email = ?, contacto = ?, contacto_tipo = ?, direccion = ?, observaciones = ? 
     WHERE id = ?`,
    [nombre, telefono, email, contacto, contacto_tipo, direccion, observaciones, req.params.id],
    function(err) {
      if (err) {
        console.error('Error al actualizar cliente:', err);
      }
      res.redirect(`/clientes/${req.params.id}`);
    }
  );
};

// Eliminar cliente
exports.eliminar = (req, res) => {
  // Primero verificar si tiene trabajos asociados
  db.get(
    'SELECT COUNT(*) as count FROM trabajos WHERE cliente_id = ?', 
    [req.params.id], 
    (err, result) => {
      if (result && result.count > 0) {
        // Si tiene trabajos, no permitir eliminar
        res.status(400).send('No se puede eliminar un cliente con trabajos asociados');
      } else {
        // Si no tiene trabajos, proceder a eliminar
        db.run('DELETE FROM clientes WHERE id = ?', [req.params.id], function(err) {
          if (err) {
            console.error('Error al eliminar cliente:', err);
            res.status(500).send('Error al eliminar cliente');
          } else {
            res.redirect('/clientes');
          }
        });
      }
    }
  );
};

// Método adicional: Obtener estadísticas de tipos de contacto
exports.estadisticasContacto = (req, res) => {
  db.all(
    `SELECT 
      contacto_tipo,
      COUNT(*) as total
     FROM clientes 
     WHERE contacto_tipo IS NOT NULL AND contacto_tipo != ''
     GROUP BY contacto_tipo
     ORDER BY total DESC`,
    [],
    (err, stats) => {
      if (err) {
        console.error('Error al obtener estadísticas:', err);
        res.json({ error: 'Error al obtener estadísticas' });
      } else {
        res.json(stats);
      }
    }
  );
};