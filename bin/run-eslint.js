#!/usr/bin/env node

const child_process = require("child_process");
const args = process.argv.slice(2);
const pattern = process.env["PATTERN"];
const help = `
Usage: PATTERN='**/*.js' run-eslint

Any argument passed to run-eslint will be forwarded to eslint itself,
which means you can pass custom options to the command. The example
below is automatically fixing files.

PATTERN='**/*.js' run-eslint --fix
`;

const hasFiles = args.some(arg => arg.match(/\.(jsx?|tsx?)$/));
let target;

if (!pattern && !hasFiles) {
  console.log(help);
  process.exit(1);
}

if (!hasFiles) {
  args.push(pattern);
}

target = args.map((file) => JSON.stringify(file)).join(" ");

child_process.execSync(`eslint ${target}`);
