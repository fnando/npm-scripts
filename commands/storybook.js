/* eslint-disable no-console */

const path = require("path");
const fs = require("fs");
const childProcess = require("child_process");

module.exports = (args) => {
  const pkg = require(path.join(process.cwd(), "package.json"));
  const configDir = path.resolve(
    path.join(__dirname, "..", "config", "storybook"),
  );

  const baseDir =
    (pkg.webpack && path.resolve(pkg.webpack.baseDir)) || process.cwd();

  const configContent = `
   import { configure } from "@storybook/react";
   configure(require.context("${baseDir}", true, /\\.stories\\.[jt]sx?$/), module);
   `;

  // Dynamically generate config.js.
  fs.writeFileSync(
    path.resolve(__dirname, "..", "config", "storybook", "config.js"),
    configContent,
  );

  const { status } = childProcess.spawnSync(
    "start-storybook",
    ["--ci", "--quiet", "--config-dir", configDir, ...args],
    {
      stdio: "inherit",
      env: process.env,
    },
  );

  process.exit(status || 0);
};
