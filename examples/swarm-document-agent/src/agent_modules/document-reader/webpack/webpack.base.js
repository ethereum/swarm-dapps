var path = require('path');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

process.noDeprecation = true;

module.exports = {

	entry: {
		app: [path.resolve(__dirname, '../src/entry.js')]
	},

	output: {
		path: path.resolve(__dirname, '../build'),
		publicPath: '',
		filename: 'bundle.js',
		sourceMapFilename: 'bundle.js.map',
		chunkFilename: 'bundle.chunk.js',
		//filename: '[name].[hash].js',
		//sourceMapFilename: '[name].[hash].js.map',
		//chunkFilename: '[id].chunk.js',
	},

	resolve: {
		extensions: ['*', '.js', '.html'],
		//fallback: [path.join(__dirname, '../node_modules')],
		modules: [
			path.join(__dirname, '../node_modules')
		],
		alias: {
			'src': path.resolve(__dirname, '../src'),
			'assets': path.resolve(__dirname, '../src/assets'),
		}
	},

	module: {
		rules : [
			{
				enforce: 'pre',
				test: /\.js$/,
				use: [{loader: 'eslint-loader'}],
				include: path.resolve(__dirname, '../src'),
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, '../src')
				],
				use: [{
					loader: 'babel-loader',
					options: {
							presets: ['es2015'],
							cacheDirectory: true
					}
				}]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: 'css-loader',
							options: {
									modules: false
							}
						}
					]
				}),
			},
			{
				test: /\.s[ac]ss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: 'css-loader',
							options: {
									modules: false
							}
						},
						'postcss-loader',
						'sass-loader'
					]
				}),
			},
			{
			  test: /\.(png|jpg|jpeg|gif)$/,
			  use: [ 'url?prefix=img/&limit=5000' ]
			},
			{
			  test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			  use: [ "url-loader?limit=10000&mimetype=application/font-woff" ]
			},
			{
			  test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			  use: [ "file-loader" ]
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			}
		],
	}
};
