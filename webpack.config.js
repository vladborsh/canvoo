const path = require("path");
const yargs = require("yargs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

/* Configure HTMLWebpack plugin */
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + "/src/index.html",
  filename: "index.html",
  inject: "body"
});

/* Configure ProgressBar */
const ProgressBarPluginConfig = new ProgressBarPlugin()

var argv = yargs.boolean("disable-bs").argv;

module.exports = {
  entry: "./src/index.ts",
  devtool: "source-map",
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'awesome-typescript-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg|png)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
            name: '[path][name].[ext]'
        }
      },
    ]
  },
  watch: false,
  plugins: (function (argv) {
    var plugins = [];
    if (!argv.disableBs) {
      plugins.push(HTMLWebpackPluginConfig, ProgressBarPluginConfig);
    }
    return plugins;
  })(argv),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  }
};
