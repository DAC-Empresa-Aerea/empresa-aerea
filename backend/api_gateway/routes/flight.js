const express = require('express');
const flightController = require('../controllers/flightController');

const airportRoutes = express.Router();
airportRoutes.use('/', flightController.proxyToAirports);

const flightRoutes = express.Router();

flightRoutes.patch('/:id/estado', (req, res, next) => {
    const urlDestino = `/voos/${req.params.id}/status`;
    flightController.proxyToSagasComId(urlDestino, req, res, next);
});

flightRoutes.get('/:id', (req, res, next) => {
    const urlDestino = `/voos/${req.params.id}`;
    flightController.proxyToFlightComId(urlDestino, req, res, next);
});

flightRoutes.use('/', flightController.proxyToFlight);

module.exports = {
    airportRoutes,
    flightRoutes,
};
