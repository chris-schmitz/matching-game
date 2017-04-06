// This configuration file was pulled from a build of the webpack-simple
// I'm sure there's a better way of altering the existing webpack configs
// or knitting in the config from electron-vue that would be a better setup,
// but honestly I 1. don't know enough about advanced webpack configs and
// 2. don't want to deveate from this project at this point to learn it.
// It would be great to circle back later and come up with a better build
// system to fit the two environments that this code is going to run in,
// but for now I'm in path-of-least-resistance mode when it comes to build
// tools :|

var path = require('path')
var webpack = require('webpack')
var vueLoaderConfig = require('./vue-loader.conf')
var utils = require('./utils')


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '..', './electron_base'),
    publicPath: '/electron_base/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(sass|scss)$/,
        loaders:['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }

     ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
      new webpack.ExternalsPlugin('commonjs', [
          'electron'
      ])
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
