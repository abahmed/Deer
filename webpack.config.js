module.exports = {
  watch: false,
  
  target: 'electron',
  
  entry: './app/entry.js',

  output: {
    path: __dirname + '/build',
    publicPath: 'build/',
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    ]
  }
}
