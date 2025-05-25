const webpack = require('webpack');

module.exports = {
  devServer: {
    // Suppress deprecation warnings
    onBeforeSetupMiddleware: undefined,
    onAfterSetupMiddleware: undefined,
  },
  webpack: {
    configure: (webpackConfig) => {
      // Add polyfills for Node.js core modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer/'),
        stream: require.resolve('stream-browserify'),
        vm: require.resolve('vm-browserify'),
        process: require.resolve('process'),
        'process/browser': require.resolve('process/browser.js'),
      };

      // Provide global Buffer for packages that expect it
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        }),
      ];

      return webpackConfig;
    },
  },
};