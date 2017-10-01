const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path:__dirname + './build',
    filename: 'bundle-[hash].js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel?presets[]=es2015', exclude: /node_modules/},
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.html$/, loader: 'html' },
    ]
  },
  plugins: [
    new CleanPlugin(['build']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('app-[hash].css'),
    new webpack.DefinePlugin({
      API: JSON.stringify('https://jsonplaceholder.typicode.com')
    })
  ]
};
