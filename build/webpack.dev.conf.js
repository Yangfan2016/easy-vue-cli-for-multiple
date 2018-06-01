'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    proxy: [{
      context: ["/trms"],
      target: "http://127.0.0.1",
      changeOrigin: true,
      onProxyReq(proxyReq, req, res) {
        // add custom header to request
        let cookie2=`LID=WEFiRVgwQ3dIa0NaV1NRUnVqc3RtWk9Hbmo5SU44YTdEa1hwM1NoS1V5VVVVQVRiVVE9PQ==$AiWoHpiIFemjkobJ8Uj5EeA58Y7hIlZxAAPHTB99ismvcad5gYEA5g!!; Hm_lvt_7ad0e218cfd89a6bcabf4ce749d7c3db=1527554904; Hm_lpvt_7ad0e218cfd89a6bcabf4ce749d7c3db=1527554904`;
        // try{
        //   cookie2 = fs.readFileSync('cookie2.txt','utf-8');
        // } catch(e) {
        //   cookie2 = cookie;
        // }
        if(req.get('User-Agent').indexOf('Chrome') > -1) {
          proxyReq.setHeader('Cookie', cookie2);
        } else {
          proxyReq.setHeader('Cookie', cookie2);
        }
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 课程外 首页
    new HtmlWebpackPlugin({
      filename: 'home/index.html',
      template: path.resolve(__dirname,"../src/views/home/index.html"),
      inject: true,
      chunks:["home"]
    }),
    // 课程内 课程页
    new HtmlWebpackPlugin({
      filename: 'course/index.html',
      template: path.resolve(__dirname,"../src/views/course/index.html"),
      inject: true,
      chunks:["course"]
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
