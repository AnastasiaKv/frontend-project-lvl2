import * as fs from 'fs';
import * as path from 'path';
import process from 'process';
import parser from './parsers.js';
import formatter from './formatters/index.js';
import genFlatDiffTree from './genFlatDiffTree.js';

const normalizePath = (filepath) => path.resolve(process.cwd(), filepath);
const readFile = (filepath) => fs.readFileSync(normalizePath(filepath), 'utf-8');
const getFileExtname = (filepath) => path.extname(filepath).replace('.', '');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const normalizedFilepath1 = normalizePath(filepath1);
  const normalizedFilepath2 = normalizePath(filepath2);

  const extname1 = getFileExtname(normalizedFilepath1);
  const extname2 = getFileExtname(normalizedFilepath2);

  const fileData1 = readFile(normalizedFilepath1);
  const fileData2 = readFile(normalizedFilepath2);

  const parsedFileData1 = parser(fileData1, extname1);
  const parsedFileData2 = parser(fileData2, extname2);

  const flatDiff = genFlatDiffTree(parsedFileData1, parsedFileData2);
  return formatter(formatName)(flatDiff);
};

export default genDiff;
