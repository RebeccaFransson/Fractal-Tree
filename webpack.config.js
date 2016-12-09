var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/main'
  ],
  output: {
      publicPath: '/',
      filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ["es2015"],
        }
      }
    ]
  },
  plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
  stats: {
      // Nice colored output
      colors: true
  },
  debug: true
};
