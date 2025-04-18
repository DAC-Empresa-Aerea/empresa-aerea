const proxy = require('express-http-proxy');

module.exports = (host, basePath) => {
  return proxy(host, {
    proxyReqPathResolver: req => {
      const suffix = req.url === '/' ? '' : req.url;
      const upstreamPath = basePath + suffix;
      return upstreamPath;
    },
  });
};
