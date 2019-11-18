#!/usr/bin/env node

const child_process = require("child_process");

child_process.exec("git rev-parse --abbrev-ref HEAD", (error, stdout, stderr) => {
  if (error) {
    console.log(`ERROR: ${stderr}`);
    process.exit(1);
  }

  const branch = stdout.trim();

  if (branch === "master") {
    console.log("ERROR: Don't commit to master");
    process.exit(1);
  }
});
