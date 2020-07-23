const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = require('./config')

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    library: 'GALLERIES',
    libraryExport: 'default',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: config.alias
  },
  // externals: {
  //   vue: 'vue'
  // },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|jsx?)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }, {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      }, {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
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
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }, {
        test: /\.ts$/,
        use: 'ts-loader'
      }, {
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
  optimization: {
    // minimize: false,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({ // 抽离css样式插件
      filename: 'index.css' // 抽离后的文件名
    })
  ],
  performance: {
    hints: false
  },
  stats: {
    children: false
  }
}
