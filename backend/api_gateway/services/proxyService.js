const proxy = require('express-http-proxy');

//Host vai ser aqui a URL do MS e basePath um prefixo para o endpoint
// Exemplo: http://localhost:8081 e /clientes
module.exports = (host, basePath) => {
  return proxy(host, {
    proxyReqPathResolver: req => {
      return basePath + req.url;
    }
  });
};
