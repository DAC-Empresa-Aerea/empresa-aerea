const proxy = require('express-http-proxy');

module.exports = (host, basePath) => {
  return proxy(host, {
    proxyReqPathResolver: req => {
      console.log(`Proxying request to ${host}${basePath}`);
      const suffix = req.url === '/' ? '' : req.url;
      const upstreamPath = basePath + suffix;
      return upstreamPath;
    },
  });
};
