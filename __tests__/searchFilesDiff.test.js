import _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/searchFilesDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const getExpectedData = (filename) => {
  const rawdata = readFile(filename);
  const obj = JSON.parse(rawdata);
  return _.replace(JSON.stringify(obj, null, 2), /"|,/g, '');
};

/* eslint-disable */
test('generate data diff', () => {
  const expected1 = getExpectedData('expected1.json');
  const path1 = path.join('..', '__fixtures__', 'file1.json');
  const path2 = path.join('..', '__fixtures__', 'file2.json');
  expect(genDiff(path1, path2)).toEqual(expected1);

  const expected2 = getExpectedData('expected2.json');
  const falsePath = path.join('..', '__fixtures__', 'file3.json');
  expect(genDiff(path1, falsePath)).toEqual(expected2);
});
