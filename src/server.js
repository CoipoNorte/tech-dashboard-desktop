// src/server.js

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
const db = require('./config/db');
const { isDriveConnected, getAuthUrl, setCredentialsFromCode, disconnectDrive } = require('./utils/drive_oauth');

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// CSP para imágenes y recursos externos
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
    "img-src 'self' https://drive.google.com https://drive.usercontent.google.com data:; " +
    "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; " +
    "font-src 'self' https://cdn.jsdelivr.net data:; " +
    "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;"
  );
  next();
});

// Sesiones
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para usuario en todas las vistas (SQLite)
app.use((req, res, next) => {
  if (req.session && req.session.usuarioId) {
    db.get('SELECT * FROM usuarios WHERE id = ?', [req.session.usuarioId], (err, usuario) => {
      res.locals.usuario = usuario || null;
      res.locals.tokenExists = isDriveConnected();
      next();
    });
  } else {
    res.locals.usuario = null;
    res.locals.tokenExists = isDriveConnected();
    next();
  }
});

// Middleware de autenticación para rutas protegidas
const { requireLogin } = require('./middlewares/auth');

// Rutas de autenticación Google Drive OAuth2
app.get('/auth/google', (req, res) => {
  const url = getAuthUrl();
  res.redirect(url);
});
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send('No code provided');
  await setCredentialsFromCode(code);
  if (req.session && req.session.usuarioId) {
    res.redirect('/dashboard');
  } else {
    res.redirect('/login');
  }
});
app.get('/disconnect-drive', (req, res) => {
  disconnectDrive();
  res.redirect('/dashboard');
});

// Dashboard protegido y profesional
app.get('/dashboard', requireLogin, (req, res) => {
  db.get('SELECT COUNT(*) as total FROM clientes', [], (err, row) => {
    const totalClientes = row ? row.total : 0;
    db.all('SELECT * FROM categorias', [], (err, categorias) => {
      db.all('SELECT * FROM estados', [], (err, estados) => {
        // Contar trabajos por estado
        const trabajosPorEstado = {};
        db.all('SELECT estado_id, COUNT(*) as total FROM trabajos GROUP BY estado_id', [], (err, rows) => {
          rows.forEach(r => {
            const estado = estados.find(e => e.id === r.estado_id);
            if (estado) trabajosPorEstado[estado.nombre] = r.total;
          });
          // Contar trabajos por categoría
          const trabajosPorCategoria = {};
          db.all('SELECT categoria_id, COUNT(*) as total FROM trabajos GROUP BY categoria_id', [], (err, rowsCat) => {
            rowsCat.forEach(r => {
              const categoria = categorias.find(c => c.id === r.categoria_id);
              if (categoria) trabajosPorCategoria[categoria.nombre] = r.total;
            });
            res.render('dashboard', {
              title: 'Dashboard',
              totalClientes,
              trabajosPorEstado,
              trabajosPorCategoria,
              estados,
              categorias,
              tokenExists: res.locals.tokenExists
            });
          });
        });
      });
    });
  });
});

// Rutas principales
app.use('/', require('./routes/auth'));
app.use('/clientes', require('./routes/clientes'));
app.use('/trabajos', require('./routes/trabajos'));
app.use('/trabajos', require('./routes/fotos'));
app.use('/categorias', require('./routes/categorias'));
app.use('/estados', require('./routes/estados'));
app.use('/usuarios', require('./routes/usuarios'));
app.use('/urgencias', require('./routes/urgencias'));
app.use('/herramientas', require('./routes/herramientas'));

// 404
app.use((req, res) => {
  res.status(404).render('404', { title: 'Página no encontrada' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});