const path = require('path');

module.exports = {
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    client: {
      overlay: false,
    },
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const isEnvProduction = env === 'production';
      const isEnvDevelopment = env === 'development';

      console.log(`🔧 Configuring webpack for ${env} environment...`);

      // Handle entry points
      const entry = typeof webpackConfig.entry === 'string' 
        ? { main: webpackConfig.entry }
        : Array.isArray(webpackConfig.entry)
        ? { main: webpackConfig.entry }
        : webpackConfig.entry;
      
      // Add background script as separate entry
      webpackConfig.entry = {
        ...entry,
        background: './src/background.ts',
      };

      console.log('📦 Entry points:', Object.keys(webpackConfig.entry));
      
      // Configure output
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'build'),
        filename: (pathData) => {
          // Put background.js in root of build folder
          if (pathData.chunk.name === 'background') {
            return 'background.js';
          }
          // Main app goes to static/js
          return isEnvProduction
            ? 'static/js/[name].[contenthash:8].js'
            : 'static/js/[name].js';
        },
        chunkFilename: isEnvProduction
          ? 'static/js/[name].[contenthash:8].chunk.js'
          : 'static/js/[name].chunk.js',
      };
      
      // CRITICAL: Disable inline runtime chunk for Chrome extension CSP compliance
      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        runtimeChunk: false, // Changed from 'single' to false
        splitChunks: {
          ...webpackConfig.optimization.splitChunks,
          cacheGroups: {
            ...webpackConfig.optimization.splitChunks?.cacheGroups,
            // Ensure background is a single file
            backgroundVendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'background',
              chunks: (chunk) => chunk.name === 'background',
              enforce: true,
              priority: 20,
            },
          },
        },
      };

      // Remove inline script injection from HtmlWebpackPlugin
      const htmlWebpackPlugin = webpackConfig.plugins.find(
        plugin => plugin.constructor.name === 'HtmlWebpackPlugin'
      );
      
      if (htmlWebpackPlugin) {
        htmlWebpackPlugin.userOptions = {
          ...htmlWebpackPlugin.userOptions,
          inject: true,
          // Prevent inline scripts
          scriptLoading: 'defer',
        };
      }

      console.log('✅ Webpack configuration complete');
      
      return webpackConfig;
    },
  },
};