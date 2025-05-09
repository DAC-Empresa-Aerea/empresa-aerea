
require('dotenv-safe').config();

const {
  MS_AUTH_URL,
  MS_CUSTOMER_URL,
  MS_EMPLOYEE_URL,
  MS_FLIGHT_URL,
  MS_RESERVE_URL,
  MS_SAGA_URL,
} = process.env;

module.exports = {
  AUTH:        MS_AUTH_URL || `http://localhost:8081`,
  CUSTOMER:    MS_CUSTOMER_URL || `http://localhost:8082`,
  EMPLOYEE:    MS_EMPLOYEE_URL || `http://localhost:8083`,
  FLIGHT:      MS_FLIGHT_URL || `http://localhost:8084`,
  RESERVATION: MS_RESERVE_URL || `http://localhost:8085`,
  SAGAS:       MS_SAGA_URL || `http://localhost:8086`,
};
