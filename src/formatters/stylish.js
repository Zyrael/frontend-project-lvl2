import _ from 'lodash';
import { getKeys, getIndentation } from '../functions.js';

const stringify = (obj, depth) => {
  const keys = getKeys(obj);
  const indent = getIndentation(depth);

  const result = keys.reduce((acc, key) => {
    const indentedKey = `${indent}  ${key}`;
    const value = obj[key];

    if (_.isObject(value)) return `${acc}${indentedKey}: {\n${stringify(value, depth + 1)}${indent}  }\n`;

    return `${acc}${indentedKey}: ${value}\n`;
  }, '');
  return `${result}`;
};

const getDiffString = (indent, difference, key, value) => {
  switch (difference) {
    case 'remove':
      return `${indent}- ${key}: ${value}\n`;
    case 'add':
      return `${indent}+ ${key}: ${value}\n`;
    default:
      return `${indent}  ${key}: ${value}\n`;
  }
};

const getIfObject = (indent, value, depth) => ((_.isObject(value))
  ? `{\n${stringify(value, depth + 1)}${indent}  }`
  : value);

const style = (diff, depth = 0) => diff
  .map(({
    difference, key, value,
  }) => {
    const indent = getIndentation(depth);
    if (difference === 'update') {
      return style(value, depth);
    }
    const completeValue = (Array.isArray(value))
      ? `{\n${style(value, depth + 1)}${indent}  }`
      : getIfObject(indent, value, depth);

    return getDiffString(indent, difference, key, completeValue);
  })
  .join('');

const stylish = (diff) => `{\n${style(diff)}}`;

export default stylish;
