const path = require('path')
const webpack = require('webpack')

//插件们
const ExtracsTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const __ENV__ = process.env.NODE_ENV || 'development'
const __DEV__ = __ENV__ === 'development'
const __VERSION__ = 123123
const config  = require(path.join(__dirname, 'configs', 'config.build.js'))[__ENV__]

function getLoaders(){
	let loaders = [
		{test: /\.js$/, loader: 'babel' },
		{test: /\.less$/, loader: ExtracsTextPlugin.extract('css?sourceMap!less?souceMap')},
		{test: /\.(jpe?g|png|gif)$/i,loader: 'file?hash=sha512&digest=hex&name=images/[name].[hash].[ext]!image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'},
		{test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
        {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10&minetype=application/font-woff'},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10&minetype=application/octet-stream'},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10&minetype=image/svg+xml'}
	]
	return loaders
}

function getPlugins(){
	let plugins = [
		new ExtracsTextPlugin(__DEV__? '[name].css' : '[name].[hash:10].css'),
		new webpack.optimize.CommonsChunkPlugin('libs', __DEV__ ? 'libs.js' : 'libs.[hash:10].js'),
		new HtmlWebpackPlugin({
			filename: '../index.html',
			template: path.join(__dirname, config.commonRoot, config.indexTpl)
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': __DEV__ ? "'development'" : "'production'",
			ENV: __ENV__,
			VERSION: __VERSION__
		}),
		new webpack.ProvidePlugin({})
	]
	if(__DEV__){
		plugins.concat([
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin()
		])
	}else{
		plugins.concat([
			new CleanWebpackPlugin(path.join(__dirname, config.release)),
			new webpack.optimize.UglifyJsPlugin({
				mangle: {except: ['$super', '$', 'exports', 'require']},
				compress:{warnings: false},
				beautify: true
			})
		])
	}
	return plugins
}

let webpackConfig = {}

webpackConfig = Object.assign({}, webpackConfig, {
	entry: {
		app: path.join(__dirname, config.appRoot, config.entry),
		libs: config.libs
	},
	output: {
		path: path.join(__dirname, config.release, config.assets),
		publicPath: config.cdnPath,
		filename: __DEV__ ? '[name].js' : '[name].[hash:10].js'
	},
	module: {
		loaders: getLoaders()
	},
	plugins: getPlugins()
})

if(__DEV__){
	webpackConfig = Object.assign({}, webpackConfig, {
		devtool: 'source-map',
		devServer: {
			host: config.domain,
			contentBase: config.release,
			port: config.port,
			hot: true,
			inline: true
		}
	})
}

module.exports = webpackConfig