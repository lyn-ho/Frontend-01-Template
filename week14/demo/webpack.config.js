module.exports = {
	entry: './main.js',

	mode: 'development',

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
					},
				},
			},
		],
	},

	optimization: {
		minimize: false,
	},
}
