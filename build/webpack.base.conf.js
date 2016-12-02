var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')

var IndexFilePlugin = require('index-file-webpack-plugin')
var webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].[hash].js',
    chunkFilename: 'chunk.[id].[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.styl'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue': 'vue/dist/vue.common.js',
      'superagent-client': 'superagent/lib/client.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'styles': path.resolve(__dirname, '../src/styles'),
      'components': path.resolve(__dirname, '../src/components'),
      'services': path.resolve(__dirname, '../src/services'),
      'router': path.resolve(__dirname, '../src/router'),
      'views': path.resolve(__dirname, '../src/views'),
      'state': path.resolve(__dirname, '../src/state'),
      'App': path.resolve(__dirname, '../src/App'),
      'const': path.resolve(__dirname, '../src/const')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue!vue-auto-import'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.ResolverPlugin([
      new IndexFilePlugin([
        '[name].vue',
        '[name].js',
        '[name].styl',
        'index.styl'
      ])
    ])
  ],
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  vueAutoImport: {
    scoped: true,
    files: {
      template: '[name].pug',
      style: '[name].styl',
      script: '[name].js'
    },
    langs: {
      template: 'pug',
      style: 'stylus',
      script: 'js'
    }
  }
}
