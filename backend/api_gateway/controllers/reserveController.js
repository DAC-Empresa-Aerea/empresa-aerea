const proxyService = require('../services/proxyService');
const compositionService = require('../services/compositionService');
const { RESERVATION, SAGAS } = require('../config/services');

exports.proxyGetByCode = proxyService(RESERVATION, '/reservas');

exports.proxyToSagas = proxyService(SAGAS, '/reservas');

exports.getReservationWithFlight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reserva = await compositionService.getReservationWithFlight(id);
    res.json(reserva);
  } catch (err) {
    next(err);
  }
};
