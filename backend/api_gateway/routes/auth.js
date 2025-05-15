const express = require('express');
const proxyService = require('../services/proxyService');
const authController = require('../controllers/authController');
const { AUTH, SAGAS } = require('../config/services');

const loginRouter = express.Router();
loginRouter.post('/', authController.getLoginWithCustomer);

const logoutRouter = express.Router();
logoutRouter.post('/', proxyService(AUTH, '/logout'));

module.exports = { 
    loginRouter, 
    logoutRouter 
};
