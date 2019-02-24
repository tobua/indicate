const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = env => {
  return {
    mode: env || 'development',
    entry: './src/Indicate.js',
    output: {
      library: 'Indicate',
      libraryExport: 'default',
      libraryTarget: 'umd',
      umdNamedDefine: true,
      filename: 'indicate.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            }, {
              loader: 'css-loader'
            }, {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'indicate.css'
      })
    ],
    optimization: {
      minimizer: env === 'production' ? [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: {
            output: {
              comments: false
            }
          }
        })
      ] : []
    },
    devServer: {
      publicPath: '/dist/',
      contentBase: [
        path.join(__dirname, 'node_modules'),
        path.join(__dirname, 'examples'),
        path.join(__dirname, 'dist')
      ],
      open: true
    }
  }
}
