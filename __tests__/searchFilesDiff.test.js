import _ from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/searchFilesDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getRelativePath = (filename) => path.join('__fixtures__', filename);
const getAbsolutePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getAbsolutePath(filename), 'utf-8');
const getExpectedData = (filename) => {
  const rawdata = readFile(filename);
  const obj = JSON.parse(rawdata);
  return _.replace(JSON.stringify(obj, null, 2), /"|,/g, '');
};

const jsonPath1 = 'file1.json';
const jsonPath2 = 'file2.json';
const ymlPath1 = 'file1.yml';
const ymlPath2 = 'file2.yml';

/* eslint-disable */
test('generate data diff', () => {
  const expected = getExpectedData('expected.json');

  expect(genDiff(getRelativePath(jsonPath1), getRelativePath(jsonPath2))).toEqual(expected);
  expect(genDiff(getAbsolutePath(jsonPath1), getAbsolutePath(jsonPath2))).toEqual(expected);
  expect(genDiff(getRelativePath(ymlPath1), getRelativePath(ymlPath2))).toEqual(expected);
});

test('file doesn\'t exist', () => {
  expect(() => {
    genDiff(getRelativePath(jsonPath1), getRelativePath('notExist.json'))
  }).toThrow();

  expect(() => {
    genDiff(getRelativePath('notExist1.json'), getRelativePath('notExist2.json'))
  }).toThrow();
});
