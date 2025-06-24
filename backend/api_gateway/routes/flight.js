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

flightRoutes.get('/', authorizeRoles('FUNCIONARIO', 'CLIENTE'), (req, res, next) => {
  const { origem, destino } = req.query;
  const dataInicio = req.query['data'] || req.query['inicio'];
  const dataFim = req.query['data-fim'] || req.query['fim'];

  const formatDate = (isoString) => {
    if (!isoString) return undefined;
    return isoString.substring(0, 10);
  };

  const dataInicioFormatada = formatDate(dataInicio);
  const dataFimFormatada = formatDate(dataFim);

  const params = {};
  if (dataInicioFormatada) params.data = dataInicioFormatada;
  if (dataFimFormatada) params['data-fim'] = dataFimFormatada;
  if (origem) params.origem = origem;
  if (destino) params.destino = destino;

  const queryParams = new URLSearchParams(params).toString();

  const rotaCompleta = `?${queryParams}`;

  flightController.proxyToFlightComQuery(rotaCompleta, req, res, next);
});

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

getFlightRoute.get('/:id', flightController.proxyToFlight);

module.exports = {
    airportRoutes,
    flightRoutes,
    getFlightRoute
};
