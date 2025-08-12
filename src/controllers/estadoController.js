// src/controllers/estadoController.js

const Estado = require('../models/Estado');

// Listar estados
exports.listar = (req, res) => {
  Estado.getAll((err, estados) => {
    if (err) return res.status(500).send('Error en la base de datos');
    res.render('estados/index', { title: 'Estados', estados });
  });
};

// Formulario para nuevo estado
exports.formNuevo = (req, res) => {
  res.render('estados/form', { title: 'Nuevo Estado', estado: {}, action: '/estados', method: 'POST' });
};

// Crear estado
exports.crear = (req, res) => {
  Estado.create(req.body, (err) => {
    if (err) return res.status(500).send('Error al crear estado');
    res.redirect('/estados');
  });
};

// Formulario para editar estado
exports.formEditar = (req, res) => {
  Estado.getById(req.params.id, (err, estado) => {
    if (!estado) return res.redirect('/estados');
    res.render('estados/form', { title: 'Editar Estado', estado, action: `/estados/${estado.id}`, method: 'POST' });
  });
};

// Editar estado
exports.editar = (req, res) => {
  Estado.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send('Error al editar estado');
    res.redirect('/estados');
  });
};

// Eliminar estado
exports.eliminar = (req, res) => {
  Estado.delete(req.params.id, (err) => {
    if (err) return res.status(500).send('Error al eliminar estado');
    res.redirect('/estados');
  });
};