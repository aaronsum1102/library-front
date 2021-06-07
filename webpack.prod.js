const path = require('path');
const webpack = require('webpack');
const SubResourceIntegrityPlugin = require('webpack-subresource-integrity');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

const REPORTS_FOLDER = path.resolve(__dirname, 'build/reports/bundle-analyzer');

const prod = {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    ...common.output,
    chunkFilename: '[contenthash:8].chunk.js',
    filename: '[contenthash:8].js'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new SubResourceIntegrityPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: (entry) =>
        path.resolve(REPORTS_FOLDER, `build-report-${Date.now()}-${entry}.html`)
    })
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
