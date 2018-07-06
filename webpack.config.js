const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
  context: path.resolve(__dirname, 'resources'),
  entry: {
    'main': [
      './scripts/main.js',
      './styles/main.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'scripts/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
