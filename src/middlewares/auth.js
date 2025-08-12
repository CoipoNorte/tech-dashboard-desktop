// src/middlewares/auth.js

module.exports.requireLogin = (req, res, next) => {
  if (!req.session || !req.session.usuarioId) {
    return res.redirect('/login');
  }
  next();
};