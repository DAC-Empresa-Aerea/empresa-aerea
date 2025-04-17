const express = require('express');
const reservationController = require('../controllers/reserveController');

const router = express.Router();

// proxy simples: GET /reservas/:codigo
router.get('/:codigo', reservationController.proxyGetByCode);

// composição: (se precisar)
// router.get('/:codigo/detalhes', reservationController.getReservationWithFlight);

module.exports = router;
