const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { spawn } = require('child_process')

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
    port: 8080,
    publicPath: 'http://localhost:8080/build',
    hot: true,
    compress: true,
    after () {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' }
      )
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError))
    }
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
    publicPath: './build/',
    filename: 'bundle.js'
  }
}

module.exports = (env, options) => {
  if (options.mode && options.mode === 'production') {
    return merge(productionConfig, commonConfig)
  }
  return merge(developmentConfig, commonConfig)
}
