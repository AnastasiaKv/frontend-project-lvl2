import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import process from 'process';
import parser from './parsers.js';
import { stylish } from './formaters.js';

const normalizePath = (fp) => (
  path.isAbsolute(fp) ? path.normalize(fp) : path.resolve(process.cwd(), fp)
);
const readFile = (filename) => fs.readFileSync(normalizePath(filename), 'utf-8');
const getFilesData = (...paths) => paths.map((fp) => {
  try {
    return parser(readFile(fp), path.extname(fp)) || {};
  } catch (e) {
    console.error(`${fp} not found!`);
    throw e;
  }
});

/*
eslint no-param-reassign:
  ["error", { "props": true, "ignorePropertyModificationsFor": ["dicitionary"] }]
*/
const makeFlatDiff = (minorData, majorData, dicitionary, parent = null) => {
  const keys = _.union(_.keys(minorData), _.keys(majorData));

  return keys.map((key) => {
    let status = '';
    if (!_.has(minorData, key)) status = 'added';
    else if (!_.has(majorData, key)) status = 'deleted';
    else if (minorData[key] === majorData[key]) status = 'unchanged';
    else {
      if (_.isObject(minorData[key]) && _.isObject(majorData[key])) {
        const children = makeFlatDiff(minorData[key], majorData[key], dicitionary, key);
        dicitionary[key] = { children };
      }
      status = 'changed';
    }

    dicitionary[key] = { status, parent, ...dicitionary[key] };
    return key;
  });
};

const buildDiffTree = (minorData, majorData) => {
  const dictionary = {};
  makeFlatDiff(minorData, majorData, dictionary);

  const iter = (minor, major, nodes) => {
    const sortedNodes = _.sortBy(nodes);
    return sortedNodes.reduce((tree, node) => {
      const treeLevel = {};
      switch (dictionary[node].status) {
        case 'added':
          treeLevel[`+ ${node}`] = major[node];
          break;
        case 'deleted':
          treeLevel[`- ${node}`] = minor[node];
          break;
        case 'unchanged':
          treeLevel[node] = major[node];
          break;
        case 'changed':
          if (dictionary[node].children) {
            treeLevel[node] = iter(minor[node], major[node], dictionary[node].children);
          } else {
            treeLevel[`- ${node}`] = minor[node];
            treeLevel[`+ ${node}`] = major[node];
          }
          break;
        default: break;
      }
      return { ...tree, ...treeLevel };
    }, {});
  };

  const rootNodes = _.keys(dictionary).filter((key) => !dictionary[key].parent);
  return iter(minorData, majorData, rootNodes);
};

const genDiff = (filepath1, filepath2, formater = stylish) => {
  const data = getFilesData(filepath1, filepath2);
  const diffTree = buildDiffTree(...data);
  return formater(diffTree);
};

export default genDiff;
