const path = require('path');
const DotenvWebpackPlugin = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { compilerOptions } = require('./tsconfig.json');
const {
  PROJECT_FOLDER,
  ENTRY_FILE_NAME,
  PUBLIC_PATH,
  PUBLIC_FOLDER,
  BUILD_WEB_FOLDER,
  TEMPLATE_FILE,
  OUTPUT_PATH
} = require('./webpack.config');

const plugins = [
  new DotenvWebpackPlugin({
    path: path.resolve(PROJECT_FOLDER, '.env'),
    safe: false,
    systemvars: true
  }),
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
    template: TEMPLATE_FILE,
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

const alias = Object.keys(compilerOptions.paths).reduce((result, key) => {
  result[key.replace('/*', '')] = path
    .resolve(PROJECT_FOLDER, compilerOptions.paths[key][0])
    .replace('/*', '');
  return result;
}, {});

module.exports = {
  name: 'web',
  target: 'web',
  entry: ENTRY_FILE_NAME,
  output: {
    crossOriginLoading: 'anonymous',
    path: OUTPUT_PATH,
    publicPath: PUBLIC_PATH
  },
  plugins,
  module: {
    rules: moduleRules
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: alias
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
        },
        materilUi: {
          test: /[\\/]node_modules[\\/]@material-ui[\\/]/,
          name: 'vendor2',
          chunks: 'all'
        },
        firebase: {
          test: /[\\/]node_modules[\\/]@firebase[\\/]/,
          name: 'vendor3',
          chunks: 'all'
        }
      }
    }
  }
};
