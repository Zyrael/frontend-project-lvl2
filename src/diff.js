import _ from 'lodash';
import parseFile from './parsers.js';

const getSortedKeys = (data) => {
  const keys = Object.keys(data);
  return _.sortBy(keys);
};

const getDifference = (data1, data2, repeats = 1) => {
  const sorted1 = getSortedKeys(data1);
  const sorted2 = getSortedKeys(data2);

  const unique = Array.from(new Set([...sorted1, ...sorted2]));

  const spaces = ' '.repeat(repeats);
  return unique.reduce((acc, key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return getDifference(data1[key], data2[key], repeats + 2);
    }
    if (key in data1 && key in data2) {
      return (data1[key] === data2[key])
        ? [...acc, [`${spaces} `, [key, data1[key]]]]
        : [...acc, [`${spaces}-`, [key, data1[key]]], [`${spaces}+`, [key, data2[key]]]];
    }
    return (key in data1
      ? [...acc, [`${spaces}-`, [key, data1[key]]]]
      : [...acc, [`${spaces}+`, [key, data2[key]]]]);
  }, []);
};
export default (file1, file2) => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);

  return getDifference(data1, data2);
};

// const result = unique.reduce((acc, key) => {
//   if (key in data1 && key in data2) {
//     return (data1[key] === data2[key]
//       ? `${acc}    ${key}: ${data1[key]}\n`
//       : `${acc}  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`);
//   }
//   return (key in data1
//     ? `${acc}  - ${key}: ${data1[key]}\n`
//     : `${acc}  + ${key}: ${data2[key]}\n`);
// }, '');
//
// return `{\n${result}}`;
