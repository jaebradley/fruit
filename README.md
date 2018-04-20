# 🥝  🍋  🍐  🍓  🍊  🍍  🍰  fruit 🍒  🍈  🍇  🍉  🍏  🍎  🍌

[![Build Status](https://travis-ci.org/jaebradley/fruit.svg?branch=master)](https://travis-ci.org/jaebradley/fruit)
[![npm](https://img.shields.io/npm/dt/@jaebradley/fruit.svg)](https://www.npmjs.com/package/@jaebradley/fruit)
[![npm](https://img.shields.io/npm/v/@jaebradley/fruit.svg)](https://www.npmjs.com/package/@jaebradley/fruit)

Build your [`rollup.js`](https://rollupjs.org/guide) library boilerplate in seconds. Has opinions, mostly mine.

## Introduction

There are two main libraries used to bundle JavaScript - [`rollup.js`](https://rollupjs.org/guide) and [`webpack`](https://webpack.js.org).

It seems like [the general consensus](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c) is that `rollup.js` should be used for building libraries and `webpack` should be used for building applications.

However, there is a decent amount of boilerplate associated with configuration (`.eslintrc`, `travis.yml`, `.babelrc`, `jest`, etc.) for building `rollup.js` libraries (and `webpack` applications as well).

`fruit` aims to generate `rollup.js` library boilerplate using configuration options that I like so that you can start building your library right away.

## Installation

```bash
npm install @jaebradley/fruit --global
```

## Usage

```bash
fruit
```

and then follow the configuration options

![configuration-options](https://imgur.com/2EvRWzq.png)

### Node Library Directory Structure

![node-library-directory-structure](https://imgur.com/eHpzbfu.png)

### React Library Directory Structure

![react-library-directory-structure](https://imgur.com/XIVsvQD.png)

## Configuration Options

Right now, there are two different library types you can build: `Node` and `React`.

Both come with

* `eslint`
  * Extends from [Airbnb's `eslint` config](https://www.npmjs.com/package/eslint-config-airbnb)
* `babel`
  * Comes with `Babel 7`, specifically
    * `@babel/cli`
    * `@babel/core`
    * `@babel/preset-env`
    * `babel-core` (the `7.0.0-bridge.0` version to play nicely with `jest`)
* `jest`
  * Run tests by executing `npm run test`
* `rollup` (duh)
  * [`rollup-plugin-babel`](https://www.npmjs.com/package/rollup-plugin-babel)
  * [`rollup-plugin-babel-minify`])(https://www.npmjs.com/package/rollup-plugin-babel)
  * [`rollup-plugin-commonjs`](https://www.npmjs.com/package/rollup-plugin-commonjs)
  * [`rollup-plugin-filesize`](https://www.npmjs.com/package/rollup-plugin-filesize)
  * [`rollup-plugin-local-resolve`](https://www.npmjs.com/package/rollup-plugin-local-resolve)
  * [`rollup-plugin-node-resolve`](https://www.npmjs.com/package/rollup-plugin-node-resolve)
* A `.travis.yml` configuration file that will
  * build your package
  * lint your project
  * test your project
  * for `Node` `8`
  * and then run the `npm run deploy` script on `master` (this defaults to a no-op for the non-`semantic-release` option)
* Will initialize `git`

Both support building `umd`, `cjs`, and `es` packages that will output to `build/index.js`, `build/index.cjs.js`, and `build/index.esm.js` respectively.

It also assumes an entry point at `src/index.js`.

### `React`

This option also comes with the following additional dependencies

* `react`
* `react-dom`
* `prop-types`
* `@babel/preset-react`
* `enzyme`
* `rollup-plugin-peer-deps-external`
* `rollup-plugin-postcss`

It also comes with [`Storybook`](https://github.com/storybooks/storybook).

Storybook makes it pretty easy to test components locally.

You can run Storybook locally, on port `6006`, by executing the `storybook` `npm` script (`npm run storybook`).

### `commitlint`

I like [`commitlint`](https://github.com/marionebl/commitlint)ing. Others don't.

If you select the `commitlint` feature, it'll add the following dependencies

* `@commitlint/cli`
* `@commitlint/config-angular`
* `@commitlint/prompt`
* `@commitlint/prompt-cli`
* `husky`

and the following `npm` `scripts`

* `commitmsg`
  * A commit message `.git` hook that will trigger `commitlint`
* `gc`
  * Triggers [the `@commitlint/cli`](https://github.com/marionebl/commitlint/tree/master/@commitlint/cli) to help build a syntactically correct commit message

### `semantic-release`

I like to automate package deployment using [`semantic-release`](https://github.com/semantic-release/semantic-release). Others don't, or have another preferred methodology.

If you select the `semantic-release` feature, the following dependencies will be added

* `semantic-release`
* `travis-deploy-once`

along with the following `npm` `scripts`

* `deploy`
  * which will trigger the `semantic-release` deploy process
* `semantic-release` (for use in `npm run deploy`)
* `travis-deploy-once` (for use in `npm run deploy`)
