import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import format from './formatters/index.js';

const getRawData = (fileName) => {
  const filepath = path.resolve(fileName);
  const openedFile = fs.openSync(filepath, 'r');
  return fs.readFileSync(openedFile, 'utf-8');
};

const getDifference = (data1, data2) => {
  const keys = Array.from(new Set([...Object.keys(data1), ...Object.keys(data2)]));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return { key, children: getDifference(value1, value2) };
    }

    if (_.has(data1, [key]) && _.has(data2, [key])) {
      if (value1 === value2) return { key, value1 };
      return {
        difference: 'update', key, value1, value2,
      };
    }

    if (_.has(data1, [key])) return { difference: 'remove', key, value1 };

    return { difference: 'add', key, value2 };
  });
};

export default (file1, file2, formatName = 'stylish') => {
  const rawData1 = getRawData(file1);
  const rawData2 = getRawData(file2);

  const data1 = parseFile(rawData1, path.extname(file1));
  const data2 = parseFile(rawData2, path.extname(file2));

  const diff = getDifference(data1, data2);
  return format(diff, formatName);
};
