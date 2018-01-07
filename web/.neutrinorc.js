module.exports = {
  use: [
    [
      '@neutrinojs/react',
      {
        hot: true,
        html: {
          title: 'vngrs-challenge'
        }
      }
    ],
    [
      '@neutrinojs/style-loader', {
        test: /\.scss$/,
        loaders: [
          {
            loader: "sass-loader",
            useId: "sass",
          }
        ]
      }
    ],
    [
      '@neutrinojs/airbnb', {
        eslint: {
          globals: ['process', 'window', 'document']
        }
      }
    ],
    [
      '@neutrinojs/jest', {
        setupTestFrameworkScriptFile: './test/test-setup.js',
        setupFiles: [
          './test/shim.js'
        ]
      }
    ]
  ],
  env: {
    NODE_ENV: {
      production: {
        use: ['@neutrinojs/minify']
      }
    }
  }
};
