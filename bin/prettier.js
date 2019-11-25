#!/usr/bin/env node
/* eslint-disable no-console */

const childProcess = require("child_process");
const args = process.argv.slice(2);
const pattern = process.env["PATTERN"];
const help = `
Usage: PATTERN='**/*.js' npm-scripts prettier

Any argument passed to run-prettier will be forwarded to prettier itself,
which means you can pass custom options to the command. The example
below is automatically fixing files.

PATTERN='**/*.js' npm-scripts prettier --write
`;

const hasFiles = args.some((arg) => arg.match(/\.(jsx?|tsx?)$/));

if (!pattern && !hasFiles) {
  console.log(help);
  process.exit(1);
}

if (!hasFiles) {
  args.push(pattern);
}

const response = childProcess.spawn("prettier", args, { stdio: "inherit" });

process.stdout.on("data", (data) => {
  console.log(data.toString());
});

process.stderr.on("data", (data) => {
  console.error(data.toString());
});

response.on("exit", (code) => {
  process.exit(code);
});
