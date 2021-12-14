import _ from 'lodash';
import parseFile from './parsers.js';
import format from './formatters/index.js';

const getDifference = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const unique = Array.from(new Set([...keys1, ...keys2]));
  const sorted = _.sortBy(unique);

  return sorted.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key, value: getDifference(value1, value2),
      };
    }
    if (key in data1 && key in data2) {
      return value1 === value2
        ? {
          key, value: value1,
        }
        : {
          difference: 'update',
          key,
          value: [{
            difference: 'remove', key, value: value1,
          }, {
            difference: 'add', key, value: value2,
          }],
        };
    }
    return key in data1
      ? {
        difference: 'remove', key, value: value1,
      }
      : {
        difference: 'add', key, value: value2,
      };
  });
};

export default (file1, file2, formatName = 'stylish') => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);

  const diff = getDifference(data1, data2);
  return format(diff, formatName);
};
