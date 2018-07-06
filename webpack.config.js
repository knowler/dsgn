const path = require('path');
const glob = require('glob-all');
const { argv } = require('yargs');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const BrowserSyncWebpackPlugin = require('browser-sync-webpack-plugin');

const isProduction = !!(argv.env && argv.env.production);

let webpackConfig = {
  mode: isProduction ? 'production' : 'development',
  context: path.resolve(__dirname, 'resources'),
  stats: isProduction ? true : false,
  entry: {
    'main': [
      './scripts/main.js',
      './styles/main.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: `scripts/[name]${isProduction ? '_[hash]' : null}.js`
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
    new CleanWebpackPlugin('public', { verbose: false }),
    new MiniCssExtractPlugin({
      filename: `styles/[name]${isProduction ? '_[hash]' : null}.css`
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
} else {
  webpackConfig.plugins.push(
    new BrowserSyncWebpackPlugin(
      {
        server: path.resolve(__dirname, 'public'),
        injectChanges: true,
        plugins: [ 'bs-html-injector' ]
      }
    )
  )
}

module.exports = webpackConfig;
