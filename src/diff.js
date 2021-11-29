import _ from 'lodash';
import parseFile from './parsers.js';
import stylish from './stylish.js';
import { getKeys, getUniqueKeysSorted } from './functions.js';

const getDifference = (data1, data2, depth = 0) => {
  const keys1 = getKeys(data1);
  const keys2 = getKeys(data2);

  const sorted = getUniqueKeysSorted(keys1, keys2);

  return sorted.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return [...acc, {
        depth, op: ' ', key, value: getDifference(value1, value2, depth + 1),
      }];
    }
    if (key in data1 && key in data2) {
      return value1 === value2
        ? [...acc, {
          depth, op: ' ', key, value: value1,
        }]
        : [...acc, {
          depth, op: '-', key, value: value1,
        }, {
          depth, op: '+', key, value: value2,
        }];
    }
    return key in data1
      ? [...acc, {
        depth, op: '-', key, value: value1,
      }]
      : [...acc, {
        depth, op: '+', key, value: value2,
      }];
  }, []);
};

export default (file1, file2, format = 'stylish') => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);

  const diff = getDifference(data1, data2);
  switch (format) {
    case 'stylish':
      return stylish(diff);
    default:
      throw (new Error(`There is no such format: ${format}`));
  }
};
