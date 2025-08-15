// routes/api.js
const express = require('express');
const router = express.Router();
const patchClientes = require('../helpers/patchClientes');

router.get('/patch-clientes', async (req, res) => {
  try {
    const result = await patchClientes();
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
