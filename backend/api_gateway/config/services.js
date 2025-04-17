require('dotenv-safe').config();

module.exports = {
    AUTH: process.env.MS_AUTH_URL || 'http://localhost:8081',
    CUSTOMER: process.env.MS_CUSTOMER_URL || 'http://localhost:8082',
    EMPLOYEE: process.env.MS_EMPLOYEE_URL || 'http://localhost:8083',
    FLIGHT: process.env.MS_FLIGHTS_URL || 'http://localhost:8084',
    RESERVATION: process.env.MS_RESERVE_URL || 'http://localhost:8085',
    SAGAS: process.env.SAGAS_URL|| 'http://localhost:8087',
};
  