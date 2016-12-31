'use strict'

const webpack = require('webpack')
const pkg = require('./package.json')
const { NODE_ENV } = process.env
const isDev = !NODE_ENV
const isProd = NODE_ENV === 'production'
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    [pkg.name]: isDev
      ? ['./dev/client']
      : ['./src'],
  },
  output: {
    path: `${__dirname}/npm/dist`,
    filename: '[name].js',
    library: 'DelegateTo',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      }
    ]
  },
  plugins: [
    ...isDev ? [
      new HtmlWebpackPlugin({
        title: pkg.name,
        template: './dev/index.html',
      })
    ] : [
    ],
  ],
  watch: isDev ,
  devtool: isDev ? 'eval' : ''
}
