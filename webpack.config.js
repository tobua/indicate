const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (env) {
  const isProduction = env === 'production'
  return {
    mode: env,
    entry: './Indicate.js',
    output: {
      library: 'Indicate',
      libraryExport: 'default',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      path: path.resolve(__dirname, 'dist'),
      filename: `indicate${isProduction ? '.min' : ''}.js`
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
      new ExtractTextPlugin('indicate.css')
    ],
    optimization: {
      minimize: env === 'production'
    },
    devServer: {
      publicPath: '/dist/',
      contentBase: [
        path.join(__dirname, 'examples'),
        path.join(__dirname, 'dist')
      ],
      compress: true,
      port: 3000,
      open: true
    }
  }
}
