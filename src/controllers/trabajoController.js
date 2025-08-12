// src/controllers/trabajoController.js

const db = require('../config/db');

function toInputDate(date) {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function fixDateFromInput(dateStr) {
  if (!dateStr) return null;
  return dateStr;
}

// Listar trabajos con filtros
exports.listar = (req, res) => {
  let sql = `
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
    WHERE 1=1
  `;
  const params = [];

  // Filtro por búsqueda
  if (req.query.q) {
    sql += ' AND (t.descripcion LIKE ? OR c.nombre LIKE ?)';
    params.push(`%${req.query.q}%`, `%${req.query.q}%`);
  }
  // Filtro por categoría
  if (req.query.categoria) {
    sql += ' AND t.categoria_id = ?';
    params.push(req.query.categoria);
  }
  // Filtro por estado
  if (req.query.estado) {
    sql += ' AND t.estado_id = ?';
    params.push(req.query.estado);
  }
  // Filtro por urgencia
  if (req.query.urgencia) {
    sql += ' AND t.urgencia_id = ?';
    params.push(req.query.urgencia);
  }
  // Filtro por fechas
  if (req.query.fechaInicio) {
    sql += ' AND t.fechaIngreso >= ?';
    params.push(req.query.fechaInicio);
  }
  if (req.query.fechaFin) {
    sql += ' AND t.fechaIngreso <= ?';
    params.push(req.query.fechaFin);
  }
  // Orden
  if (req.query.orden) {
    const ordenes = {
      'precio_asc': 't.precio ASC',
      'precio_desc': 't.precio DESC',
      'fechaIngreso_asc': 't.fechaIngreso ASC',
      'fechaIngreso_desc': 't.fechaIngreso DESC',
      'fechaEntrega_asc': 't.fechaEntrega ASC',
      'fechaEntrega_desc': 't.fechaEntrega DESC'
    };
    sql += ' ORDER BY ' + (ordenes[req.query.orden] || 't.id DESC');
  } else {
    sql += ' ORDER BY t.id DESC';
  }

  db.all(sql, params, (err, trabajos) => {
    db.all('SELECT * FROM estados', [], (err, estados) => {
      db.all('SELECT * FROM categorias', [], (err, categorias) => {
        db.all('SELECT * FROM urgencias', [], (err, urgencias) => {
          res.render('trabajos/index', {
            title: 'Trabajos',
            trabajos,
            q: req.query.q,
            estados,
            categorias,
            urgencias,
            req
          });
        });
      });
    });
  });
};

// Formulario para nuevo trabajo
exports.formNuevo = (req, res) => {
  db.all('SELECT * FROM clientes', [], (err, clientes) => {
    db.all('SELECT * FROM categorias', [], (err, categorias) => {
      db.all('SELECT * FROM estados', [], (err, estados) => {
        db.all('SELECT * FROM urgencias', [], (err, urgencias) => {
          const clienteId = req.query.cliente;
          res.render('trabajos/form', {
            title: 'Nuevo Trabajo',
            trabajo: { fechaIngresoInput: '', fechaEntregaInput: '', imagenes: [] },
            clientes,
            categorias,
            estados,
            urgencias,
            clienteId,
            action: '/trabajos',
            method: 'POST'
          });
        });
      });
    });
  });
};

// Crear trabajo
exports.crear = (req, res) => {
  const data = req.body;
  data.imagenes = [];
  data.fechaIngreso = fixDateFromInput(data.fechaIngreso);
  data.fechaEntrega = fixDateFromInput(data.fechaEntrega);
  db.run(
    `INSERT INTO trabajos (cliente_id, descripcion, observaciones, precio, fechaIngreso, fechaEntrega, carpetaDriveId, categoria_id, estado_id, urgencia_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.cliente,
      data.descripcion,
      data.observaciones,
      data.precio,
      data.fechaIngreso,
      data.fechaEntrega,
      data.carpetaDriveId,
      data.categoria,
      data.estado,
      data.urgencia
    ],
    function(err) {
      if (req.body.redirectClienteId) {
        return res.redirect('/clientes/' + req.body.redirectClienteId);
      }
      res.redirect('/trabajos');
    }
  );
};

// Formulario para editar trabajo
exports.formEditar = (req, res) => {
  db.get('SELECT * FROM trabajos WHERE id = ?', [req.params.id], (err, trabajo) => {
    db.all('SELECT * FROM clientes', [], (err, clientes) => {
      db.all('SELECT * FROM categorias', [], (err, categorias) => {
        db.all('SELECT * FROM estados', [], (err, estados) => {
          db.all('SELECT * FROM urgencias', [], (err, urgencias) => {
            res.render('trabajos/form', {
              title: 'Editar Trabajo',
              trabajo: {
                ...trabajo,
                fechaIngresoInput: toInputDate(trabajo.fechaIngreso),
                fechaEntregaInput: toInputDate(trabajo.fechaEntrega)
              },
              clientes,
              categorias,
              estados,
              urgencias,
              clienteId: trabajo.cliente_id,
              action: `/trabajos/${trabajo.id}`,
              method: 'POST'
            });
          });
        });
      });
    });
  });
};

// Editar trabajo
exports.editar = (req, res) => {
  const data = req.body;
  data.fechaIngreso = fixDateFromInput(data.fechaIngreso);
  data.fechaEntrega = fixDateFromInput(data.fechaEntrega);
  db.run(
    `UPDATE trabajos SET cliente_id = ?, descripcion = ?, observaciones = ?, precio = ?, fechaIngreso = ?, fechaEntrega = ?, carpetaDriveId = ?, categoria_id = ?, estado_id = ?, urgencia_id = ?
     WHERE id = ?`,
    [
      data.cliente,
      data.descripcion,
      data.observaciones,
      data.precio,
      data.fechaIngreso,
      data.fechaEntrega,
      data.carpetaDriveId,
      data.categoria,
      data.estado,
      data.urgencia,
      req.params.id
    ],
    function(err) {
      if (req.body.redirectClienteId) {
        return res.redirect('/clientes/' + req.body.redirectClienteId);
      }
      res.redirect('/trabajos');
    }
  );
};

// Eliminar trabajo
exports.eliminar = (req, res) => {
  db.run('DELETE FROM trabajos WHERE id = ?', [req.params.id], function() {
    if (req.body.redirectClienteId) {
      return res.redirect('/clientes/' + req.body.redirectClienteId);
    }
    res.redirect('/trabajos');
  });
};

// Detalle de trabajo (con join para mostrar nombres)
exports.detalle = (req, res) => {
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
  `, [req.params.id], (err, trabajo) => {
    res.render('trabajos/detalle', { title: 'Detalle de Trabajo', trabajo });
  });
};