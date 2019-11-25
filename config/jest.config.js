const fs = require("fs");
const path = require("path");
const pkg = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "package.json")),
);

const webpackConfig = pkg.webpack || {};

module.exports = {
  rootDir: process.cwd(),
  modulePaths: [
    webpackConfig.baseDir && path.resolve(webpackConfig.baseDir),
  ].filter(Boolean),
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.(scss|css|jpe?g|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "jest-filename-transform",
  },
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
};
