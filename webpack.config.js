var path = require('path')

module.exports = {
  entry: './app/entry.js',
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: path.join(__dirname, '/build/'),
    filename: 'bundle.js'
  },
  mode: 'development',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css?$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  }
}
