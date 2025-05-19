const express = require('express');
const proxyService = require('../services/proxyService');
const { EMPLOYEE, SAGAS } = require('../config/services');
const authenticateJWT = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorize');

const AuthorizedRoles = ['FUNCIONARIO'];

const router = express.Router();
router.use(authenticateJWT);
router.use(authorizeRoles(...AuthorizedRoles));

//Futuramente trocar para o SAGAS
router.post('/', proxyService(SAGAS, '/funcionarios'));

router.get('/', 
    proxyService(EMPLOYEE, '/funcionarios')
);

router.get('/:id', (req, res, next) => {
    const urlDestino = `/funcionarios/${req.params.id}`;
    const proxy = proxyService(EMPLOYEE, "/funcionarios");
    return proxy(req, res, next, urlDestino);
});

router.put('/:id', (req, res, next) => {
    const urlDestino = `/funcionarios/${req.params.id}`;
    const proxy = proxyService(SAGAS, "/funcionarios");
    return proxy(req, res, next, urlDestino);
});

router.delete('/:id', (req, res, next) => {
    const urlDestino = `/funcionarios/${req.params.id}`;
    const proxy = proxyService(SAGAS, "/funcionarios");
    return proxy(req, res, next, urlDestino);
});

module.exports = router;
