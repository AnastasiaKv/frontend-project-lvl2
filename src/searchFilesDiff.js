import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import parser from './parsers.js';
import formatter from './formatters/index.js';

const normalizePath = (fp) => (path.isAbsolute(fp) ? path.normalize(fp) : path.resolve(fp));
const readFile = (filename) => fs.readFileSync(normalizePath(filename), 'utf-8');
const getFilesData = (filepath) => {
  try {
    return parser(readFile(filepath), path.extname(filepath)) || {};
  } catch (e) {
    throw new Error(`File ${filepath} doesn't exist!`);
  }
};

/*
eslint no-param-reassign:
  ["error", { "props": true, "ignorePropertyModificationsFor": ["dicitionary"] }]
*/
const genFlatDiff = (minorData, majorData) => {
  const iter = (minor, major, dicitionary, parent = null) => {
    const keys = _.sortBy(_.union(_.keys(minor), _.keys(major)));
    return keys.map((key) => {
      let status = 'original';
      let value = minor[key];
      if (!_.has(minor, key)) {
        status = 'added';
        value = major[key];
      } else if (!_.has(major, key)) {
        status = 'removed';
      } else if (minor[key] !== major[key]) {
        status = 'updated';
        value = [minor[key], major[key]];
        if (_.isObject(minor[key]) && _.isObject(major[key])) {
          const children = iter(minor[key], major[key], dicitionary, key);
          dicitionary[key] = { children };
        }
      }
      dicitionary[key] = {
        status, value, parent, ...dicitionary[key],
      };
      return key;
    });
  };
  const flatDiff = {};
  iter(minorData, majorData, flatDiff);

  return flatDiff;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = getFilesData(filepath1);
  const fileData2 = getFilesData(filepath2);
  const flatDiff = genFlatDiff(fileData1, fileData2);
  return formatter(formatName)(flatDiff);
};

export default genDiff;
