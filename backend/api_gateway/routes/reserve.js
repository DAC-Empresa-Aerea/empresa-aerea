const express = require('express');
const reservationController = require('../controllers/reserveController');
const authenticateJWT = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorize');

const router = express.Router();

router.post(
  '/',
  authenticateJWT,
  authorizeRoles('CLIENTE'),
  reservationController.proxyToSagas
);

router.patch(
  '/:id/estado',
  authenticateJWT,
  reservationController.proxyGetByCode
);


router.get(
  '/:id',
  authenticateJWT,
  reservationController.getReservationWithFlight
);

router.delete(
  '/:id',
  authenticateJWT,
  reservationController.proxyToSagas
);

module.exports = router;
