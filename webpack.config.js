const path = require('path');
const glob = require('glob-all');
const { argv } = require('yargs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurgecssWebpackPlugin = require("purgecss-webpack-plugin");

const isProduction = !!(argv.env && argv.env.production);

let webpackConfig = {
  mode: isProduction ? 'production' : 'development',
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

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

if (isProduction) {
  webpackConfig.plugins.push(
    new PurgecssWebpackPlugin({
      paths: glob.sync([
        path.join(__dirname, 'resources/**/*.html')
      ]),
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ["html", "js", "php", "vue"]
        }
      ]
    })
  );
}

module.exports = webpackConfig;
