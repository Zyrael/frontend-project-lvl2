#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0')
  .option('-f, --format', '[type]  output format')
  .arguments('<file1> <file2>')
  .action(() => {
    const [file1, file2] = program.args;

    const diff = genDiff(file1, file2);
    console.log(diff);
  });

program.parse();
