/**
 * FRONTEND KIT
 * 
 * webpack.config.js
 * configuration file for UI Kit
 */

import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const TARGET = process.env.NODE_ENV
const pathResolve = (loc) => path.resolve(__dirname, loc)

/**
 * PLUGINS
 */
const htmlPlugin = new HtmlWebpackPlugin({
  template: 'src/index.ejs',
})

const scssExtractPlugin = new ExtractTextPlugin({
  filename: 'style.bundle.[hash].css',
  allChunks: true,
  disable: TARGET !== 'production',
})

/**
 * CONFIGURATION
 */
const webpackConfig = {
  entry: pathResolve('src/index.js'),
  output: {
    path: pathResolve('dist'),
    filename: 'app.bundle.[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'sass-loader'
          ],
          // fallback for production
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    htmlPlugin,
    scssExtractPlugin,
  ],
}

if (TARGET === 'development') {
  // configure webpack-dev-server
  webpackConfig.devServer = {
    hot: true,
    open: true,
    stats: 'errors-only',
    historyApiFallback: true
  }
  // enable HMR
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackConfig.plugins.push(new webpack.NamedModulesPlugin())
}

if (TARGET === 'production') {
  // show bundle size composition
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

export default webpackConfig
