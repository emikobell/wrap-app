const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/login',
    createProxyMiddleware({
      target: 'http://192.168.1.211:5000',
      changeOrigin: false,
    })
  );
  app.use(
    '/callback',
    createProxyMiddleware({
      target: 'http://192.168.1.211:5000',
      changeOrigin: false,
    })
  );
};