const express = require('express');
const proxyService = require('../services/proxyService');
const { EMPLOYEE, SAGAS } = require('../config/services');
const authenticateJWT = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorize');

const AuthorizedRoles = ['FUNCIONARIO'];

const router = express.Router();

//Futuramente trocar para o SAGAS
router.post('/', proxyService(EMPLOYEE, '/funcionarios'));

router.get('/', 
    authenticateJWT,
    authorizeRoles(...AuthorizedRoles),
    proxyService(EMPLOYEE, '/funcionarios')
);

module.exports = router;
