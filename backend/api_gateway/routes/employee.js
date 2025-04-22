const express = require('express');
const proxyService = require('../services/proxyService');
const { EMPLOYEE } = require('../config/services');

const router = express.Router();
router.use('/', proxyService(EMPLOYEE, '/funcionarios'));
module.exports = router;
