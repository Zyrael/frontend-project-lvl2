import _ from 'lodash';

const getIndentation = (depth) => ' '.repeat(2 + depth * 4);

const stringify = (obj, depth) => {
  const keys = Object.keys(obj);
  const indent = getIndentation(depth);

  const result = keys.reduce((acc, key) => {
    const indentedKey = `${indent}  ${key}`;
    const value = obj[key];

    if (_.isObject(value)) return `${acc}${indentedKey}: {\n${stringify(value, depth + 1)}${indent}  }\n`;

    return `${acc}${indentedKey}: ${value}\n`;
  }, '');
  return `${result}`;
};

const getIfObject = (value, indent, depth) => ((_.isObject(value))
  ? `{\n${stringify(value, depth + 1)}${indent}  }`
  : value);

const style = (diff, depth = 0) => diff
  .map((item) => {
    const indent = getIndentation(depth);

    if (_.has(item, 'children')) return `${indent}  ${item.key}: {\n${style(item.children, depth + 1)}${indent}  }\n`;

    const {
      difference, key, value1, value2,
    } = item;
    const completeValue1 = getIfObject(value1, indent, depth);
    const completeValue2 = getIfObject(value2, indent, depth);

    switch (difference) {
      case 'update':
        return `${indent}- ${key}: ${completeValue1}\n${indent}+ ${key}: ${completeValue2}\n`;
      case 'remove':
        return `${indent}- ${key}: ${completeValue1}\n`;
      case 'add':
        return `${indent}+ ${key}: ${completeValue2}\n`;
      default:
        return `${indent}  ${key}: ${completeValue1}\n`;
    }
  })
  .join('');

const stylish = (diff) => `{\n${style(diff)}}`;

export default stylish;
