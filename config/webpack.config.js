/* eslint-disable no-console */

const path = require("path");
const fs = require("fs");
const webpack = require("webpack");

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const Manifest = require("webpack-assets-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const css = require("./webpack/css");
const files = require("./webpack/files");
const ts = require("./webpack/ts");
const js = require("./webpack/js");

module.exports = (env, argv) => {
  const mode = argv.mode || "development";
  const isProduction = mode === "production";
  const pkg = JSON.parse(fs.readFileSync("package.json"));
  const defaultOptions = {
    assetName: isProduction ? "[name]-[hash]" : "[name]",
    publicPath: "/dist/",
  };
  const options = { ...defaultOptions, ...pkg.webpack };
  const { entry, outputDir, assetName } = options;

  if (!("webpack" in pkg)) {
    console.error("ERROR: You must define the `webpack` key on package.json.");
    process.exit(1);
  }

  const config = {
    entry,
    mode,
    devtool: isProduction ? "source-map" : "cheap-eval-source-map",
    bail: isProduction,

    output: {
      path: path.resolve(outputDir),
      publicPath: options.publicPath,
      filename: `${assetName}.js`,
    },

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      plugins: [new TsconfigPathsPlugin()],
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(mode),
        },
      }),
      isProduction && new CleanWebpackPlugin(),
      isProduction && new webpack.optimize.OccurrenceOrderPlugin(true),
      isProduction && new UglifyJSPlugin({ sourceMap: true }),
      new MiniCssExtractPlugin({
        filename: `${assetName}.css`,
      }),
      new Manifest({
        output: "manifest.json",
        writeToDisk: true,
        publicPath: true,
      }),
    ].filter(Boolean),

    module: {
      rules: [js(options), ts(options), css(options), files(options)],
    },
  };

  return config;
};
