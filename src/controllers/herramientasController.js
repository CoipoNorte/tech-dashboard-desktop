// src/controllers/herramientasController.js

const Cliente = require('../models/Cliente');
const Trabajo = require('../models/Trabajo');
const { Parser } = require('json2csv');
const XLSX = require('xlsx');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

exports.vista = (req, res) => {
  res.render('herramientas', { title: 'Herramientas', dbStats: null });
};

exports.exportar = (req, res) => {
  const tipo = req.query.tipo || 'csv';
  Cliente.getAll((err, clientes) => {
    Trabajo.getAll((err, trabajos) => {
      if (tipo === 'excel') {
        const wb = XLSX.utils.book_new();
        const wsClientes = XLSX.utils.json_to_sheet(clientes);
        const wsTrabajos = XLSX.utils.json_to_sheet(trabajos);
        XLSX.utils.book_append_sheet(wb, wsClientes, 'Clientes');
        XLSX.utils.book_append_sheet(wb, wsTrabajos, 'Trabajos');
        const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
        res.setHeader('Content-Disposition', 'attachment; filename=datos.jp.xlsx');
        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        return res.send(buffer);
      } else {
        const parserClientes = new Parser({
          fields: clientes.length ? Object.keys(clientes[0]) : ['id', 'nombre', 'telefono', 'email', 'direccion', 'observaciones', 'fechaCreacion']
        });
        const parserTrabajos = new Parser({
          fields: trabajos.length ? Object.keys(trabajos[0]) : ['id', 'cliente_id', 'descripcion', 'observaciones', 'precio', 'fechaIngreso', 'fechaEntrega', 'imagenes', 'carpetaDriveId', 'categoria_id', 'estado_id', 'urgencia_id']
        });
        const csvClientes = parserClientes.parse(clientes);
        const csvTrabajos = parserTrabajos.parse(trabajos);

        res.setHeader('Content-Disposition', 'attachment; filename=datos.jp.zip');
        res.type('application/zip');
        const archive = archiver('zip');
        archive.pipe(res);
        archive.append(csvClientes, { name: 'clientes.csv' });
        archive.append(csvTrabajos, { name: 'trabajos.csv' });
        archive.finalize();
      }
    });
  });
};

exports.importar = (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false, msg: 'No se subió archivo.' });
  const ext = path.extname(req.file.originalname).toLowerCase();
  const tipo = req.body.tipo; // 'clientes', 'trabajos', 'ambos'
  let clientes = [], trabajos = [];
  try {
    const XLSX = require('xlsx');
    if (ext === '.xlsx' || ext === '.xls') {
      const wb = XLSX.readFile(req.file.path);
      if (tipo === 'clientes' || tipo === 'ambos') {
        clientes = XLSX.utils.sheet_to_json(wb.Sheets['Clientes'] || wb.Sheets[wb.SheetNames[0]]);
      }
      if (tipo === 'trabajos' || tipo === 'ambos') {
        trabajos = XLSX.utils.sheet_to_json(wb.Sheets['Trabajos'] || wb.Sheets[wb.SheetNames[1]]);
      }
    } else if (ext === '.csv' || ext === '.zip') {
      if (ext === '.zip') {
        const AdmZip = require('adm-zip');
        const zip = new AdmZip(req.file.path);
        const entries = zip.getEntries();
        entries.forEach(entry => {
          if (entry.entryName === 'clientes.csv' && (tipo === 'clientes' || tipo === 'ambos')) {
            const csv = entry.getData().toString('utf8');
            clientes = XLSX.utils.sheet_to_json(XLSX.utils.csv_to_sheet(csv));
          }
          if (entry.entryName === 'trabajos.csv' && (tipo === 'trabajos' || tipo === 'ambos')) {
            const csv = entry.getData().toString('utf8');
            trabajos = XLSX.utils.sheet_to_json(XLSX.utils.csv_to_sheet(csv));
          }
        });
      } else {
        const content = fs.readFileSync(req.file.path, 'utf8');
        if (tipo === 'clientes') {
          const wb = XLSX.read(content, { type: 'string' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          clientes = XLSX.utils.sheet_to_json(ws);
        } else if (tipo === 'trabajos') {
          const wb = XLSX.read(content, { type: 'string' });
          const ws = wb.Sheets[wb.SheetNames[0]];
          trabajos = XLSX.utils.sheet_to_json(ws);
        }
      }
    }

    // 1. Importa clientes primero
    if (clientes.length && (tipo === 'clientes' || tipo === 'ambos')) {
      db.run('DELETE FROM clientes', [], () => {
        clientes.forEach(c => {
          db.run(
            'INSERT INTO clientes (nombre, telefono, email, direccion, observaciones, fechaCreacion) VALUES (?, ?, ?, ?, ?, ?)',
            [c.nombre, c.telefono, c.email, c.direccion, c.observaciones, c.fechaCreacion || new Date().toISOString()],
            () => {}
          );
        });
      });
    }

    // 2. Luego importa trabajos
    if (trabajos.length && (tipo === 'trabajos' || tipo === 'ambos')) {
      db.run('DELETE FROM trabajos', [], () => {
        trabajos.forEach(t => {
          db.run(
            `INSERT INTO trabajos (cliente_id, descripcion, observaciones, precio, fechaIngreso, fechaEntrega, carpetaDriveId, categoria_id, estado_id, urgencia_id)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              t.cliente_id || t.cliente, // asegúrate de que el campo es correcto
              t.descripcion,
              t.observaciones,
              t.precio,
              t.fechaIngreso,
              t.fechaEntrega,
              t.carpetaDriveId,
              t.categoria_id || t.categoria,
              t.estado_id || t.estado,
              t.urgencia_id || t.urgencia
            ],
            () => {}
          );
        });
      });
    }

    fs.unlinkSync(req.file.path);
    return res.json({ ok: true });
  } catch (e) {
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    return res.status(500).json({ ok: false, msg: 'Error al importar: ' + e.message });
  }
};

exports.vaciar = (req, res) => {
  const tipo = req.body.tipo; // 'clientes', 'trabajos', 'ambos'
  if (tipo === 'clientes') {
    db.run('DELETE FROM clientes', [], () => res.json({ ok: true }));
    return;
  }
  if (tipo === 'trabajos') {
    db.run('DELETE FROM trabajos', [], () => res.json({ ok: true }));
    return;
  }
  // ambos
  db.run('DELETE FROM clientes', [], () => {
    db.run('DELETE FROM trabajos', [], () => res.json({ ok: true }));
  });
};
