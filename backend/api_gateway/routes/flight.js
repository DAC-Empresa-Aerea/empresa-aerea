const express = require('express');
const proxyService = require('../services/proxyService');
const { FLIGHT } = require('../config/services');

const router = express.Router();
router.use('/', proxyService(FLIGHT, '/voos'));
module.exports = router;
