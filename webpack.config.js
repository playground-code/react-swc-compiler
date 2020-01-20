const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname + "/bundle",
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    inline: true,
    port: 1234,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "swc-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./bundle/index.html",
    }),
  ],
  devServer: {
    contentBase: "./bundle",
  },
  stats: {
    children: false,
  },
}
