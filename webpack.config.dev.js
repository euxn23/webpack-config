const webpack = require('webpack')
const config = require('./webpack.config')

const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST || '0.0.0.0'
const DEV_SERVER_PORT = process.env.DEV_SERVER_PORT || 3000

module.exports = {
  ...config,
  entry: [
    'react-hot-loader/patch',
    ...config.entry,
    `webpack-dev-server/client?http://${DEV_SERVER_HOST}:${DEV_SERVER_PORT}`,
    'webpack/hot/dev-server'
  ],
  plugins: [...config.plugins, new webpack.HotModuleReplacementPlugin()]
}
