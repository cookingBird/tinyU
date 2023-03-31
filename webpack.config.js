const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: {
    Utils: path.resolve(__dirname, './src/index.ts')
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    scriptType: 'text/javascript',
    library: {
      name: '[name]',
      type: 'umd'
    }
  },
  optimization: {
    concatenateModules: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // minify: TerserPlugin.terserMinify,
        terserOptions: {
          ecma: 5,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          format: {
            comments: false
          }
        },
        parallel: true,
        extractComments: true
      })
    ],
    removeEmptyChunks: true
  },
  module: {
    rules: [
      { test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.cjs', '.json']
  },
  plugins: [
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.[cm]ts$/]
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
}
