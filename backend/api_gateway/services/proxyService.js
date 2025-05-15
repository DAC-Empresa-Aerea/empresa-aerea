const proxy = require('express-http-proxy');
const createError = require('http-errors');

module.exports = (host, basePath) => {
  return proxy(host, {
    proxyReqPathResolver: req => {
      console.log(`Proxying request to ${host}${basePath}`);
      const suffix = req.url === '/' ? '' : req.url;
      const upstreamPath = basePath + suffix;
      return upstreamPath;
    },
    proxyErrorHandler: (err, res, next) => {
      console.error("Proxy error:", err);
      next(createError(err.status, "Proxy encountered an error"));
    },
  });
};
