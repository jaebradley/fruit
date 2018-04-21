# 🥝  🍋  🍐  🍓  🍊  🍍  🍰  fruit 🍒  🍈  🍇  🍉  🍏  🍎  🍌

[![Build Status](https://travis-ci.org/jaebradley/fruit.svg?branch=master)](https://travis-ci.org/jaebradley/fruit)
[![npm](https://img.shields.io/npm/dt/@jaebradley/fruit.svg)](https://www.npmjs.com/package/@jaebradley/fruit)
[![npm](https://img.shields.io/npm/v/@jaebradley/fruit.svg)](https://www.npmjs.com/package/@jaebradley/fruit)

Build your [`rollup.js`](https://rollupjs.org/guide) library boilerplate in seconds.<sup>[1](#build-in-seconds-footnote)</sup>

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
* [Configuration Options](#configuration-option)
  * [Node](#node)
  * [React](#react)
  * [`commitlint`](#commitlint)
  * [`semantic-release`](#semantic-release)

## Introduction

There are two main libraries used to bundle JavaScript - [`rollup`](https://rollupjs.org/guide) and [`webpack`](https://webpack.js.org).

[The general consensus](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c) is that `rollup` should be used for building libraries and `webpack` should be used for building applications.

This is because [`webpack` comes with features like hot module reloading (which has obvious benefits for applications) while `rollup` "scope hoists", which guarantees smaller bundles than `webpack`](https://stackoverflow.com/a/43255948/5225575).

However, there is a decent amount of boilerplate associated with configuring a baseline `rollup` library (`.eslintrc`, `travis.yml`, `.babelrc`, `jest`, etc.).

`fruit` aims to generate `rollup` library boilerplate (using some preferred configuration options) so that you can start building your library right away.

## Installation

```bash
npm install @jaebradley/fruit --global
```

## Usage

Execute `fruit` via the command line and then follow the configuration options

![configuration-options](https://imgur.com/rsAx6CG.gif)

which will install dependencies and generate a basic bundle, with "logic" for placeholder library exports.

![bundle-generation](https://imgur.com/FwCdIln.gif)

## Configuration Options

Right now, there are two different types of libraries you can generate boilerplate for - `Node` and `React`.

Both come with

* [`eslint`](https://eslint.org)
  * Extends from [Airbnb's `eslint` config](https://www.npmjs.com/package/eslint-config-airbnb)
* [`Babel 7`](https://babeljs.io/blog/2017/03/01/upgrade-to-babel-7)
  * Specifically
    * [`@babel/cli`](https://www.npmjs.com/package/@babel/cli)
    * [`@babel/core`](https://www.npmjs.com/package/@babel/core)
    * [`@babel/preset-env`](https://www.npmjs.com/package/@babel/preset-env)
    * `babel-core` (the `7.0.0-bridge.0` version to [play nicely with `jest`](https://facebook.github.io/jest/docs/en/getting-started.html#using-babel))
* [`jest`](https://facebook.github.io/jest/)
  * Run tests by executing `npm run test`
* [`rollup`](https://rollupjs.org/guide/en) (duh)
  * [`rollup-plugin-babel`](https://www.npmjs.com/package/rollup-plugin-babel)
  * [`rollup-plugin-babel-minify`](https://www.npmjs.com/package/rollup-plugin-babel)
  * [`rollup-plugin-commonjs`](https://www.npmjs.com/package/rollup-plugin-commonjs)
  * [`rollup-plugin-filesize`](https://www.npmjs.com/package/rollup-plugin-filesize)
  * [`rollup-plugin-local-resolve`](https://www.npmjs.com/package/rollup-plugin-local-resolve)
  * [`rollup-plugin-node-resolve`](https://www.npmjs.com/package/rollup-plugin-node-resolve)
* A `.travis.yml` configuration file that will build, lint, and test your project for the latest version of `Node@8` and the latest version of `npm@5`
  * Runs the `npm run deploy` script on `master` (this defaults to a no-op for the non-`semantic-release` option
* Will initialize `git`
* An entry point at `src/index.js`
* Building `umd`, `cjs`, and `es` modules that will output to `build/index.js`, `build/index.cjs.js`, and `build/index.esm.js` respectively.

### Node

#### Node Library Directory Structure (with `commitlint`ing)

```text
/some/project/path
├── .babelrc
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .npmignore
├── .travis.yml
├── build
|  ├── index.cjs.js
|  ├── index.esm.js
|  └── index.js
├── commitlint.config.js
├── package-lock.json
├── package.json
├── rollup.config.js
└── src
   ├── index.js
   └── index.test.js
```

### `React`

This option also comes with the following additional dependencies

#### Production Dependencies

* `react`
* `react-dom`
* `prop-types`

#### Development Dependencies

* [`@babel/preset-react`](https://www.npmjs.com/package/@babel/preset-react)
* [`enzyme`](https://www.npmjs.com/package/enzyme)
* [`rollup-plugin-peer-deps-external`](https://www.npmjs.com/package/rollup-plugin-peer-deps-external)
* [`rollup-plugin-postcss`](https://www.npmjs.com/package/rollup-plugin-postcss)

It also comes with [`Storybook`](https://github.com/storybooks/storybook) which makes it easy to display different component use-cases.

You can run Storybook locally, on port `6006` by executing the `storybook` `npm` script (`npm run storybook`).

### React Library Directory Structure (with `commitlint`ing)

```text
/some/project/path
├── .babelrc
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .npmignore
├── .storybook
|  ├── addons.js
|  ├── config.js
|  └── webpack.config.js
├── .travis.yml
├── build
|  ├── index.cjs.css
|  ├── index.cjs.js
|  ├── index.css
|  ├── index.esm.css
|  ├── index.esm.js
|  └── index.js
├── commitlint.config.js
├── package-lock.json
├── package.json
├── rollup.config.js
└── src
   ├── AnExample
   |  ├── AnExample.scss
   |  ├── AnExample.stories.jsx
   |  ├── AnExample.test.jsx
   |  └── index.jsx
   ├── AnotherExample
   |  ├── AnotherExample.scss
   |  ├── AnotherExample.stories.jsx
   |  ├── AnotherExample.test.jsx
   |  └── index.jsx
   ├── index.js
   └── setupTest.js
```

### `commitlint`

I like [`commitlint`](https://github.com/marionebl/commitlint)ing.

If you select the `commitlint` feature, it'll add the following development dependencies

* [`@commitlint/cli`](https://github.com/marionebl/commitlint/blob/master/@commitlint/cli)
* [`@commitlint/config-angular`](https://www.npmjs.com/package/@commitlint/config-angular)
  * The default commit convention is [`Angular`](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)
* [`@commitlint/prompt`](https://www.npmjs.com/package/@commitlint/prompt)
* [`@commitlint/prompt-cli`](https://www.npmjs.com/package/@commitlint/prompt-cli)
* [`husky`](https://www.npmjs.com/package/husky)

and the following `npm` `scripts`

* `commitmsg`
  * A commit message `.git` hook that will trigger `commitlint`
* `gc`
  * Triggers [the `@commitlint/cli`](https://github.com/marionebl/commitlint/tree/master/@commitlint/cli) to help build a syntactically correct commit message

### `semantic-release`

I like to automate package deployment using [`semantic-release`](https://github.com/semantic-release/semantic-release).

If you select the `semantic-release` feature, the following dependencies will be added

* [`semantic-release`](https://www.npmjs.com/package/semantic-release)
* [`travis-deploy-once`](https://www.npmjs.com/package/travis-deploy-once)

along with the following `npm` `scripts`

* `deploy`
  * which will trigger the `semantic-release` deploy process
* `semantic-release` (for use in `npm run deploy`)
* `travis-deploy-once` (for use in `npm run deploy`)

### Footnotes

<a name="build-in-seconds-footnote"><sup>1</sup></a> Ok, maybe more like "many seconds" - there's a lot to install!
