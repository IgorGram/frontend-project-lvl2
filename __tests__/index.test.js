import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const filesForCheck = [
  ['file1.json', 'file2.json', 'expectedStylish.txt'],
  ['file1.yml', 'file2.yml', 'expectedStylish.txt'],
  ['file1.json', 'file2.json', 'expectedPlain.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'expectedPlain.txt', 'plain'],
  ['file1.json', 'file2.json', 'expectedJson.json', 'json'],
  ['file1.yml', 'file2.yml', 'expectedJson.json', 'json'],
];

test.each(filesForCheck)('gendiff %s and %s in stylish', (file1, file2, expectedResult, format = 'stylish') => {
  const path1 = getFixturePath(file1);
  const path2 = getFixturePath(file2);

  expect(gendiff(path1, path2, format)).toEqual(readFile(expectedResult));
});
