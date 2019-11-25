/* eslint-env node */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

module.exports = (options) => ({
  test: /\.s?css$/,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        sourceMap: true,
        plugins: () => [autoprefixer()],
      },
    },
    "resolve-url-loader",
    {
      loader: "sass-loader",
      options: {
        sourceMap: true,
        sassOptions: { includePaths: [options.baseDir] },
      },
    },
  ],
});
