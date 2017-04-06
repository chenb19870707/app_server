const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    './bin/www'
  ],
  output: {
    path: path.join(__dirname, 'bin'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  context: __dirname,
  node: {
    __dirname: false,
    __filename: false
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }
    ]
  },
  devtool: (
    process.env.NODE_ENV == 'development'
      ? 'cheap-module-eval-source-map'
      : 'cheap-module-source-map'
  ),
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      _: 'lodash',
      moment: 'moment',
      assert: 'assert',
      iconv: 'iconv-lite',
      co: 'co',
      uuid: 'uuid',
      request: 'request',
      crypto: 'crypto',
      jwt: 'jsonwebtoken',
      log4js: 'log4js',
      bodyParser: 'body-parser',
      cookieParser: 'cookie-parser',
      express: 'express',
      path: 'path',
      Upyun: 'upyun',
      configs: path.resolve('./configs/env'),
      constants: path.resolve('./configs/constants'),
      authorize: path.resolve('./middlewares/authorize'),
      CSV: path.resolve('./utils/csv'),
      LOG: path.resolve('./utils/logger'),
      catchException: path.resolve('./middlewares/catch-exception'),
      uploader: path.resolve('./utils/uploader'),
      ERRORS: path.resolve('./configs/errors'),
      DB: path.resolve('./configs/databases'),
      sql: path.resolve('./utils/sql'),
      Timer: path.resolve('./utils/timer'),
      Treasure: path.resolve('./api/treasure/treasure.model')
    })
  ]
}
