// src/utils/generate_sql_db.js

const db = require('../config/db');

// Categorias
db.run(`CREATE TABLE IF NOT EXISTS categorias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT UNIQUE NOT NULL,
  icono TEXT DEFAULT 'bi bi-tag'
)`);

// Clientes
db.run(`CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  telefono TEXT,
  email TEXT,
  direccion TEXT,
  observaciones TEXT,
  fechaCreacion TEXT DEFAULT CURRENT_TIMESTAMP
)`);

// Estados
db.run(`CREATE TABLE IF NOT EXISTS estados (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#6c757d',
  icono TEXT DEFAULT 'bi bi-flag'
)`);

// Urgencias
db.run(`CREATE TABLE IF NOT EXISTS urgencias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT '#6c757d',
  icono TEXT DEFAULT 'bi bi-exclamation-circle-fill'
)`);

// Usuarios
db.run(`CREATE TABLE IF NOT EXISTS usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
)`);

// Trabajos
db.run(`CREATE TABLE IF NOT EXISTS trabajos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cliente_id INTEGER NOT NULL,
  descripcion TEXT NOT NULL,
  observaciones TEXT,
  precio REAL DEFAULT 0,
  fechaIngreso TEXT DEFAULT CURRENT_TIMESTAMP,
  fechaEntrega TEXT,
  carpetaDriveId TEXT,
  categoria_id INTEGER NOT NULL,
  estado_id INTEGER NOT NULL,
  urgencia_id INTEGER NOT NULL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (categoria_id) REFERENCES categorias(id),
  FOREIGN KEY (estado_id) REFERENCES estados(id),
  FOREIGN KEY (urgencia_id) REFERENCES urgencias(id)
)`);

// Imagenes asociadas a trabajos
db.run(`CREATE TABLE IF NOT EXISTS imagenes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  trabajo_id INTEGER NOT NULL,
  url TEXT,
  nombre TEXT,
  driveId TEXT,
  FOREIGN KEY (trabajo_id) REFERENCES trabajos(id)
)`);