const withImages = require("next-images");

module.exports = withImages({
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
  poweredByHeader: false,
});
