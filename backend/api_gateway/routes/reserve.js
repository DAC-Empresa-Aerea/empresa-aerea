const express = require('express');
const reservationController = require('../controllers/reserveController');

const router = express.Router();

router.get('/:id', reservationController.getReservationWithFlight);
router.patch('/:id/estado', reservationController.proxyGetByCode);

router.post('/', reservationController.proxyToSagas);

// composição: (se precisar)
// router.get('/:codigo/detalhes', reservationController.getReservationWithFlight);

module.exports = router;
