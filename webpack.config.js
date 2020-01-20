const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "production",
  performance: {
    hints: false,
  },
  stats: {
    all: undefined,
  },
  entry: {
    index: "./index.js",
    another: "./App.js",
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name][contenthash].js",
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    stats: {
      entrypoints: false,
      errors: false,
      chunkGroups: false,
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split("/")
              .reduceRight(item => item)
            const allChunksNames = chunks.map(item => item.name).join("~")
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`
          },
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: require.resolve("swc-loader"),
          options: {
            jsc: {
              parser: {
                syntax: "ecmascript",
                jsx: true,
              },
              transform: {
                react: {
                  pragma: "React.createElement",
                  pragmaFrag: "React.Fragment",
                  throwIfNamespace: true,
                  development: false,
                  useBuiltins: false,
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
  ],
}
