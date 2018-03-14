module.exports = {
  target: 'electron',
  
  entry: './app/entry.js',

  output: {
    path: __dirname + '/build',
    publicPath: 'build/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {compact: false}
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  }
}
