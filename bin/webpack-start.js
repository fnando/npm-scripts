#!/usr/bin/env node
/* eslint-disable no-console */

const path = require("path");
const childProcess = require("child_process");
const tty = require("tty");
const supportsColor = tty.isatty(1) && tty.isatty(2);

const configFile = path.resolve(
  path.join(__dirname, "..", "config", "webpack.config.js"),
);

const response = childProcess.spawn(
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

process.stdout.on("data", (data) => {
  console.log(data.toString());
});

process.stderr.on("data", (data) => {
  console.error(data.toString());
});

response.on("exit", (code) => {
  process.exit(code);
});
