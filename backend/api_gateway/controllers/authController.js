const proxyService = require('../services/proxyService');
const compositionService = require('../services/compositionService');
const { AUTH } = require('../config/services');

exports.proxy = proxyService(AUTH, '/login');

exports.getLoginWithCustomer = async (req, res, next) => {
    try {
        const { login, senha } = req.body;
        console.log('login', login, 'senha', senha);
        const response = await compositionService.getLoginWithCustomer(login, senha);
        res.json(response);
    } catch (err) {
        next(err);
    }
}
