import _ from 'lodash';
import genDiff from '../src/searchFilesDiff.js';

const diff = {
  "- follow": false,
  "  host": "hexlet.io",
  "- proxy": "123.234.53.22",
  "- timeout": 50,
  "+ timeout": 20,
  "+ verbose": true
};
const jsonDiff = _.replace(JSON.stringify(diff, null, 2), /"/g, '');

test('genDiff', () => {
  const path1 = 'file1.json';
  const path2 = 'file2.json';
  expect(genDiff(path1, path2)).toEqual(jsonDiff);
});