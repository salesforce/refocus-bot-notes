/**
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ZipPlugin = require('zip-webpack-plugin');
const env = process.env.NODE_ENV || 'dev';
const url = require('./config.js')[env].refocusUrl;
const botName = require('./package.json').name;

const config = {

  entry: './web/index.js',

  output: {
    path: path.resolve(__dirname, './web/dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'web')],
        use: 'babel-loader?compact=true',
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'web')],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: 'url-loader?limit=100000',
        include: path.resolve(__dirname, 'web'),
      },
    ]
  },

  node: {
    fs: 'empty'
  },

  devServer: {
    historyApiFallback: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'web/index.html',
      url: url + '/v1/',
      name: botName,
    }),
    new ZipPlugin({
      filename: 'bot.zip',
      include: [/\.js$/, /\.html$/],
      exclude: ['public']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'API_TOKEN': JSON.stringify(process.env.API_TOKEN)
      }
    })
  ]
};

module.exports = config;
