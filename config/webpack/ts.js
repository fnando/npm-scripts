module.exports = () => ({
  test: /\.[jt]s(x?)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "ts-loader",
    },
  ],
});
