const express = require('express');
const proxyService = require('../services/proxyService');
const customerController = require('../controllers/customerController');
const authenticateJWT = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorize');
const { CUSTOMER, SAGAS } = require('../config/services');

const router = express.Router();

router.post('/', proxyService(SAGAS, '/clientes'));

const secured = express.Router();
secured.use(authenticateJWT);
secured.use(authorizeRoles('CLIENTE','FUNCIONARIO'));

secured.get('/:id/reservas', customerController.getCustomerReservations);
secured.use('/', proxyService(CUSTOMER, '/clientes'));

router.use('/', secured);

module.exports = router;
