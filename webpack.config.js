const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  optimization: {
    runtimeChunk: true,
    namedChunks: false,
    namedModules: false,
    moduleIds: 'hashed',
    splitChunks: { // https://webpack.js.org/plugins/split-chunks-plugin/
      chunks: "initial", // default is async, set to initial and then use async inside cacheGroups as required instead
      //maxInitialRequests: Infinity, // Default is 3, make this unlimited if using HTTP/2
      //maxAsyncRequests: Infinity, // Default is 5, make this unlimited if using HTTP/2
      minSize: 5000,
      maxSize: 10000,
      cacheGroups: {
        default: false, // disable the built-in groups, default & vendors (vendors is overwritten below)
        reactDom: {
          test: /[\\/]node_modules[\\/]react-dom[\\/]/,
          name: "vendor.react-dom",
          priority: 20,
          enforce: true,
          //minSize: 2000,
          //maxSize: 5000
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
          enforce: true, // create chunk regardless of the size of the chunk
          //maxInitialRequests: Infinity
          //minSize: 2000
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin([ 'dist' ]),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({ analyzerPort: 9080 })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
