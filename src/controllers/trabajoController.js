// src/controllers/trabajoController.js

const db = require('../config/db');


function fixDateFromInput(dateStr) {
  if (!dateStr) return null;
  return dateStr;
}

// Función helper para formatear fechas para inputs HTML
function formatDateForInput(dateString) {
  if (!dateString) return '';
  
  // Si ya está en formato YYYY-MM-DD, devolverla tal cual
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }
  
  // Si viene con hora (formato ISO), extraer solo la fecha
  if (dateString.includes('T')) {
    return dateString.split('T')[0];
  }
  
  // Intentar parsear y formatear
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (e) {
    return '';
  }
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
  // Obtener parámetros de query
  const clienteId = req.query.cliente || null;
  const fechaIngreso = req.query.fechaIngreso || '';
  
  console.log('Fecha recibida del calendario:', fechaIngreso);
  
  db.all('SELECT * FROM clientes ORDER BY nombre', (err, clientes) => {
    db.all('SELECT * FROM categorias ORDER BY nombre', (err2, categorias) => {
      db.all('SELECT * FROM estados ORDER BY nombre', (err3, estados) => {
        db.all('SELECT * FROM urgencias ORDER BY nombre', (err4, urgencias) => {
          res.render('trabajos/form', {
            title: 'Nuevo Trabajo',
            trabajo: { 
              fechaIngreso: fechaIngreso,
              fechaIngresoInput: formatDateForInput(fechaIngreso), // Agregar esta línea
              fechaEntregaInput: '', // Para consistencia
              cliente_id: clienteId
            },
            clientes: clientes || [],
            categorias: categorias || [],
            estados: estados || [],
            urgencias: urgencias || [],
            action: '/trabajos',
            method: 'POST',
            clienteId: clienteId
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
    function (err) {
      if (req.body.redirectClienteId) {
        return res.redirect('/clientes/' + req.body.redirectClienteId);
      }
      res.redirect('/trabajos');
    }
  );
};

// Formulario para editar trabajo
exports.formEditar = (req, res) => {
  const id = req.params.id;
  
  db.get(`
    SELECT t.*, 
      c.nombre AS cliente_nombre
    FROM trabajos t
    JOIN clientes c ON t.cliente_id = c.id
    WHERE t.id = ?
  `, [id], (err, trabajo) => {
    if (err || !trabajo) {
      return res.redirect('/trabajos');
    }
    
    // Formatear fechas para los inputs
    trabajo.fechaIngresoInput = formatDateForInput(trabajo.fechaIngreso);
    trabajo.fechaEntregaInput = formatDateForInput(trabajo.fechaEntrega);
    
    db.all('SELECT * FROM clientes ORDER BY nombre', (err, clientes) => {
      db.all('SELECT * FROM categorias ORDER BY nombre', (err2, categorias) => {
        db.all('SELECT * FROM estados ORDER BY nombre', (err3, estados) => {
          db.all('SELECT * FROM urgencias ORDER BY nombre', (err4, urgencias) => {
            res.render('trabajos/form', {
              title: 'Editar Trabajo',
              trabajo: trabajo,
              clientes: clientes || [],
              categorias: categorias || [],
              estados: estados || [],
              urgencias: urgencias || [],
              action: `/trabajos/${id}`,
              method: 'POST',
              clienteId: null
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
    function (err) {
      if (req.body.redirectClienteId) {
        return res.redirect('/clientes/' + req.body.redirectClienteId);
      }
      res.redirect('/trabajos');
    }
  );
};

// Eliminar trabajo
exports.eliminar = (req, res) => {
  db.run('DELETE FROM trabajos WHERE id = ?', [req.params.id], function () {
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


// Calendario de trabajos
exports.calendario = (req, res) => {
  // Obtener parámetros
  const hoy = new Date();
  const mes = req.query.mes ? parseInt(req.query.mes) : hoy.getMonth() + 1;
  const anio = req.query.anio ? parseInt(req.query.anio) : hoy.getFullYear();
  const vista = req.query.vista || 'mes';

  // Calcular semana
  let semana = 1;
  let inicioSemana, finSemana, mesRealSemana;

  if (vista === 'semana') {
    if (req.query.semana) {
      semana = parseInt(req.query.semana);
    } else {
      // Calcular semana actual del año
      const inicioAnio = new Date(anio, 0, 1);
      const dias = Math.floor((hoy - inicioAnio) / (24 * 60 * 60 * 1000));
      semana = Math.ceil((dias + inicioAnio.getDay() + 1) / 7);
    }

    // Calcular fechas de la semana
    const primerDiaAnio = new Date(anio, 0, 1);
    const diasParaSemana = (semana - 1) * 7 - primerDiaAnio.getDay();
    inicioSemana = new Date(anio, 0, diasParaSemana + 1);
    finSemana = new Date(anio, 0, diasParaSemana + 7);

    // Determinar el mes real de la semana (mes del miércoles)
    const miercoles = new Date(anio, 0, diasParaSemana + 4);
    mesRealSemana = miercoles.getMonth() + 1;
  }

  // Filtros
  const categoriaFilter = req.query.categoria || '';
  const estadoFilter = req.query.estado || '';

  // Construir query
  let whereClause = '';
  let params = [];

  if (vista === 'semana') {
    whereClause = `WHERE date(t.fechaEntrega) >= date(?) AND date(t.fechaEntrega) <= date(?)`;
    params = [
      inicioSemana.toISOString().split('T')[0],
      finSemana.toISOString().split('T')[0]
    ];
  } else {
    whereClause = `WHERE strftime('%Y', t.fechaEntrega) = ? AND strftime('%m', t.fechaEntrega) = ?`;
    params = [anio.toString(), mes.toString().padStart(2, '0')];
  }

  if (categoriaFilter) {
    whereClause += ` AND t.categoria_id = ?`;
    params.push(categoriaFilter);
  }

  if (estadoFilter) {
    whereClause += ` AND t.estado_id = ?`;
    params.push(estadoFilter);
  }

  // Obtener trabajos
  db.all(`
    SELECT t.*, 
      c.nombre AS cliente_nombre,
      cat.nombre AS categoria_nombre, cat.icono AS categoria_icono,
      e.nombre AS estado_nombre, e.color AS estado_color, e.icono AS estado_icono,
      u.nombre AS urgencia_nombre, u.color AS urgencia_color, u.icono AS urgencia_icono
    FROM trabajos t
    JOIN clientes c ON t.cliente_id = c.id
    JOIN categorias cat ON t.categoria_id = cat.id
    JOIN estados e ON t.estado_id = e.id
    JOIN urgencias u ON t.urgencia_id = u.id
    ${whereClause}
    ORDER BY t.fechaEntrega ASC
  `, params, (err, trabajos) => {
    if (err) {
      console.error(err);
      trabajos = [];
    }

    // Agrupar trabajos por fecha
    const trabajosPorFecha = {};
    trabajos.forEach(trabajo => {
      if (trabajo.fechaEntrega) {
        const fecha = trabajo.fechaEntrega.split('T')[0];
        if (!trabajosPorFecha[fecha]) {
          trabajosPorFecha[fecha] = [];
        }
        trabajosPorFecha[fecha].push(trabajo);
      }
    });

    // Obtener categorías y estados
    db.all('SELECT * FROM categorias ORDER BY nombre', (err, categorias) => {
      db.all('SELECT * FROM estados ORDER BY nombre', (err, estados) => {
        res.render('trabajos/calendario', {
          title: 'Calendario de Entregas',
          mes,
          anio,
          vista,
          semana,
          mesRealSemana: vista === 'semana' ? mesRealSemana : mes,
          trabajosPorFecha,
          categorias: categorias || [],
          estados: estados || [],
          filtros: {
            categoria: categoriaFilter,
            estado: estadoFilter
          }
        });
      });
    });
  });
};

// Actualizar fecha de entrega
exports.actualizarFechaEntrega = (req, res) => {
  const { id } = req.params;
  const { fechaEntrega } = req.body;

  if (!fechaEntrega || !id) {
    return res.status(400).json({
      success: false,
      error: 'Datos incompletos'
    });
  }

  db.run(
    'UPDATE trabajos SET fechaEntrega = ? WHERE id = ?',
    [fechaEntrega, id],
    function (err) {
      if (err) {
        console.error('Error al actualizar fecha:', err);
        return res.status(500).json({
          success: false,
          error: 'Error al actualizar la fecha'
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          success: false,
          error: 'Trabajo no encontrado'
        });
      }

      res.json({
        success: true,
        message: 'Fecha actualizada correctamente',
        changes: this.changes
      });
    }
  );
};