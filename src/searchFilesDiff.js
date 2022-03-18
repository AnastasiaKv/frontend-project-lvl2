import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import process from 'process';
import parser from './parsers.js';

const normalizePath = (fp) => (
  !path.isAbsolute(fp) ? path.resolve(process.cwd(), fp) : path.normalize(fp)
);
const readFile = (filename) => fs.readFileSync(normalizePath(filename), 'utf-8');

const getFileData = (filepath) => {
  try {
    return parser(readFile(filepath), path.extname(filepath));
  } catch (e) {
    console.error(`${filepath} not found!`);
    throw e;
  }
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getFileData(filepath1) || {};
  const data2 = getFileData(filepath2) || {};

  const dataKeys1 = Object.keys(data1);
  const dataKeys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(dataKeys1, dataKeys2));
  const diff = {};

  keys.forEach((key) => {
    if (!_.has(data1, key)) diff[`+ ${key}`] = data2[key];
    if (!_.has(data2, key)) diff[`- ${key}`] = data1[key];
    if (data1[key] === data2[key]) diff[`  ${key}`] = data1[key];
    else {
      diff[`- ${key}`] = data1[key];
      diff[`+ ${key}`] = data2[key];
    }
  });

  const jsonDiff = JSON.stringify(diff, null, 2);
  return _.replace(jsonDiff, /"|,/g, '');
};

export default genDiff;
