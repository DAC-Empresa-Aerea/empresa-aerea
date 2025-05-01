const express = require('express');
const reservationController = require('../controllers/reserveController');

const router = express.Router();

// proxy simples: GET /reservas/:codigo
router.get('/:id', reservationController.proxyGetByCode);

router.post('/', reservationController.proxyToSagas);

// composição: (se precisar)
// router.get('/:codigo/detalhes', reservationController.getReservationWithFlight);

module.exports = router;
