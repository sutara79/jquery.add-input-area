const path = require('path');

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'jquery.add-input-area.min.js',
    path: path.join(__dirname, 'dist')
  }
};