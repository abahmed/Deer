const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

// Common configuration.
const commonConfig = {
  entry: './app/entry.jsx',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.ttf$/,
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

// Development configuration.
const developmentConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/build',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    publicPath: 'http://localhost:8080/build',
    hot: true,
    compress: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

// Production configuration.
const productionConfig = {
  mode: 'production',
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: './../build/',
    filename: 'bundle.js'
  }
}

module.exports = (env, options) => {
  if (options.mode && options.mode === 'production') {
    return merge(productionConfig, commonConfig)
  }
  return merge(developmentConfig, commonConfig)
}
