const express = require('express');
const router = express.Router();
const { getAIResponse } = require('../controllers/aiController');

// POST /api/ai - AI Assistant endpoint
router.post('/', getAIResponse);

module.exports = router;
