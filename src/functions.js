import _ from 'lodash';
import fs from 'fs';

const getRawData = (filepath) => {
  const openedFile = fs.openSync(filepath);
  return fs.readFileSync(openedFile, 'utf-8');
};

const getKeys = (data) => Object.keys(data);

const getUniqueKeysSorted = (arr1, arr2) => {
  const unique = Array.from(new Set([...arr1, ...arr2]));
  return _.sortBy(unique);
};

const getIndentation = (depth) => ' '.repeat(2 + depth * 4);

export {
  getRawData, getKeys, getUniqueKeysSorted, getIndentation,
};
