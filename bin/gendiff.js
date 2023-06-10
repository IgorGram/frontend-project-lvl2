#!/usr/bin/env node
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const program = new Command();

const command = (filepath1, filepath2) => {
  const fullFilePath1 = path.resolve(process.cwd(), filepath1);
  const fullFilePath2 = path.resolve(process.cwd(), filepath2);

  const file1 = fs.readFileSync(fullFilePath1);
  const file2 = fs.readFileSync(fullFilePath2);

  const json1 = JSON.parse(file1);
  const json2 = JSON.parse(file2);

  const arr = _.union(Object.keys(json1), Object.keys(json2));
  arr.sort();

  const result = arr.map((item) => {
    if (!_.has(json1, item)) return _.has(json2, item) ? ` + ${item}: ${json2[item]}\n` : '';
    if (!_.has(json2, item)) return _.has(json1, item) ? ` - ${item}: ${json1[item]}\n` : '';
    if (_.has(json1, item) && _.has(json2, item)) {
      if (json1[item] !== json2[item]) {
        return ` - ${item}: ${json1[item]}\n + ${item}: ${json2[item]}\n`;
      }
      return `   ${item}: ${json1[item]}\n`;
    }
    return '';
  });
  const start = '{\n';
  const end = '}';
  console.log(`${start}${result.join('')}${end}`);
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .arguments('<filepath1>, <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action(command);

program.parse();
