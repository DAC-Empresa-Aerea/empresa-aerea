const proxyService = require('../services/proxyService');
const compositionService = require('../services/compositionService');
const { FLIGHT, SAGAS } = require('../config/services');

exports.proxyToFlight = proxyService(FLIGHT, '/voos');

exports.proxyToFlightComId = (rotaCompleta, req, res, next) => {
    const proxy = proxyService(FLIGHT, "/voos"); 
    return proxy(req, res, next, rotaCompleta);
};

exports.proxyToSagas = proxyService(SAGAS, "/voos");

exports.proxyToSagasComId = (rotaCompleta, req, res, next) => {
    const proxy = proxyService(SAGAS, "/voos"); 
    return proxy(req, res, next, rotaCompleta);
};

exports.proxyToFlightComQuery = (rotaCompleta, req, res, next) => {
  req.urlProxy = rotaCompleta;
  const proxy = proxyService(FLIGHT, '/voos');
  return proxy(req, res, next);
};

exports.proxyToAirports = proxyService(FLIGHT, '/aeroportos');