/* eslint-disable no-console */

const path = require("path");
const childProcess = require("child_process");

module.exports = (args) => {
  const configFile = path.resolve(
    path.join(__dirname, "..", "config", "jest.config.js"),
  );

  const { status } = childProcess.spawnSync(
    "jest",
    ["--config", configFile, ...args],
    {
      stdio: "inherit",
      env: process.env,
    },
  );

  process.exit(status || 0);
};
