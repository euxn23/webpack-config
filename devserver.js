const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.dev')

const compiler = webpack(config)
const port = process.env.DEV_SERVER_PORT || 3000

const server = new WebpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  contentBase: process.env.WEBPACK_ENTRY || 'src',
  inline: true,
  hot: true,
  stats: { colors: true }
})
server.listen(port, '0.0.0.0', err =>
  console.log(err || `Webpack Dev Server Listening at http://0.0.0.0:${port}`)
)
