var path = require('path');

module.exports = {
  mode: 'development',
  entry: '/compiled/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  }
};