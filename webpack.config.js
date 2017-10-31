const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: [`./${process.env.WEBPACK_ENTRY || 'src'}/index`],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `./${process.env.WEBPACK_ENTRY || 'src'}/static/index.html`,
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      ...Object.keys(process.env)
        .filter(key => key.startsWith('WEBPACK_VAL_'))
        .reduce(
          (obj, key) => ({ ...obj, [key]: JSON.stringify(process.env[key]) }),
          {}
        )
    })
  ].concat(
    process.env.NODE_ENV === 'production'
      ? [new webpack.optimize.UglifyJsPlugin()]
      : []
  ),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader']
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool:
    process.env.NODE_ENV === 'production'
      ? 'hidden-source-map'
      : 'cheap-module-eval-source-map'
}
