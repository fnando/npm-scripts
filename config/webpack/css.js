/* eslint-env node */
const path = require("path");

const autoprefixer = require("autoprefixer");
const imports = require("postcss-import");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tailwind = require("tailwindcss");

module.exports = (options) => {
  const baseDir = path.resolve(options.baseDir);

  return {
    test: /\.s?css$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true,
          plugins: () => [
            imports({ root: baseDir }),
            tailwind(),
            autoprefixer(),
          ],
        },
      },
      "resolve-url-loader",
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
          sassOptions: { includePaths: [baseDir] },
        },
      },
    ],
  };
};
