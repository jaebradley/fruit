#!/usr/bin/env node

import program from 'commander';

import pkg from '../package.json';

import executor from './executor';

program.version(pkg.version)
  .description('CLI that builds rollup.js starting boilerplate')
  .parse(process.argv);

executor();

