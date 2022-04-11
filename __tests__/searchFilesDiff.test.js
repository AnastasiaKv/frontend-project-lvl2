import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturesPath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filepath) => fs.readFileSync(getFixturesPath(filepath), 'utf-8');

const extensions = ['json', 'yml'];
const expectedData = {
  stylish: '',
  plainh: '',
  json: '',
};

beforeAll(() => {
  _.assign(expectedData, { stylish: readFile('expectedStylish.txt') });
  _.assign(expectedData, { plain: readFile('expectedPlain.txt') });
  _.assign(expectedData, { json: readFile('expectedJson.txt') });
});

test.each(extensions)('gendiff %s format file', (extname) => {
  const beforeFile = getFixturesPath(`before.${extname}`);
  const afterFile = getFixturesPath(`after.${extname}`);

  expect(genDiff(beforeFile, afterFile)).toEqual(expectedData.stylish);
  expect(genDiff(beforeFile, afterFile, 'stylish')).toEqual(expectedData.stylish);
  expect(genDiff(beforeFile, afterFile, 'plain')).toEqual(expectedData.plain);
  expect(genDiff(beforeFile, afterFile, 'json')).toEqual(expectedData.json);
});
