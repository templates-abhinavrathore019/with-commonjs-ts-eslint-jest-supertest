# Template for

commonjs + ts + eslint + jest + supertest project

# Compatible Versions:

### Node

- v19.7.0

### Typescript

- 5.2.2

### ESLint

- 8.48.0

### Jest

- 29.6.4

### TS-Jest

- 29.1.1

### Supertest

- 6.3.3

# Initialise project

```bash
npm init
```

# nodemon

- Watches files and restarts the server in case of changes.

## Install

```jsx
npm i nodemon
```

## nodemon.json

- Sample configuration

```json
{
  "restartable": "rs",
  "ignore": [".git", "node_modules/**/node_modules"],
  "verbose": true,
  "execMap": {
    "js": "node --harmony"
  },
  "events": {
    "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
  },
  "watch": ["test/fixtures/", "test/samples/"],
  "env": {
    "NODE_ENV": "development"
  },
  "ext": "ts,js,json"
}
```

# Typescript

## Install

```bash
npm install --save-dev typescript
```

## Install types

### Express

```bash
npm i --save-dev @types/express
```

### Node

```bash
npm i --save-dev @types/node
```

## tsconfig.json

### moduleDetection

- Will treat separate **js** files as separate modules. Without this it will raise errors like `const x already declared in other files`.

```bash
"moduleDetection": "force",
```

### esModuleInterop

- enabled interoperability of `commonjs` and `es6`.

```bash
"esModuleInterop": true,
```

### outDir

- `outDir` - The folder where compiled JavaScript gets saved, in this case, `dist`. This is a common folder name for this use case.\

```bash
"outDir": "./dist"
```

### include

- The TypeScript compiler will try to compile any TypeScript files ending in `.ts` it finds in the `src`.

```bash
"include": [
    "src/**/*"
		"jest/**/*"
  ]
```

### exclude

- Compiler will skip these files

```bash
"exclude": [
    "node_modules",
    "dist",
		"jest/**/*",
    "**/__mocks__/*",
    "**/__tests__/*"
  ]
```

### declaration

- enable it if project is library project and we want to deliver types with our library

```bash
"declaration": true
```

## package.json

### Change main

```bash
"main": "dist/app.js",
```

### Add scripts

```json
"scripts": {
		"dev": "cross-env NODE_ENV=development nodemon src/app.ts",
		"prod": "cross-env NODE_ENV=production nodemon src/app.ts",
		"build": "tsc",
    "start": "tsc && node .",
		"tsc:setup": "tsc --init",
}
```

# ESLint

## Install

```bash
npm i eslint
```

## Install Types

### Typescript eslint parser

```bash
npm install --save-dev @typescript-eslint/parser
```

### Typescript eslint plugin

```bash
npm install --save-dev @typescript-eslint/eslint-plugin
```

### Typescript plugin for airbnb

```bash
npm install --save-dev eslint-config-airbnb-typescript
```

## Configure eslint

```bash
npm init @eslint/config
```

✔ How would you like to use ESLint? · style
✔ What type of modules does your project use? · commonjs
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · No / Yes
✔ Where does your code run? · node
✔ How would you like to define a style for your project? · guide
✔ Which style guide do you want to follow? · airbnb
✔ What format do you want your config file to be in? · YAML

## Add Scripts

- Add scripts in `package.json`

```json
"scripts": {
    "lint:setup": "npm init @eslint/config",
    "lint:check": "eslint .",
    "lint:fix": "eslint --fix .",
},
```

## Debug

- check logs in `output` ⇒ `Eslint`

## Changes in .eslintrc

- Add plugin `plugin:@typescript-eslint/recommended`

```yaml
extends:
  - airbnb-base
  - airbnb-typescript/base
  - plugin:security/recommended
  - plugin:import/recommended
  - plugin:@typescript-eslint/recommended
```

- Add parser `@typescript-eslint/parser`

```yaml
parser: "@typescript-eslint/parser"
```

- Add parser options

```yaml
parserOptions:
  ecmaVersion: latest
  project:
    - "./tsconfig.json"
    - "./tsconfig.eslint.json"
```

- Add plugin `@typescript-eslint`

```yaml
plugins:
  - "@typescript-eslint"
```

- Add `*.ts` to files

```yaml
- files:
    - "*.js"
    - "*.mjs"
    - "*.ts"
```

- Disable rule `import/no-import-module-exports`:
  - This rule doesn’t allow mixup of
  - `es6` style **imports** `import { Request, Response } from 'express'` with
  - `commonjs` style **exports** `module.exports = {getCatByIdHandler};`

```bash
import/no-import-module-exports: off
```

- Ignore `dist` folder

```bash
ignorePatterns:
  - dist
```

## tsconfig.eslint.json

- If files are excluded in `tsconfig.json` but included in `eslint.config`, we get error that files is excluded in one config and included in one config.
- We can create `tsconfig.eslint.json` config file for eslint

```bash
{
  "include": [
    "jest/setup/**/*",
    "**/__tests__/*",
    "**/__mocks__/*",
  ]
}
```

# Add pre-commit hook

- Adding this hook ensures that eslint or any other custom script runs before code commit.

## Install husky

- creates a pre-commit hook to run `npm run lint:check`

```bash
npm i -D husky
```

- Install config package
  - creates a `.husky` folder with `git pre-commit hook`

```bash
npx husky-init
```

- Configure `pre-commit` in `.husky` folder

```yaml
npm run lint:check
npm run lint:fix
# npx lint-staged
```

### Add Scripts

- Run this script after `npm i` to setup husky

```json
"scripts": {
    "prepare": "husky install"
  },
```

## Install lint-staged

- adds capability to run `npm run lint:check` only on staged files

```bash
npm i -D lint-staged
```

- create `.lintstagedrc.yml` for configuration

```yaml
"*":
  - npm run lint:check
  - npm run lint:fix
```

# Changes in code

- Typescript is interoperable with **commonjs,** because of property `esModuleInterop` enable in `tsconfig`
- But it is better to replace `require()` and `module.exports` with `es6 syntax`, because IntelliSense doesn’t work with Typescript.
- Change all common js `imports` and `exports` to **es6**, otherwise rule `@typescript-eslint/no-var-requires` will create build issues, unless we turn off this rule.
  - works with imports from `js` files but not from `ts` files
  - Don’t work means issues with TS intellisense and Eslint

## TS Files should have

- import

```bash
const { HTTPStatusCodes } = require('../../constants');

to

import { HTTPStatusCodes } from '../../constants';
```

- export

```bash
module.exports = {
  HTTPStatusCodes,
};

to

export { HTTPStatusCodes }
```

## JS Files can have

- import

```bash
const { HTTPStatusCodes } = require('../../constants');
```

- export

```bash
module.exports = {
  HTTPStatusCodes,
};
```

# Jest

## Install

```bash
npm install --save-dev jest
```

## Install jest Types

```bash
npm install --save-dev @types/jest @jest/globals
```

## Install jest eslint plugin

```bash
npm i --save-dev eslint-plugin-jest
```

## Install ts-jest

- provides ts support for jest

```bash
npm install --save-dev ts-jest
```

## eslintrc

### env

```yaml
env:
  jest: true
```

### files

- register rules for test related files

```yaml
- files:
	- "./src/**/__tests__/*.test.*"
	- "./src/**/__mocks__/**/*.js"
	- "./jest/**/*.js"
```

## Add Scripts

- Add scripts in `package.json`

```json
"scripts": {
    "test:setup": "jest --init",
    "test:clear": "jest --clear-cache",
    "test": "cross-env NODE_ENV=development jest --config ./jest/setup/jest.config.js --runInBand",
  },
```

## tsconfig.json

### exclude

- Won’t build these files, hence won’t be added to `outDir`

```bash
{
  "exclude": [
    "jest/**/*",
    "**/__mocks__/*",
    "**/__tests__/*"
  ]
}
```

## tsconfig.build.json

- Excludes files from build process. Won’t be adde to `dist` folder

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["jest/**/*", "**/__mocks__/*", "**/__tests__/*"]
}
```

## Jest config

### Add preset

```bash
preset: 'ts-jest',
```

### With JS files

- JS files using `import/export` like `ts` and `es6` but project is `commonjs`.
- If we run tests we will get error, _"Cannot use import statement outside a module" from Jest when running tests?_
- To avoid this error we need to use `babel`

**Install babel**

```bash
npm i babel-jest @babel/preset-env
```

**Create `babel.config.js`**

```bash
module.exports = {presets: ['@babel/preset-env']}
```

**Changes in jest.config.ts**

- Add separate transformers for `js` and `ts` files.

```json
transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  }
```

# Supertest

## Install

```bash
npm install supertest --save-dev
```

## Install Types

```bash
npm install --save-dev @types/supertest
```

## global definiton

- We can bypass `eslint` checks by adding global variables in `eslint globals` section.
- But it won’t pass with Typescript type checking. To pass type checking we have to create `*.d.ts` file.

### Way 1

- create `global.d.ts` file

```yaml
// way 1
declare const request: {
  get(params?: any): any,
  query(params?: any): any,
  send(): any,
};
```

### Way 2

- create `global.d.ts` file

```yaml
// way 2
export {};
declare global {
  const request: {
    get(params?: any): any,
    query(params?: any): any,
    send(): any,
  };
  const closeServer: any;
}
```

# Final Configuration

## nodemon.json

```jsx
{
  "restartable": "rs",
  "ignore": [".git", "node_modules/**/node_modules"],
  "verbose": true,
  "watch": ["src/"],
  "ext": "js,ts,json"
}
```

## package.json

```jsx
{
  "name": "with-commonjs-ts-eslint-jest",
  "version": "1.0.0",
  "description": "template project for express + nodejs + commonjs + ts + eslint + jest + supertest",
  "main": "dist/app.js",
  "scripts": {
    "dev": "cross-env NODE_ENV=development nodemon src/app.ts",
    "prod": "cross-env NODE_ENV=production nodemon src/app.ts",
    "build": "tsc",
    "start": "tsc && node .",
    "tsc:setup": "tsc --init",
    "lint:setup": "npm init @eslint/config",
    "lint:check": "eslint .",
    "lint:fix": "eslint --fix .",
    "test:setup": "jest --init",
    "test:clear": "jest --clear-cache",
    "test": "cross-env NODE_ENV=development jest --config ./jest/setup/jest.config.ts --runInBand",
    "prepare": "husky install"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "keywords": [
    "express",
    "nodejs",
    "dotenv",
    "crossenv",
    "commonjs",
    "typescript",
    "eslint",
    "jest",
    "supertest"
  ],
  "author": "deltacap019",
  "license": "ISC",
  "dependencies": {
    "@babel/preset-env": "7.22.15",
    "axios": "1.5.0",
    "babel-jest": "29.7.0",
    "cross-env": "7.0.3",
    "dotenv": "16.3.1",
    "express": "4.18.2",
    "express-async-handler": "1.2.0",
    "joi": "17.10.1",
    "mongoose": "7.5.0",
    "node-cache": "5.1.2"
  },
  "devDependencies": {
    "@jest/globals": "29.6.4",
    "@types/express": "4.17.17",
    "@types/jest": "29.5.4",
    "@types/node": "20.5.9",
    "@types/supertest": "2.0.12",
    "@typescript-eslint/eslint-plugin": "6.6.0",
    "@typescript-eslint/parser": "6.6.0",
    "eslint": "8.48.0",
    "eslint-config-airbnb-base": "15.0.0",
    "eslint-config-airbnb-typescript": "17.1.0",
    "eslint-plugin-import": "2.28.1",
    "eslint-plugin-security": "1.7.1",
    "husky": "8.0.3",
    "jest": "29.6.4",
    "lint-staged": "14.0.1",
    "nodemon": "3.0.1",
    "supertest": "6.3.3",
    "ts-jest": "29.1.1",
    "ts-jest-resolver": "2.0.1",
    "ts-node": "10.9.1",
    "typescript": "5.2.2"
  }
}
```

## husky pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint:check
npm run lint:fix
npm run test
# npx lint-staged
```

## .eslintrc.yml

```yaml
env:
  browser: true
  commonjs: true
  es2021: true
extends:
  - airbnb-base
  - airbnb-typescript/base
  - plugin:security/recommended
  - plugin:import/recommended
  - plugin:@typescript-eslint/recommended
parser: "@typescript-eslint/parser"
parserOptions:
  ecmaVersion: latest
  project:
    - "./tsconfig.json"
    - "./tsconfig.eslint.json"
plugins:
  - "@typescript-eslint"
ignorePatterns:
  - dist
  - jest/coverage
  - jest/output
  - babel.config.js
# common rules for all files
rules:
  no-underscore-dangle:
    - error
    - allow:
        - _id
  linebreak-style: off
  import/prefer-default-export: off
  import/no-extraneous-dependencies: off
  import/no-import-module-exports: off
  arrow-body-style: off
overrides:
  # js
  - files:
      - "*.js"
      - "*.mjs"
    rules:
      "@typescript-eslint/no-var-requires": off
  # ts
  - files:
      - "*.ts"
    rules:
      "@typescript-eslint/no-explicit-any": off
      "@typescript-eslint/no-unused-vars":
        - "error"
        - "args": "none"
  # jest
  - files:
      - "./src/**/__tests__/*.test.ts"
      - "./src/**/__mocks__/**/*.ts"
      - "./jest/setup/**/*.ts"
    env:
      jest: true
    globals:
      request: readonly
      closeServer: readonly
    rules:
      global-require: off
      max-len: off
      import/namespace: off
      import/first: off
      "@typescript-eslint/ban-ts-comment": off
```

## Jest Config

```jsx
const config = {
  rootDir: "../../",
  roots: ["<rootDir>"],
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFiles: [
    "<rootDir>/jest/setup/jest.setup.js",
    "<rootDir>/jest/setup/globals.js",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest/setup/jest.setup.after-env.js"],
  testMatch: ["<rootDir>/src/**/__tests__/**/*.[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**"],
  coverageDirectory: "./jest/coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  testTimeout: 60 * 1000,
};
```

## tsconfig.eslint.json

```json
{
  "include": ["jest/setup/**/*", "**/__tests__/*", "**/__mocks__/*"]
}
```

## tsconfig.build.json

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["jest/**/*", "**/__mocks__/*", "**/__tests__/*"]
}
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2016" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,
    "moduleDetection": "force" /* Control what method is used to detect module-format JS files. */,
    "module": "commonjs" /* Specify what module code is generated. */,
    "rootDir": "./" /* Specify the root folder within your source files. */,
    "allowJs": true /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */,
    "checkJs": true /* Enable error reporting in type-checked JavaScript files. */,
    "outDir": "./dist" /* Specify an output folder for all emitted files. */,
    "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */,
    "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,
    "strict": true /* Enable all strict type-checking options. */,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  },
  "include": ["src/**/*", "jest/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

# Template

```bash
npx degit "https://github.com/templates-deltacap019/with-commonjs-ts-eslint-jest-supertest.git" "my_proj"
```
