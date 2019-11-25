#!/usr/bin/env node
/* eslint-disable no-console */

const childProcess = require("child_process");

childProcess.exec(
  "git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD",
  (error, stdout, stderr) => {
    if (error) {
      console.log(`ERROR: ${stderr}`);
      process.exit(1);
    }

    if (stdout.includes("yarn.lock")) {
      childProcess.execSync("yarn install");
    } else if (stdout.includes("package-lock.json")) {
      childProcess.execSync("npm install");
    }
  },
);
