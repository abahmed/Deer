var gulp = require('gulp')
var gutil = require('gulp-util')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('./webpack.config.js')
const child_process = require('child_process')

function webpackDevServer (done) {
  var config = webpackConfig(null, { mode: 'dev' })
  // Start a webpack-dev-server
  const webpackDevServer = new WebpackDevServer(webpack(config), {
    ...config.output,
    stats: {
      colors: true
    }
  })

  webpackDevServer.listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    electron(() => {
      webpackDevServer.close()
      done()
    })
  })
}

function electron (callback) {
  return child_process.spawn(
    'node_modules/.bin/electron',
    ['.'],
    { stdio: 'inherit' }
  ).on('close', () => process.exit())
}

exports.start = (webpackDevServer)
