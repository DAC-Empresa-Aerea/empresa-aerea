const express = require('express');
const customerController = require('../controllers/customerController');

const router = express.Router();

router.use('/', customerController.proxy);

router.get('/:id/reservas', customerController.getCustomerReservations);

module.exports = router;