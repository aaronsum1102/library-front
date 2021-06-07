const { compilerOptions } = require('./tsconfig.json');

const moduleAlias = compilerOptions.paths;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        modules: false,
        loose: true,
        useBuiltIns: 'usage'
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@emotion',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    [
      'babel-plugin-module-resolver',
      {
        root: ['./src'],
        alias: moduleAlias
      }
    ]
  ],
  env: {
    webpack: {
      presets: ['@babel/preset-typescript', '@babel/preset-env', '@babel/preset-react']
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: { node: 'current' },
            loose: true
          }
        ],
        '@babel/preset-react'
      ]
    }
  }
};
