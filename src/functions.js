import _ from 'lodash';

export const getKeys = (data) => Object.keys(data);

export const getUniqueKeysSorted = (arr1, arr2) => {
  const unique = Array.from(new Set([...arr1, ...arr2]));
  return _.sortBy(unique);
};

export const getIndentation = (depth) => ' '.repeat(2 + depth * 4);
