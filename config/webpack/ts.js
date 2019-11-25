module.exports = () => ({
  test: /\.ts(x?)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "ts-loader",
    },
  ],
});
