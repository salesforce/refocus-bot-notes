/**
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or
 * https://opensource.org/licenses/BSD-3-Clause
 */

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //creates index.html folder and puts it in dist folder
var webpack = require('webpack');

var config = {
	entry: './web/index.js',

	output: {
		path: path.resolve(__dirname, './web/dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},

	module: {
		rules: [
			{test: /\.(js|jsx)$/, use: 'babel-loader'}, //code transformer (if file is .js)
			{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{ test: /\.handlebars$/, loader: "handlebars-loader" },
			{test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, use: "url-loader?limit=100000"}
		]
	},

	node: {
		fs: 'empty'
	},

	devServer: {
		historyApiFallback: true
	},

	plugins: [new HtmlWebpackPlugin({
		template: 'web/index.html'
	})]
};

if(process.env.NODE_ENV === 'production'){
	config.plugins.push(
		new webpack.DefinePlugin({ //allows us to set a property on process.env
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	)
}

module.exports = config;