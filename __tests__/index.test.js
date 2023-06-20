import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8');

test('json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  expect(gendiff(path1, path2)).toEqual(readFile.trim());
});

test('yml', () => {
  const path1 = getFixturePath('file1.yml');
  const path2 = getFixturePath('file2.yml');
  expect(gendiff(path1, path2)).toEqual(readFile.trim());
});
