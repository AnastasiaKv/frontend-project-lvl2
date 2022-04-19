import { readFileSync } from 'fs';
import path from 'path';
import parser from './parsers.js';
import formatter from './formatters/index.js';
import genDiffTree from './genDiffTree.js';

const readFile = (filepath) => readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
const getFileExtname = (filepath) => path.extname(filepath).replace('.', '');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const extname1 = getFileExtname(filepath1);
  const extname2 = getFileExtname(filepath2);

  const fileData1 = readFile(filepath1);
  const fileData2 = readFile(filepath2);

  const parsedFileData1 = parser(fileData1, extname1);
  const parsedFileData2 = parser(fileData2, extname2);

  const diffTree = genDiffTree(parsedFileData1, parsedFileData2);
  return formatter(formatName)(diffTree);
};

export default genDiff;
