import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parse from './parsers.js';

const gendiff = (filepath1, filepath2) => {
  const fullFilePath1 = path.resolve(process.cwd(), filepath1);
  const fullFilePath2 = path.resolve(process.cwd(), filepath2);

  const extractFormat = (filepath) => path.extname(filepath).slice(1);

  const data1 = parse(fs.readFileSync(fullFilePath1, 'utf-8'), extractFormat(fullFilePath1));
  const data2 = parse(fs.readFileSync(fullFilePath2, 'utf-8'), extractFormat(fullFilePath1));

  const arr = _.union(Object.keys(data1), Object.keys(data2));
  arr.sort();

  const result = arr.map((item) => {
    if (!_.has(data1, item)) return _.has(data2, item) ? ` + ${item}: ${data2[item]}\n` : '';
    if (!_.has(data2, item)) return _.has(data1, item) ? ` - ${item}: ${data1[item]}\n` : '';
    if (_.has(data1, item) && _.has(data2, item)) {
      if (data1[item] !== data2[item]) {
        return ` - ${item}: ${data1[item]}\n + ${item}: ${data2[item]}\n`;
      }
      return `   ${item}: ${data1[item]}\n`;
    }
    return '';
  });
  const start = '{\n';
  const end = '}';
  return `${start}${result.join('')}${end}`;
};
export default gendiff;
