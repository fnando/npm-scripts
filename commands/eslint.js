/* eslint-disable no-console */

const childProcess = require("child_process");

module.exports = (args) => {
  const pattern = process.env["PATTERN"];
  const help = `
  Usage: PATTERN='**/*.{js,jsx,ts,tsx}' npm-scripts eslint

  Any argument passed to run-eslint will be forwarded to eslint itself,
  which means you can pass custom options to the command. The example
  below is automatically fixing files.

  PATTERN='**/*.{js,jsx,ts,tsx}' npm-scripts eslint --fix
  `;

  const hasFiles = args.some((arg) => arg.match(/\.(jsx?|tsx?)$/));

  if (!pattern && !hasFiles) {
    console.log(help);
    process.exit(1);
  }

  if (!hasFiles) {
    args.push(pattern);
  }

  const { status } = childProcess.spawnSync("eslint", args, {
    stdio: "inherit",
  });

  process.exit(status || 0);
};
