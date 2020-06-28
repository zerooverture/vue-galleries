const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = require('./config')

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    app: './examples/src/main.js'
  },
  output: {
    filename: '[name].[hash:7].js',
    path: path.resolve(process.cwd(), './dist'),
    chunkFilename: '[name].chunk.[hash:7].js'
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json', '.scss'],
    alias: config.alias
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    overlay: true,
    host: '0.0.0.0',
    port: 8000,
    publicPath: '/',
    hot: true
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|jsx?)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // options: {
        //   extractCSS: true,
        //   loaders: {
        //     ...cssLoaders()
        //   },
        //   transformToRequire: {
        //     video: 'src',
        //     source: 'src',
        //     img: 'src',
        //     image: 'xlink:href'
        //   }
        // }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              resources: './src/assets/var.scss'
              //
              // // Or array of paths
              // resources: ['./path/to/vars.scss', './path/to/mixins.scss']
            }
          }
        ]
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader'
        // todo: 这种写法有待调整
        // query: {
        //   limit: 10000,
        //   name: path.posix.join('static', '[name].[hash:7].[ext]')
        // }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './examples/index.html',
      favicon: './examples/favicon.ico'
    }),
    new webpack.DefinePlugin({
      'process.env.FAAS_ENV': JSON.stringify(process.env.FAAS_ENV)
    })
    // new CopyWebpackPlugin([
    //   { from: 'examples/images', to: 'images' },
    //   { from: 'examples/js', to: 'js' }
    // ])
  ],
  optimization: {
    minimizer: []
  }
}
