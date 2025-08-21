const express = require('express');
const router = express.Router();
const analisisController = require('../controllers/analisisController');
const { requireLogin } = require('../middlewares/auth');

// Ruta principal del análisis
router.get('/', requireLogin, analisisController.dashboard);

// Rutas para obtener datos específicos (AJAX)
router.get('/api/ingresos/:periodo', requireLogin, analisisController.getIngresosPorPeriodo);
router.get('/api/clientes/top', requireLogin, analisisController.getTopClientes);
router.get('/api/servicios/frecuentes', requireLogin, analisisController.getServiciosFrecuentes);
router.get('/api/proyecciones', requireLogin, analisisController.getProyecciones);

module.exports = router;