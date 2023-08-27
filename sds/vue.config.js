const path = require('path');
const webpack = require('webpack');

module.exports = {
	transpileDependencies: ['vuetify'],
	lintOnSave: false,
	outputDir: path.resolve(__dirname, './dist'),
	configureWebpack: {
		output: {
			filename: '[name].[contenthash].js'
		},
		plugins: [
			new webpack.ProvidePlugin({
				process: 'process/browser'
			}),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(process.env.NODE_ENV)
				}
			})
		],
		resolve: {
			fallback: {
				crypto: require.resolve('crypto-browserify'),
				stream: require.resolve('stream-browserify'),
				process: require.resolve('process/browser')
			}
		}
	},
	devServer: {}
};
