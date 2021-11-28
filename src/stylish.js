import _ from 'lodash';
import { getKeys, getIndentation } from './functions.js';

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

const stylish = (diff) => {
  const result = diff.reduce((acc, obj) => {
    const {
      depth, op, key, value,
    } = obj;
    const indent = getIndentation(depth);
    const indentedKey = `${indent}${op} ${key}`;

    if (Array.isArray(value)) return `${acc}${indentedKey}: {\n${stylish(value)}${indent}  }\n`;
    if (_.isObject(value)) return `${acc}${indentedKey}: {\n${stringify(value, depth + 1)}${indent}  }\n`;

    return `${acc}${indentedKey}: ${value}\n`;
  }, '');
  return `${result}`;
};

export default stylish;
