#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0')
  .option('-f, --format <type>', '[type]  output format', 'stylish')
  .arguments('<file1> <file2>')
  .action(() => {
    const [file1, file2] = program.args;
    const options = program.opts();
    const { format } = options;

    const diff = genDiff(file1, file2, format);
    console.log(diff);
  });

program.parse();
