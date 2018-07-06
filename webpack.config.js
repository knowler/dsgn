const path = require('path');

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
    filename: 'scripts/main.js'
  }
};
