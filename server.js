#!/usr/bin/env node
var path = require('path')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require(path.join(__dirname, 'webpack.config'))

// MEGA HACK TIME
var argv = require('minimist')(process.argv.slice(2))
var componentPath = path.join(process.cwd(), argv.component)
var fs = require('fs')
var file = path.join(__dirname, 'src/index.template.js')
var data = fs.readFileSync(file).toString()
var replacementString = 'import Component from \'' + componentPath + '\''
data = data.replace('/* replace-me */', replacementString)
fs.writeFileSync(path.join(__dirname, 'src/index.js'), data)

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
