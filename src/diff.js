import _ from 'lodash';
import parseFile from './parsers.js';

const getSortedKeys = (data) => {
  const keys = Object.keys(data);
  return _.sortBy(keys);
};

export default (file1, file2) => {
  const data1 = parseFile(file1);
  const data2 = parseFile(file2);

  const sorted1 = getSortedKeys(data1);
  const sorted2 = getSortedKeys(data2);

  const unique = Array.from(new Set([...sorted1, ...sorted2]));

  const result = unique.reduce((acc, key) => {
    if (key in data1 && key in data2) {
      return (data1[key] === data2[key]
        ? `${acc}    ${key}: ${data1[key]}\n`
        : `${acc}  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}\n`);
    }
    return (key in data1
      ? `${acc}  - ${key}: ${data1[key]}\n`
      : `${acc}  + ${key}: ${data2[key]}\n`);
  }, '');

  return `{\n${result}}`;
};
