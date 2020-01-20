const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "/bundle"),
    filename: "bundle.js",
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
}
