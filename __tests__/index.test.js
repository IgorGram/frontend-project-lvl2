import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJson = readFile('expectedJson.json');

test.each(['json', 'yml'])('gendiff %s in stylish', (format) => {
  const path1 = getFixturePath(`file1.${format}`);
  const path2 = getFixturePath(`file2.${format}`);

  expect(gendiff(path1, path2)).toEqual(expectedStylish);
  expect(gendiff(path1, path2, 'stylish')).toEqual(expectedStylish);
});

test.each(['json', 'yml'])('gendiff %s in plain', (format) => {
  const path1 = getFixturePath(`file1.${format}`);
  const path2 = getFixturePath(`file2.${format}`);

  expect(gendiff(path1, path2, 'plain')).toEqual(expectedPlain);
});

test.each(['json', 'yml'])('gendiff %s in json', (format) => {
  const path1 = getFixturePath(`file1.${format}`);
  const path2 = getFixturePath(`file2.${format}`);

  expect(gendiff(path1, path2, 'json')).toEqual(expectedJson);
});
