// src/routes/dashboard.js

const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middlewares/auth');
const dashboardController = require('../controllers/dashboardController');

router.get('/', requireLogin, dashboardController.vista);

module.exports = router;