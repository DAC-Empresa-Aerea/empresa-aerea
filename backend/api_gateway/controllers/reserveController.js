const proxyService = require('../services/proxyService');
const compositionService = require('../services/compositionService');
const { RESERVATION, SAGAS } = require('../config/services');

exports.proxyGetByCode = proxyService(RESERVATION, '/reservas/:id');

exports.proxyToSagas = proxyService(SAGAS, '/reservas');

exports.getReservationWithFlight = async (req, res, next) => {
  try {
    const { codigo } = req.params;
    const reserva = await compositionService.getReservationWithFlight(codigo);
    res.json(reserva);
  } catch (err) {
    next(err);
  }
};
