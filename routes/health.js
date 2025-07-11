const express = require('express');
const router = express.Router();
const { saveHealthData, getHealthData } = require('../controllers/healthController');

// POST /api/health - Save health data
router.post('/', saveHealthData);

// GET /api/health - Get all health data
router.get('/', getHealthData);

module.exports = router;
