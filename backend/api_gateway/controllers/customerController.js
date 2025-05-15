const proxyService = require('../services/proxyService');
const compositionService = require('../services/compositionService');
const { CUSTOMER } = require('../config/services');

exports.proxy = proxyService(CUSTOMER, '/clientes');

exports.proxyToGetMiles = proxyService(CUSTOMER, '/clientes/:id/milhas');

// composição de reservas do cliente
exports.getCustomerReservations = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservas = await compositionService.listCustomerReservations(id);
    res.json(reservas);
  } catch (err) {
    next(err);
  }
};
