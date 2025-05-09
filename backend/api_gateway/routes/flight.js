const express = require('express');
const authenticateJWT = require('../middleware/auth');
const authorizeRoles = require('../middleware/authorize');
const flightController = require('../controllers/flightController');

const airportRoutes = express.Router();
airportRoutes.use(authenticateJWT);
airportRoutes.use(authorizeRoles('FUNCIONARIO'));

airportRoutes.use('/', flightController.proxyToAirports);

const flightRoutes = express.Router();
flightRoutes.use(authenticateJWT);
flightRoutes.use(authorizeRoles('FUNCIONARIO'));

flightRoutes.patch('/:id/estado', (req, res, next) => {
    const urlDestino = `/voos/${req.params.id}/status`;
    flightController.proxyToSagasComId(urlDestino, req, res, next);
});

flightRoutes.get('/:id', (req, res, next) => {
    const urlDestino = `/voos/${req.params.id}`;
    flightController.proxyToFlightComId(urlDestino, req, res, next);
});

flightRoutes.use('/', flightController.proxyToFlight);

const getFlightRoute = express.Router();
getFlightRoute.use(authenticateJWT);

getFlightRoute.get('/:id', flightController.proxyToFlight)

module.exports = {
    airportRoutes,
    flightRoutes,
    getFlightRoute
};
