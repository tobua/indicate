const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const EmptyPlugin = () => {}

module.exports = function (env) {
  const isProduction = env === 'production'

  return {
    entry: './Indicate.js',
    output: {
      library: 'Indicate',
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
              loader: 'css-loader'
            }, {
              loader: 'sass-loader'
            }
          ])
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('dist/indicate.css'),
      isProduction ? new UglifyJSPlugin() : EmptyPlugin
    ],
    devServer: {
      contentBase: path.join(__dirname, 'examples'),
      compress: true,
      port: 3000
    }
  }
}
