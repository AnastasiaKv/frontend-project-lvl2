import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getRelativePath = (filename) => path.join('__fixtures__', filename);
const getAbsolutePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const jsonPath1 = 'file1.json';
const jsonPath2 = 'file2.json';
const ymlPath1 = 'file1.yml';
const ymlPath2 = 'file2.yml';

test('.json files/ relative and absolute pathes', () => {
  const expected = fs.readFileSync(getAbsolutePath('expectedStylish.txt'), 'utf-8');
  const actual = genDiff(
    getRelativePath(jsonPath1),
    getRelativePath(jsonPath2),
  );
  expect(actual).toEqual(expected);
});

test('.yml files', () => {
  const expected = fs.readFileSync(getAbsolutePath('expectedStylish.txt'), 'utf-8');
  const actual = genDiff(
    getRelativePath(ymlPath1),
    getRelativePath(ymlPath2),
  );
  expect(actual).toEqual(expected);
});

test('plain formatter check', () => {
  const expected = fs.readFileSync(getAbsolutePath('expectedPlain.txt'), 'utf-8');
  const actual = genDiff(
    getAbsolutePath(jsonPath1),
    getAbsolutePath(ymlPath2),
    'plain',
  );
  expect(actual).toEqual(expected);
});

test('json formatter check', () => {
  const expected = fs.readFileSync(getAbsolutePath('expectedJson.txt'), 'utf-8');
  const actual = genDiff(
    getAbsolutePath(jsonPath1),
    getAbsolutePath(ymlPath2),
    'json',
  );
  expect(actual).toEqual(expected);
});

test('file doesn\'t exist', () => {
  expect(() => genDiff(
    getRelativePath(jsonPath1),
    'notExist.json',
  )).toThrow();

  expect(() => genDiff(
    'notExist1.json',
    'notExist2.json',
  )).toThrow();
});
