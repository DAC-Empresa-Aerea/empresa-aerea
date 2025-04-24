const express = require('express');
const flightController = require('../controllers/flightController');

const airportRoutes = express.Router();
airportRoutes.use('/', flightController.proxyToAirports);

const flightRoutes = express.Router();
flightRoutes.use('/', flightController.proxyToFlight);

module.exports = {
    airportRoutes,
    flightRoutes,
};
