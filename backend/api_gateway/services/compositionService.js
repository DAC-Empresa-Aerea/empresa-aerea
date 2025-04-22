const axios = require('../utils/axiosInstance');
const { RESERVATION, FLIGHT, AUTH, CUSTOMER } = require('../config/services');

exports.listCustomerReservations = async customerId => {
  // 1) pega as reservas
  const { data: reservas } = await axios.get(
    `${RESERVATION}/reservas?clienteId=${customerId}`
  );

  // 2) busca todos os voos em paralelo
  const withFlights = await Promise.all(
    reservas.map(async r => {
      const { data: voo } = await axios.get(
        `${FLIGHT}/voos/${r.voo.codigo}`
      );
      return { ...r, voo };
    })
  );
  return withFlights;
};

exports.getReservationWithFlight = async codigo => {
  const { data: reserva } = await axios.get(`${RESERVATION}/reservas/${codigo}`);
  const { data: voo } = await axios.get(`${FLIGHT}/voos/${reserva.voo.codigo}`);
  return { ...reserva, voo };
};

exports.getLoginWithCustomer = async (email, password) => {
  const { data: login } = await axios.post(`${AUTH}/login`, {
    login: email,
    senha: password,
  });
  const { data: customer } = await axios.get(`${CUSTOMER}/clientes/email/${email}`);
  login.usuario = customer;
  return login;
}