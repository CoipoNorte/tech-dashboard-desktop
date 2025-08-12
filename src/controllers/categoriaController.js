// src/controllers/categoriaController.js

const Categoria = require('../models/Categoria');

// Listar categorías
exports.listar = (req, res) => {
  Categoria.getAll((err, categorias) => {
    if (err) return res.status(500).send('Error en la base de datos');
    res.render('categorias/index', { title: 'Categorías', categorias });
  });
};

// Formulario para nueva categoría
exports.formNuevo = (req, res) => {
  res.render('categorias/form', { title: 'Nueva Categoría', categoria: {}, action: '/categorias', method: 'POST' });
};

// Crear categoría
exports.crear = (req, res) => {
  Categoria.create(req.body, (err) => {
    if (err) return res.status(500).send('Error al crear categoría');
    res.redirect('/categorias');
  });
};

// Formulario para editar categoría
exports.formEditar = (req, res) => {
  Categoria.getById(req.params.id, (err, categoria) => {
    if (!categoria) return res.redirect('/categorias');
    res.render('categorias/form', { title: 'Editar Categoría', categoria, action: `/categorias/${categoria.id}`, method: 'POST' });
  });
};

// Editar categoría
exports.editar = (req, res) => {
  Categoria.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).send('Error al editar categoría');
    res.redirect('/categorias');
  });
};

// Eliminar categoría
exports.eliminar = (req, res) => {
  Categoria.delete(req.params.id, (err) => {
    if (err) return res.status(500).send('Error al eliminar categoría');
    res.redirect('/categorias');
  });
};