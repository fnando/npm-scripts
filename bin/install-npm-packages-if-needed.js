#!/usr/bin/env node

child_process.exec("git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD", (error, stdout, stderr) => {
  if (error) {
    console.log(`ERROR: ${stderr}`);
    process.exit(1);
  }

  if (stdout.includes("yarn.lock")) {
    child.process.execSync("yarn install");
  } else if (stdout.includes("package-lock.json")) {
    child.process.execSync("npm install");
  }
});
