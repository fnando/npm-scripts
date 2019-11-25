module.exports = () => ({
  test: /\.js(x?)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "babel-loader",
    },
  ],
});
