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
      {
        test: /\.vuee/,
        use: {
          loader: require.resolve('./myloader.js'),
        },
      },
    ],
  },

  optimization: {
    minimize: false,
  },
}
