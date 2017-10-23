const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const EmptyPlugin = () => {}

module.exports = function (env) {
  const isProduction = env === 'production'
  return {
    entry: './Indicate.js',
    output: {
      library: 'Indicate',
      libraryExport: 'default',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      filename: `dist/indicate${isProduction ? '.min' : ''}.js`
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract([
            {
              loader: 'css-loader',
              options: { minimize: isProduction }
            }, {
              loader: 'sass-loader'
            }
          ])
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('dist/indicate.css'),
      isProduction ? new webpack.optimize.UglifyJsPlugin() : EmptyPlugin
    ],
    devServer: {
      contentBase: [path.join(__dirname, 'examples'), path.join(__dirname, 'dist')],
      compress: true,
      port: 3000
    }
  }
}
