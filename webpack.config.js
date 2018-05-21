module.exports = {
  entry: './app/entry.js',
  output: {
    path: __dirname + '/build',
    publicPath: __dirname + '/build/',
    filename: 'bundle.js'
  },
  mode: 'development',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
}
