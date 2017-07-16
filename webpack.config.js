const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/public/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './public',
  },
};
