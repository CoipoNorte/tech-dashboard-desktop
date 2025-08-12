// src/controllers/urgenciaController.js

const Urgencia = require('../models/Urgencia');

// Listar urgencias
exports.listar = (req, res) => {
  Urgencia.getAll((err, urgencias) => {
    if (err) return res.status(500).send('Error en la base de datos');
    res.render('urgencias/index', { title: 'Urgencias', urgencias });
  });
};

// Formulario para nueva urgencia
exports.formNuevo = (req, res) => {
  res.render('urgencias/form', { title: 'Nueva Urgencia', urgencia: {}, action: '/urgencias', method: 'POST' });
};

// Crear urgencia
exports.crear = (req, res) => {
  Urgencia.create(req.body, (err) => {
    if (err) return res.status(500).send('Error al crear urgencia');
    res.redirect('/urgencias');
  });
};

// Formulario para editar urgencia
exports.formEditar = (req, res) => {
  Urgencia.getById(req.params.id, (err, urgencia) => {
    if (!urgencia) return res.redirect('/urgencias');
    res.render('urgencias/form', { title: 'Editar Urgencia', urgencia, action: `/urgencias/${urgencia.id}`, method: 'POST' });
  });
};

// Editar urgencia
exports.editar = (req, res) => {
  Urgencia.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send('Error al editar urgencia');
    res.redirect('/urgencias');
  });
};

// Eliminar urgencia
exports.eliminar = (req, res) => {
  Urgencia.delete(req.params.id, (err) => {
    if (err) return res.status(500).send('Error al eliminar urgencia');
    res.redirect('/urgencias');
  });
};