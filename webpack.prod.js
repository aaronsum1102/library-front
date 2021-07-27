const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');
const { BUILD_REPORTS_FOLDER } = require('./webpack.config');

const prod = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  output: {
    ...common.output,
    chunkFilename: '[name].[contenthash:8].chunk.js',
    filename: '[name].[contenthash:8].js'
  },
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: path.resolve(BUILD_REPORTS_FOLDER, `build-report-${Date.now()}.html`)
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    minimize: true,
    usedExports: true,
    moduleIds: 'deterministic'
  },
  performance: {
    maxEntrypointSize: 800000,
    maxAssetSize: 256000,
    hints: 'warning'
  }
};

module.exports = merge(common, prod);
