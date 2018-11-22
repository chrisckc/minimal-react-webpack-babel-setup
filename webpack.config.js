const webpack = require('webpack');

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
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  optimization: {
    runtimeChunk: true,
    moduleIds: 'hashed',
    splitChunks: { // https://webpack.js.org/plugins/split-chunks-plugin/
      chunks: "initial", // default is async, set to initial and then use async inside cacheGroups as required instead
      //maxInitialRequests: Infinity, // Default is 3, make this unlimited if using HTTP/2
      //maxAsyncRequests: Infinity, // Default is 5, make this unlimited if using HTTP/2
      //maxSize: 10000,
      cacheGroups: {
        default: false, // disable the built-in groups, default & vendors (vendors is overwritten below)
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: 10,
          //enforce: true, // create chunk regardless of the size of the chunk
          maxSize: 10000
        }
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
