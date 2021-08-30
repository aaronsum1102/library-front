const webpack = require('webpack');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');
const { PUBLIC_PATH, BUILD_WEB_FOLDER } = require('./webpack.config');

const dev = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].js'
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    port: 3000,
    static: {
      directory: BUILD_WEB_FOLDER,
      watch: {
        ignored: /node_modules/
      }
    },
    devMiddleware: {
      publicPath: PUBLIC_PATH,
      writeToDisk: true
    }
  },
  optimization: {
    moduleIds: 'named'
  }
};

module.exports = merge(common, dev);
