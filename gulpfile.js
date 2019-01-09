const gutil = require('gulp-util')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { spawn } = require('child_process')
const electron = require('electron')

// Webpack Configuration.
const webpackConfig = require('./webpack.config.js')

function runWebpackDevServer () {
  const config = webpackConfig(null, { mode: 'dev' })
  // Start a webpack-dev-server
  const webpackDevServer = new WebpackDevServer(webpack(config), {
    ...config.output,
    stats: {
      colors: true
    }
  })

  // Listen on webpack dev server port.
  webpackDevServer.listen(8080, 'localhost', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)

    // Run electron.
    const child = spawn(electron, ['.'], { stdio: 'inherit' })
    child.on('close', () => {
      webpackDevServer.close()
    })
  })
  return Promise.resolve('done')
}
exports.start = runWebpackDevServer
