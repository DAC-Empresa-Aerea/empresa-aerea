const axios = require('../utils/axiosInstance');
const createError = require('http-errors');
const { RESERVATION, FLIGHT, AUTH, CUSTOMER, EMPLOYEE } = require('../config/services');

//-----------------------Customer-----------------------//

exports.listCustomerReservations = async customerId => {
  try {
    const { data: reservas, status } = await axios.get(
      `${RESERVATION}/reservas?clienteId=${customerId}`
    );

    if (status === 204) {
      return [];
    }

    const withFlights = await Promise.all(
      reservas.map(async r => {
        const { data: voo } = await axios.get(
          `${FLIGHT}/voos/${r.codigo_voo}`
        );
        console.log(voo);
        return { ...r, voo };
      })
    );
    
    return withFlights;
  }
  catch (err) {
    console.log(err);
    if (err.response) {
      const { status, data } = err.response;
      throw createError(status, data.message || 'Erro ao buscar reservas do cliente');
    }

    throw createError(500, 'Erro interno ao buscar reservas do cliente');
  }
};

exports.getCustomerMilesWithTransitions = async customerId => {
  try {
    const { data: milhas } = await axios.get(`${CUSTOMER}/clientes/${customerId}/milhas`);
    const { data: transacoes } = await axios.get(`${CUSTOMER}/clientes/${customerId}/transacoes`);

    return { cliente, milhas, transacoes };
  }
  catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      throw createError(status, data.message || 'Erro ao buscar milhas do cliente');
    }

    throw createError(500, 'Erro interno ao buscar milhas do cliente');
  }
}

//-----------------------Reserve-----------------------//

exports.getReservationWithFlight = async codigo => {
  try {
    const { data: reserva, status, } = await axios.get(`${RESERVATION}/reservas/${codigo}`);
    const { data: voo } = await axios.get(`${FLIGHT}/voos/${reserva.codigo_voo}`);
    reserva.voo = voo;
    delete reserva.codigo_voo;
    return reserva;
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      throw createError(status, data.message || 'Erro ao buscar reserva');
    }

    throw createError(500, 'Erro interno ao buscar reserva');
  }
};


//-----------------------Auth-----------------------//

exports.getLoginWithUser = async (email, password) => {
  try {
    const { data: login } = await axios.post(`${AUTH}/login`, {
      login: email,
      senha: password,
    });

    if(login.tipo === "CLIENTE") {
      const { data: customer } = await axios.get(`${CUSTOMER}/clientes/email/${email}`);
      login.usuario = customer;
    }
    else if(login.tipo === "FUNCIONARIO") {
      const { data: funcionario } = await axios.get(`${EMPLOYEE}/funcionarios/email/${email}`);
      login.usuario = funcionario;
    }

    return login;
  }
  catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      throw createError(status, data.message || 'Unauthorized');
    }

    throw createError(500, 'Erro interno ao autenticar');
  }
}