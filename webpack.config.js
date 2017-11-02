const path = require('path');

module.exports = {
  entry: './client/App.js',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'webpack-bundle.js',
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devServer : {
    historyApiFallback : true
  }
}