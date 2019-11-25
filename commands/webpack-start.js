/* eslint-disable no-console */

const path = require("path");
const childProcess = require("child_process");
const tty = require("tty");

module.exports = () => {
  const supportsColor = tty.isatty(1) && tty.isatty(2);

  const configFile = path.resolve(
    path.join(__dirname, "..", "config", "webpack.config.js"),
  );

  const { status } = childProcess.spawnSync(
    "webpack",
    [
      "--watch",
      supportsColor ? "--colors" : "--no-colors",
      "--mode",
      "development",
      "--config",
      configFile,
    ],
    {
      stdio: "inherit",
      env: { ...process.env, NODE_ENV: "production" },
    },
  );

  process.exit(status || 0);
};
