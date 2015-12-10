var path = require('path')
var webpack = require('webpack')

var argv = require('minimist')(process.argv.slice(2))
var componentPath = path.join(process.cwd(), argv.component)
var testModulePath = componentPath.split('/')
testModulePath.pop()
testModulePath = testModulePath.join('/')

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: [path.join(__dirname, 'src'), path.join(process.cwd(), 'test')]
    }]
  }
}
