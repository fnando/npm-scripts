#!/usr/bin/env node
/* eslint-disable no-console */

const path = require("path");
const fs = require("fs");
const childProcess = require("child_process");

const [, , command] = process.argv;
const filePath = path.join(__dirname, `${path.basename(command)}.js`);

if (!fs.existsSync(filePath)) {
  console.error(`ERROR: invalid command (${command})`);
  process.exit(1);
}

const response = childProcess.spawn(
  "node",
  [filePath, ...process.argv.slice(3)],
  { stdio: "inherit" },
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
