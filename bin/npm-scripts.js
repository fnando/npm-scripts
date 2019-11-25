#!/usr/bin/env node
/* eslint-disable no-console */

const path = require("path");
const fs = require("fs");

const [, , commandName] = process.argv;
const commandPath = path.resolve(
  path.join(__dirname, "..", "commands", `${path.basename(commandName)}.js`),
);
const args = process.argv.slice(3);

if (!fs.existsSync(commandPath)) {
  console.error(`ERROR: invalid command (${commandName})`);
  process.exit(1);
}

process.stdout.on("data", (data) => {
  console.log(data.toString());
});

process.stderr.on("data", (data) => {
  console.error(data.toString());
});

const command = require(commandPath);

command(args);
