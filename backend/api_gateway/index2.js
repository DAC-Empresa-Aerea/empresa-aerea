require('dotenv-safe').config();

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const proxy = require('express-http-proxy');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

const authServiceProxy = proxy(process.env.MS_AUTH_URL, {
    proxyReqPathResolver: req => req.originalUrl,
    proxyReqOptDecorator: (options, req) => {
        if (req.headers['authorization']) {
            options.headers['authorization'] = req.headers['authorization'];
        }
        return options;
    }
});

const customerServiceProxy = proxy(process.env.MS_CUSTOMER_URL, {
    proxyReqPathResolver: req => req.originalUrl
});

const employeeServiceProxy = proxy(process.env.MS_EMPLOYEE_URL, {
    proxyReqPathResolver: req => req.originalUrl
});

const flightsServiceProxy = proxy(process.env.MS_FLIGHTS_URL, {
    proxyReqPathResolver: req => req.originalUrl,
    proxyReqOptDecorator: (options, req) => {
        options.headers['authorization'] = req.headers['authorization'];
        return options;
    }
});

const reserveServiceProxy = proxy(process.env.MS_RESERVE_URL, {
    proxyReqPathResolver: req => req.originalUrl
});

const sagasServiceProxy = proxy(process.env.SAGAS_URL, {
    proxyReqPathResolver: req => req.originalUrl
});


// ------------------ PUBLIC ------------------

app.post('/clientes', (req, res, next) => {
    customerServiceProxy(req, res, next);
});

app.post('/login', (req, res, next) => {
    authServiceProxy(req, res, next);
});


app.get('/voos', authMiddleware, (req, res, next) => {
    flightsServiceProxy(req, res, next);
});
//-------------------------auth required-----------------------

app.post('/logout', authMiddleware, (req, res, next) => {
    authServiceProxy(req, res, next);
});

app.get('/clientes/:codigoCliente', authMiddleware, (req, res, next) => {
    customerServiceProxy(req, res, next);
});

app.get('/clientes/:codigoCliente/reservas', authMiddleware, (req, res, next) => {
    reserveServiceProxy(req, res, next);
});

app.get('/reservas/:codigoReserva', authMiddleware, (req, res, next) => {
    reserveServiceProxy(req, res, next);
});

app.put('/clientes/:codigoCliente/milhas', authMiddleware, (req, res, next) => {
    reserveServiceProxy(req, res, next);
});

app.get('/clientes/:codigoCliente/milhas', authMiddleware, (req, res, next) => {
    customerServiceProxy(req, res, next);
});

app.get('/voos', authMiddleware, (req, res, next) => {
    flightsServiceProxy(req, res, next);
});

app.post('/reservas', authMiddleware, (req, res, next) => {
    reserveServiceProxy(req, res, next);
});

app.delete('/reservas/:codigoReserva', authMiddleware, (req, res, next) => {
    reserveServiceProxy(req, res, next);
});

app.get('/reservas/:codigoReserva', authMiddleware, (req, res, next) => {
    reserveServiceProxy(req, res, next);
});

app.patch('/reservas/:codigoReserva/estado', authMiddleware, (req, res, next) => {
    reserveServiceProxy(req, res, next);
});

app.patch('/voos/:codigoVoo/estado', authMiddleware, (req, res, next) => {
    reserveServiceProxy(req, res, next);
});

app.post('/voos', authMiddleware, (req, res, next) => {
    flightsServiceProxy(req, res, next);
});

app.get('/aeroportos', authMiddleware, (req, res, next) => {
    flightsServiceProxy(req, res, next);
});

app.get('/voo/:codigoVoo', authMiddleware, (req, res, next) => {
    flightsServiceProxy(req, res, next);
});

app.get('/funcionarios', authMiddleware, (req, res, next) => {
    employeeServiceProxy(req, res, next);
});

app.post('/funcionarios', authMiddleware, (req, res, next) => {
    employeeServiceProxy(req, res, next);
});

app.put('/funcionarios/:codigoFuncionario', authMiddleware, (req, res, next) => {
    employeeServiceProxy(req, res, next);
});

app.delete('/funcionarios/:codigoFuncionario', authMiddleware, (req, res, next) => {
    employeeServiceProxy(req, res, next);
});
//-------------------------server config-----------------------
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Gateway rodando na porta ${PORT}`);
});