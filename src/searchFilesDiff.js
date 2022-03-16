import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

const normalizePath = (fp) => (
  !path.isAbsolute(fp) ? path.resolve(process.cwd(), fp) : path.normalize(fp)
);

const getFileData = (filepath) => {
  // const extname = path.extname(fp1); //.json
  try {
    const rawdata = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(rawdata);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getFileData(normalizePath(filepath1));
  const data2 = getFileData(normalizePath(filepath2));

  const diff = {};
  const dataKeys1 = Object.keys(data1);
  const dataKeys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(dataKeys1, dataKeys2));

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
  return _.replace(jsonDiff, /"/g, '');
};

export default genDiff;
