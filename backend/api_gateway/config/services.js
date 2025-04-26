
require('dotenv-safe').config();

const {
  MS_AUTH_PORT,
  MS_CUSTOMER_PORT,
  MS_EMPLOYEE_PORT,
  MS_FLIGHT_PORT,
  MS_RESERVE_PORT,
  SAGA_PORT,
} = process.env;

module.exports = {
  AUTH:        `http://localhost:${MS_AUTH_PORT || 8081}`,
  CUSTOMER:    `http://localhost:${MS_CUSTOMER_PORT || 8082}`,
  EMPLOYEE:    `http://localhost:${MS_EMPLOYEE_PORT || 8083}`,
  FLIGHT:      `http://localhost:${MS_FLIGHT_PORT || 8084}`,
  RESERVATION: `http://localhost:${MS_RESERVE_PORT || 8085}`,
  SAGAS:       `http://localhost:${SAGA_PORT || 8087}`,
};
