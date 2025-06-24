const proxy = require('express-http-proxy');
const createError = require('http-errors');

module.exports = (host, basePath) => {
  return proxy(host, {
    proxyReqPathResolver: req => {
      let suffix = req.urlProxy || (req.url === '/' ? '' : req.url);
      if (suffix.startsWith('/')) {
        const isRootWithQuery = suffix === '/' || suffix.startsWith('/?');
        if (isRootWithQuery) {
          suffix = suffix.substring(1);
        }
      }
      const upstreamPath = basePath + suffix;
      console.log(`Proxying request to ${host}${upstreamPath}`);
      return upstreamPath;
    },
  });
};
