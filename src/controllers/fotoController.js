// src/controllers/fotoController.js

const db = require('../config/db');
const {
  uploadFileToDriveOAuth,
  createDriveFolder,
  deleteDriveFile,
  renameDriveFile,
  isDriveConnected
} = require('../utils/drive_oauth');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const { FOLDER_ID } = require('../utils/folder_id');

async function processImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.heic' || ext === '.heif') {
    const newPath = filePath.replace(/\.(heic|heif)$/i, '.jpg');
    await sharp(filePath)
      .jpeg()
      .toFile(newPath);
    fs.unlinkSync(filePath);
    return newPath;
  }
  return filePath;
}

// Mostrar la gestión de fotos
exports.gestionarFotos = (req, res) => {
  db.get('SELECT * FROM trabajos WHERE id = ?', [req.params.id], (err, trabajo) => {
    if (!trabajo) return res.status(404).send('Trabajo no encontrado');
    db.all('SELECT * FROM imagenes WHERE trabajo_id = ?', [trabajo.id], (err, imagenes) => {
      trabajo.imagenes = imagenes || [];
      res.render('trabajos/fotos', { title: 'Gestionar Fotos', trabajo });
    });
  });
};

// Subir fotos
exports.subirFotos = async (req, res) => {
  db.get('SELECT * FROM trabajos WHERE id = ?', [req.params.id], async (err, trabajo) => {
    if (!trabajo) return res.status(404).json({ ok: false, error: 'Trabajo no encontrado' });
    let carpetaDriveId = trabajo.carpetaDriveId;
    if (!carpetaDriveId && isDriveConnected()) {
      const folder = await createDriveFolder(`Trabajo_${trabajo.id}`, FOLDER_ID);
      carpetaDriveId = folder.id;
      db.run('UPDATE trabajos SET carpetaDriveId = ? WHERE id = ?', [carpetaDriveId, trabajo.id]);
    }
    let nuevas = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        let processedPath = file.path;
        try {
          processedPath = await processImage(file.path);
          const driveFile = await uploadFileToDriveOAuth(processedPath, file.originalname, carpetaDriveId);
          const directLink = `https://drive.google.com/uc?id=${driveFile.id}`;
          db.run(
            'INSERT INTO imagenes (trabajo_id, url, nombre, driveId) VALUES (?, ?, ?, ?)',
            [trabajo.id, directLink, file.originalname, driveFile.id]
          );
          nuevas.push({ url: directLink, nombre: file.originalname, driveId: driveFile.id });
        } catch (e) {
          // Puedes loggear el error si quieres
        } finally {
          // Siempre elimina el archivo temporal
          if (fs.existsSync(processedPath)) {
            fs.unlinkSync(processedPath);
          }
        }
      }
    }
    db.all('SELECT * FROM imagenes WHERE trabajo_id = ?', [trabajo.id], (err, imagenes) => {
      res.json({ imagenes: imagenes || [] });
    });
  });
};

// Eliminar foto
exports.eliminarFoto = (req, res) => {
  const { driveId } = req.body;
  if (!driveId) {
    return res.status(400).json({ ok: false, error: 'No se recibió el ID del archivo de Drive.' });
  }
  db.get('SELECT * FROM imagenes WHERE driveId = ?', [driveId], async (err, imagen) => {
    if (!imagen) return res.status(404).json({ ok: false, error: 'Imagen no encontrada' });
    await deleteDriveFile(driveId);
    db.run('DELETE FROM imagenes WHERE driveId = ?', [driveId], () => {
      res.json({ ok: true });
    });
  });
};

// Renombrar foto
exports.renombrarFoto = (req, res) => {
  const { driveId, nombre } = req.body;
  db.get('SELECT * FROM imagenes WHERE driveId = ?', [driveId], async (err, imagen) => {
    if (!imagen) return res.json({ ok: false });
    await renameDriveFile(driveId, nombre);
    db.run('UPDATE imagenes SET nombre = ? WHERE driveId = ?', [nombre, driveId], () => {
      res.json({ ok: true });
    });
  });
};

// Eliminar carpeta de Drive y todas las fotos
exports.eliminarCarpetaDrive = (req, res) => {
  db.get('SELECT * FROM trabajos WHERE id = ?', [req.params.id], async (err, trabajo) => {
    if (trabajo && trabajo.carpetaDriveId) {
      const oAuth2Client = require('../utils/drive_oauth').getSavedOAuth2Client();
      const drive = require('googleapis').google.drive({ version: 'v3', auth: oAuth2Client });
      await drive.files.delete({ fileId: trabajo.carpetaDriveId });
      db.run('DELETE FROM imagenes WHERE trabajo_id = ?', [trabajo.id]);
      db.run('UPDATE trabajos SET carpetaDriveId = NULL WHERE id = ?', [trabajo.id]);
      return res.json({ ok: true });
    }
    res.json({ ok: false });
  });
};