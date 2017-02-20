var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

var webpackBase = require('./webpack.base.js');

var UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(webpackBase, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),

    new HtmlWebpackPlugin({
      inject: 'body',
      template: path.resolve(__dirname, '../src/index.html'),
      minify: {
        caseSensitive: true,
        collapseWhitespace: true
      }
    }),
    new WebpackCleanupPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new UnminifiedWebpackPlugin(),
    new ExtractTextPlugin("style.css")
  ]
});
