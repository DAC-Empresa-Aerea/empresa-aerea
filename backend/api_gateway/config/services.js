require('dotenv-safe').config();

module.exports = {
    AUTH: "http://localhost:" + process.env.MS_AUTH_PORT || 'http://localhost:8081',
    CUSTOMER: "http://localhost:" + process.env.MS_CUSTOMER_PORT || 'http://localhost:8082',
    EMPLOYEE: "http://localhost:" + process.env.MS_EMPLOYEE_PORT || 'http://localhost:8083',
    FLIGHT: "http://localhost:" + process.env.MS_FLIGHTS_PORT || 'http://localhost:8084',
    RESERVATION: "http://localhost:" + process.env.MS_RESERVE_PORT || 'http://localhost:8085',
    SAGAS: "http://localhost:" + process.env.SAGAS_PORT|| 'http://localhost:8087',
};
  