var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')
var path = require('path')
// MEGA HACK TIME
var argv = require('minimist')(process.argv.slice(2))
var componentPath = path.join(process.cwd(), argv.component)

var fs = require('fs')
var file = path.join(__dirname, 'src/index.js')
var data = fs.readFileSync(file).toString()
var replacementString = 'import Component from \'' + componentPath + '\''
data = data.replace(
  /\/\* replace-start \*\/.*\/\* replace-end \*\//g,
  '/* replace-start */ ' + replacementString + ' /* replace-end */')
fs.writeFileSync(file, data)

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err)
  }
  console.log('Listening at localhost:3000')
})
