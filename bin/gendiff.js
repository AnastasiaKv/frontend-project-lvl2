#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/searchFilesDiff.js';
import { plain } from '../src/formaters.js';

const formater = (fp1, fp2, format) => {
  switch (format) {
    case 'plain': return genDiff(fp1, fp2, plain);
    default: return genDiff(fp1, fp2);
  }
};
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(formater(filepath1, filepath2, options.format));
  });

program.parse();
