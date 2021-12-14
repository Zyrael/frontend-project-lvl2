#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0')
  .option('-f, --format <type>', '[type]  output format', 'stylish')
  .arguments('<file1> <file2>')
  .action((file1, file2) => {
    // const { format } = program.opts();

    const diff = genDiff(file1, file2, program.opts().format);
    console.log(diff);
  });

program.parse();
