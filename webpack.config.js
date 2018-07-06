const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  context: path.resolve(__dirname, 'resources'),
  entry: {
    'main': [
      './scripts/main.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'scripts/[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
