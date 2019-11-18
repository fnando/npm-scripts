# @fnando/npm-scripts

## Installation

```
yarn add -D @fnando/npm-scripts husky lint-staged
```

## Usage

This package contains scripts to be used with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged).

- `run-eslint`: Runs `eslint` with staged files or defaults to the provided `PATTERN`.
- `run-prettier`: Runs `prettier` with staged files or defaults to the provided `PATTERN`.
- `no-commit-on-master`: Fails whenever you try to directly commit to `master` branch.
- `install-npm-packages-if-needed`: Run either `yarn install` or `npm install` whenever the pulled changes include changes to `yarn.lock` or `package-lock.json`, respectively.

Add something like the following to your package.json file.

```json
{
  "scripts": {
    "lint:eslint": "PATTERN='src/**/*.{ts,tsx,json}' run-eslint --fix --max-warnings 0",
    "lint:prettier": "PATTERN='src/**/*.{ts,tsx,json}' run-prettier --write"
  },
  "husky": {
    "hooks": {
      "pre-commit": "no-commit-on-master && lint-staged",
      "pre-push": "no-commit-on-master",
      "post-merge": "install-npm-packages-if-needed"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "yarn lint:prettier",
      "yarn lint:eslint",
      "git add"
    ],
    "src/**/*.json": [
      "yarn lint:prettier",
      "git add"
    ]
  }
}
```

## License

Copyright (c) 2019 Nando Vieira

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
