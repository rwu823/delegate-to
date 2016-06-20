'use strict'

const webpack = require('webpack')
const pkg = require('./package.json')
const isDev = process.env.NODE_ENV !== 'production'
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    [pkg.name]: isDev
      ? ['babel-polyfill', './dev/client.js']
      : ['./src/index.js'],
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
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      }
    ]
  },
  plugins: isDev ? [new HtmlWebpackPlugin({
    title: pkg.name,
    template: './dev/index.html',
  })] : [],
  watch: isDev ,
  devtool: isDev ? 'eval' : ''
}
