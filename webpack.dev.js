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
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()],
  devServer: {
    contentBase: BUILD_WEB_FOLDER,
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    port: 3000,
    publicPath: PUBLIC_PATH,
    watchOptions: {
      ignored: /node_modules/
    },
    writeToDisk: true
  },
  optimization: {
    moduleIds: 'named'
  }
};

module.exports = merge(common, dev);
