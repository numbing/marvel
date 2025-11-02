const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  app.use(
    '/comicvine',
    createProxyMiddleware({
      target: 'https://comicvine.gamespot.com',
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        '^/comicvine': '',
      },
      logLevel: 'warn',
    })
  );
};
