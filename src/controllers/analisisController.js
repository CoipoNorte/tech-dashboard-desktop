const db = require('../config/db');
const moment = require('moment');
moment.locale('es');

exports.dashboard = async (req, res) => {
  try {
    const periodo = req.query.periodo || 'mes';
    const fechaInicio = getFechaInicio(periodo);
    const fechaFin = moment().format('YYYY-MM-DD');

    // Obtener todos los datos necesarios
    const [
      ingresosTotales,
      trabajosCompletados,
      ticketPromedio,
      clientesActivos,
      ingresosPorMes,
      categorias,
      topClientes,
      serviciosFrecuentes,
      zonasClientes,
      trabajosPorDia,
      proyecciones,
      estadosInfo
    ] = await Promise.all([
      getIngresosTotales(fechaInicio, fechaFin),
      getTrabajosCompletados(fechaInicio, fechaFin),
      getTicketPromedio(fechaInicio, fechaFin),
      getClientesActivos(fechaInicio, fechaFin),
      getIngresosPorMes(),
      getCategoriaStats(),
      getTopClientes(),
      getServiciosFrecuentes(),
      getZonasClientes(),
      getTrabajosPorDia(),
      getProyecciones(),
      getEstadosInfo()
    ]);

    // Log para debug
    console.log('Datos del analisis:', {
      periodo,
      fechaInicio,
      fechaFin,
      ingresosTotales,
      trabajosCompletados,
      categoriasCount: categorias.length,
      estadosCount: estadosInfo.length
    });

    res.render('analisis/index', {
      title: 'Análisis de Datos',
      periodo,
      // KPIs
      ingresosTotales: ingresosTotales || 0,
      porcentajeCrecimiento: calcularCrecimiento(ingresosPorMes),
      trabajosCompletados: trabajosCompletados || 0,
      ticketPromedio: ticketPromedio || 0,
      clientesActivos: clientesActivos || 0,
      // Datos para gráficos
      meses: ingresosPorMes.map(m => m.mes),
      ingresosPorMes: ingresosPorMes.map(m => m.total),
      proyeccionIngresos: calcularProyeccion(ingresosPorMes),
      categorias,
      topClientes,
      serviciosFrecuentes,
      zonasClientes,
      trabajosPorDia,
      estadosInfo,
      // Proyecciones
      proyeccionMensual: proyecciones.mensual || 0,
      crecimientoEsperado: proyecciones.crecimiento || 0,
      categoriaEnCrecimiento: proyecciones.categoriaTop || 'N/A'
    });
  } catch (error) {
    console.error('Error en análisis:', error);
    res.status(500).send('Error al cargar análisis: ' + error.message);
  }
};

// Funciones auxiliares
function getFechaInicio(periodo) {
  switch(periodo) {
    case 'mes':
      return moment().startOf('month').format('YYYY-MM-DD');
    case 'trimestre':
      return moment().startOf('quarter').format('YYYY-MM-DD');
    case 'año':
      return moment().startOf('year').format('YYYY-MM-DD');
    default:
      return moment().startOf('month').format('YYYY-MM-DD');
  }
}

function getIngresosTotales(fechaInicio, fechaFin) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT COALESCE(SUM(precio), 0) as total 
       FROM trabajos 
       WHERE date(fechaIngreso) BETWEEN date(?) AND date(?)
       AND precio > 0`,
      [fechaInicio, fechaFin],
      (err, row) => {
        if (err) {
          console.error('Error en ingresos totales:', err);
          resolve(0);
        } else {
          resolve(row?.total || 0);
        }
      }
    );
  });
}

function getTrabajosCompletados(fechaInicio, fechaFin) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT COUNT(*) as total 
       FROM trabajos 
       WHERE date(fechaIngreso) BETWEEN date(?) AND date(?)`,
      [fechaInicio, fechaFin],
      (err, row) => {
        if (err) {
          console.error('Error en trabajos completados:', err);
          resolve(0);
        } else {
          resolve(row?.total || 0);
        }
      }
    );
  });
}

function getTicketPromedio(fechaInicio, fechaFin) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT AVG(precio) as promedio 
       FROM trabajos 
       WHERE date(fechaIngreso) BETWEEN date(?) AND date(?)
       AND precio > 0`,
      [fechaInicio, fechaFin],
      (err, row) => {
        if (err) {
          console.error('Error en ticket promedio:', err);
          resolve(0);
        } else {
          resolve(Math.round(row?.promedio || 0));
        }
      }
    );
  });
}

function getClientesActivos(fechaInicio, fechaFin) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT COUNT(DISTINCT cliente_id) as total 
       FROM trabajos 
       WHERE date(fechaIngreso) BETWEEN date(?) AND date(?)`,
      [fechaInicio, fechaFin],
      (err, row) => {
        if (err) {
          console.error('Error en clientes activos:', err);
          resolve(0);
        } else {
          resolve(row?.total || 0);
        }
      }
    );
  });
}

function getIngresosPorMes() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT 
        strftime('%Y-%m', fechaIngreso) as mes,
        COALESCE(SUM(precio), 0) as total
       FROM trabajos
       WHERE fechaIngreso >= date('now', '-12 months')
       AND precio > 0
       GROUP BY mes
       ORDER BY mes`,
      [],
      (err, rows) => {
        if (err) {
          console.error('Error en ingresos por mes:', err);
          resolve([]);
        } else {
          // Llenar meses faltantes con 0
          const mesesCompletos = [];
          for (let i = 11; i >= 0; i--) {
            const mes = moment().subtract(i, 'months');
            const mesStr = mes.format('YYYY-MM');
            const data = rows.find(r => r.mes === mesStr);
            mesesCompletos.push({
              mes: mes.format('MMM YYYY'),
              total: data ? data.total : 0
            });
          }
          console.log('Meses completos:', mesesCompletos);
          resolve(mesesCompletos);
        }
      }
    );
  });
}

function getCategoriaStats() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT 
        c.id,
        c.nombre,
        c.icono,
        COUNT(t.id) as cantidad,
        COALESCE(SUM(t.precio), 0) as total
       FROM categorias c
       LEFT JOIN trabajos t ON c.id = t.categoria_id
       GROUP BY c.id, c.nombre, c.icono
       ORDER BY total DESC`,
      [],
      (err, rows) => {
        if (err) {
          console.error('Error en categorías:', err);
          resolve([]);
        } else {
          // Filtrar solo categorías con trabajos
          const categoriasConDatos = rows.filter(cat => cat.total > 0);
          console.log('Categorías con datos:', categoriasConDatos);
          resolve(categoriasConDatos);
        }
      }
    );
  });
}

function getTopClientes() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT 
        c.id,
        c.nombre,
        COUNT(t.id) as cantidad_trabajos,
        COALESCE(SUM(t.precio), 0) as total_ingresos
       FROM clientes c
       INNER JOIN trabajos t ON c.id = t.cliente_id
       WHERE t.precio > 0
       GROUP BY c.id, c.nombre
       HAVING total_ingresos > 0
       ORDER BY total_ingresos DESC
       LIMIT 10`,
      [],
      (err, rows) => {
        if (err) {
          console.error('Error en top clientes:', err);
          resolve([]);
        } else {
          // Calcular porcentajes
          const totalGeneral = rows.reduce((sum, cliente) => sum + cliente.total_ingresos, 0);
          const clientesConPorcentaje = rows.map(cliente => ({
            ...cliente,
            porcentaje: totalGeneral > 0 ? Math.round((cliente.total_ingresos / totalGeneral) * 100 * 10) / 10 : 0
          }));
          resolve(clientesConPorcentaje);
        }
      }
    );
  });
}

function getServiciosFrecuentes() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT 
        descripcion,
        COUNT(*) as cantidad
       FROM trabajos
       WHERE descripcion IS NOT NULL AND descripcion != ''
       GROUP BY descripcion
       ORDER BY cantidad DESC
       LIMIT 10`,
      [],
      (err, rows) => {
        if (err) {
          console.error('Error en servicios frecuentes:', err);
          resolve([]);
        } else {
          console.log('Servicios frecuentes:', rows);
          resolve(rows || []);
        }
      }
    );
  });
}

function getZonasClientes() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT 
        COALESCE(direccion, 'Sin dirección') as direccion,
        COUNT(*) as cantidad
       FROM clientes
       WHERE direccion IS NOT NULL AND direccion != ''
       GROUP BY direccion
       ORDER BY cantidad DESC
       LIMIT 10`,
      [],
      (err, rows) => {
        if (err) {
          console.error('Error en zonas:', err);
          resolve([]);
        } else {
          resolve(rows || []);
        }
      }
    );
  });
}

function getTrabajosPorDia() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT 
        CASE cast(strftime('%w', fechaIngreso) as integer)
          WHEN 0 THEN 7
          WHEN 1 THEN 1
          WHEN 2 THEN 2
          WHEN 3 THEN 3
          WHEN 4 THEN 4
          WHEN 5 THEN 5
          WHEN 6 THEN 6
        END as dia_semana,
        COUNT(*) as cantidad
       FROM trabajos
       WHERE fechaIngreso >= date('now', '-3 months')
       AND fechaIngreso IS NOT NULL
       GROUP BY dia_semana
       ORDER BY dia_semana`,
      [],
      (err, rows) => {
        if (err) {
          console.error('Error en trabajos por día:', err);
          resolve([0,0,0,0,0,0,0]);
        } else {
          // Crear array con todos los días
          const diasCompletos = [1,2,3,4,5,6,7].map(dia => {
            const encontrado = rows.find(r => r.dia_semana === dia);
            return encontrado ? encontrado.cantidad : 0;
          });
          console.log('Trabajos por día:', diasCompletos);
          resolve(diasCompletos);
        }
      }
    );
  });
}

function getEstadosInfo() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT 
        e.id,
        e.nombre,
        e.color,
        e.icono,
        COUNT(t.id) as cantidad
       FROM estados e
       LEFT JOIN trabajos t ON e.id = t.estado_id
       GROUP BY e.id, e.nombre, e.color, e.icono
       ORDER BY e.id`,
      [],
      (err, rows) => {
        if (err) {
          console.error('Error obteniendo estados:', err);
          resolve([]);
        } else {
          resolve(rows || []);
        }
      }
    );
  });
}

function getProyecciones() {
  return new Promise(async (resolve, reject) => {
    try {
      const historico = await getIngresosPorMes();
      
      if (historico.length === 0) {
        resolve({
          mensual: 0,
          crecimiento: 0,
          categoriaTop: 'Sin datos'
        });
        return;
      }
      
      // Filtrar solo meses con datos
      const mesesConDatos = historico.filter(mes => mes.total > 0);
      
      if (mesesConDatos.length === 0) {
        resolve({
          mensual: 0,
          crecimiento: 0,
          categoriaTop: 'Sin datos'
        });
        return;
      }
      
      const promedioMensual = mesesConDatos.reduce((sum, mes) => sum + mes.total, 0) / mesesConDatos.length;
      const ultimosTresMeses = mesesConDatos.slice(-3);
      const tendencia = ultimosTresMeses.length > 0 
        ? ultimosTresMeses.reduce((sum, mes) => sum + mes.total, 0) / ultimosTresMeses.length
        : promedioMensual;
      
      const crecimiento = promedioMensual > 0 
        ? ((tendencia - promedioMensual) / promedioMensual * 100).toFixed(1)
        : 0;
      
      const categoriaTop = await getCategoriaEnCrecimiento();
      
      resolve({
        mensual: Math.round(tendencia * 1.1),
        crecimiento: crecimiento > 0 ? crecimiento : 5,
        categoriaTop: categoriaTop || 'Sin datos'
      });
    } catch (error) {
      console.error('Error en proyecciones:', error);
      resolve({
        mensual: 0,
        crecimiento: 0,
        categoriaTop: 'Sin datos'
      });
    }
  });
}

function getCategoriaEnCrecimiento() {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT c.nombre
       FROM categorias c
       INNER JOIN trabajos t ON c.id = t.categoria_id
       WHERE t.fechaIngreso >= date('now', '-3 months')
       GROUP BY c.id, c.nombre
       ORDER BY COUNT(t.id) DESC
       LIMIT 1`,
      [],
      (err, row) => {
                if (err) {
          console.error('Error en categoría en crecimiento:', err);
          resolve(null);
        } else {
          resolve(row?.nombre);
        }
      }
    );
  });
}

function calcularCrecimiento(ingresosPorMes) {
  if (ingresosPorMes.length < 2) return 0;
  
  // Buscar los últimos dos meses con datos
  const mesesConDatos = ingresosPorMes.filter(mes => mes.total > 0);
  if (mesesConDatos.length < 2) return 0;
  
  const actual = mesesConDatos[mesesConDatos.length - 1].total;
  const anterior = mesesConDatos[mesesConDatos.length - 2].total;
  
  if (anterior === 0) return actual > 0 ? 100 : 0;
  
  return Math.round(((actual - anterior) / anterior) * 100);
}

function calcularProyeccion(ingresosPorMes) {
  if (ingresosPorMes.length === 0) {
    return [0, 0, 0];
  }
  
  // Obtener solo meses con datos
  const mesesConDatos = ingresosPorMes.filter(mes => mes.total > 0);
  
  if (mesesConDatos.length === 0) {
    return [...ingresosPorMes.map(m => m.total), 0, 0, 0];
  }
  
  const ultimos3 = mesesConDatos.slice(-3);
  const promedio = ultimos3.reduce((sum, mes) => sum + mes.total, 0) / ultimos3.length;
  
  // Agregar proyección solo para los próximos 3 meses
  const proyeccion = [...ingresosPorMes.map(m => m.total)];
  
  // Solo agregar proyección si estamos mostrando los últimos meses
  if (ingresosPorMes.length >= 12) {
    proyeccion.push(Math.round(promedio * 1.05));
    proyeccion.push(Math.round(promedio * 1.08));
    proyeccion.push(Math.round(promedio * 1.10));
  }
  
  return proyeccion;
}

// Endpoints API
exports.getIngresosPorPeriodo = async (req, res) => {
  try {
    const periodo = req.params.periodo;
    const fechaInicio = getFechaInicio(periodo);
    const fechaFin = moment().format('YYYY-MM-DD');
    
    const total = await getIngresosTotales(fechaInicio, fechaFin);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTopClientes = async (req, res) => {
  try {
    const clientes = await getTopClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getServiciosFrecuentes = async (req, res) => {
  try {
    const servicios = await getServiciosFrecuentes();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProyecciones = async (req, res) => {
  try {
    const proyecciones = await getProyecciones();
    res.json(proyecciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = exports;