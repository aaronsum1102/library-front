const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { compilerOptions } = require('./tsconfig.json');

const ENTRY_FILE_NAME = path.resolve('src/app/index.tsx');
const PUBLIC_PATH = '/static/';
const PUBLIC_FOLDER = path.resolve(__dirname, 'src/public');
const BUILD_WEB_FOLDER = path.resolve(__dirname, 'build/public/web');

const plugins = [
  new CopyWebpackPlugin({
    patterns: [
      {
        from: PUBLIC_FOLDER,
        to: BUILD_WEB_FOLDER,
        globOptions: {
          ignore: ['**/index.html'],
          logLevel: 'info'
        },
        noErrorOnMissing: true
      }
    ]
  }),
  new CleanWebpackPlugin({
    cleanStaleWebpackAssets: false,
    cleanOnceBeforeBuildPatterns: [path.join(BUILD_WEB_FOLDER, '**/*'), '!**/*.gitignore']
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(PUBLIC_FOLDER, 'index.html'),
    filename: '../index.html',
    hash: false,
    minify: {
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true
    }
  })
];

const moduleRules = [
  {
    test: /\.(js|jsx|ts|tsx)$/,
    use: {
      loader: 'babel-loader'
    },
    exclude: /node_modules/
  }
];

module.exports = {
  name: 'web',
  target: 'web',
  entry: ENTRY_FILE_NAME,
  output: {
    crossOriginLoading: 'anonymous',
    path: path.join(BUILD_WEB_FOLDER, PUBLIC_PATH),
    publicPath: PUBLIC_PATH
  },
  plugins,
  module: {
    rules: moduleRules
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: compilerOptions.paths
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        reactDom: {
          test: /[\\/]node_modules[\\/]react-dom[\\/]/,
          name: 'vendor1',
          chunks: 'all'
        }
      }
    }
  }
};
