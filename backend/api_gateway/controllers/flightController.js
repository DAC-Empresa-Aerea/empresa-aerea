const proxyService = require('../services/proxyService');
const compositionService = require('../services/compositionService');
const { FLIGHT } = require('../config/services');

exports.proxyToFlight = proxyService(FLIGHT, '/voos');

exports.proxyToAirports = proxyService(FLIGHT, '/aeroportos');