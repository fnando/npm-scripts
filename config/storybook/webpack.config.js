module.exports = ({ config }) => {
  const webpackConfig = require("@fnando/npm-scripts/config/webpack.config.js")(
    null,
    {},
  );

  return {
    ...config,
    plugins: config.plugins.concat(webpackConfig.plugins),
    resolve: webpackConfig.resolve,
    module: webpackConfig.module,
  };
};
