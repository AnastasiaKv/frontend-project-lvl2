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

const genFlatDiff = (minorData, majorData) => {
  const dicitionary = {};

  const iter = (minor, major, parent = '') => {
    const keys = _.sortBy(_.union(_.keys(minor), _.keys(major)));
    return keys.map((key) => {
      const propPath = (parent.length ? `${parent}.${key}` : key);
      const dicitionaryItem = {
        status: 'original',
        key,
        value: minor[key],
        parent,
      };
      if (!_.has(minor, key)) {
        dicitionaryItem.status = 'added';
        dicitionaryItem.value = major[key];
      } else if (!_.has(major, key)) {
        dicitionaryItem.status = 'removed';
      } else if (minor[key] !== major[key]) {
        dicitionaryItem.status = 'updated';
        dicitionaryItem.value = [minor[key], major[key]];
        if (_.isObject(minor[key]) && _.isObject(major[key])) {
          dicitionaryItem.children = iter(minor[key], major[key], propPath);
        }
      }

      dicitionary[propPath] = { ...dicitionaryItem };
      return propPath;
    });
  };

  iter(minorData, majorData);
  return dicitionary;
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const fileData1 = getFilesData(filepath1);
  const fileData2 = getFilesData(filepath2);
  const flatDiff = genFlatDiff(fileData1, fileData2);
  return formatter(formatName)(flatDiff);
};

export default genDiff;
