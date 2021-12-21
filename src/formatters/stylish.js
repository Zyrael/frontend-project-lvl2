import _ from 'lodash';

const getIndentation = (depth) => ' '.repeat(2 + depth * 4);

const stringify = (value, depth) => {
  if (!_.isObject(value)) return value;
  const keys = Object.keys(value);
  const indent = getIndentation(depth + 1);

  const result = keys.reduce((acc, key) => {
    const indentedKey = `${indent}  ${key}`;
    const deepValue = value[key];

    if (_.isObject(deepValue)) return `${acc}${indentedKey}: ${stringify(deepValue, depth + 1)}\n`;

    return `${acc}${indentedKey}: ${deepValue}\n`;
  }, '');
  return `{\n${result}${getIndentation(depth)}  }`;
};

const style = (diff, depth = 0) => diff
  .map(({
    type, key, children, value1, value2,
  }) => {
    const indent = getIndentation(depth);
    const completeValue1 = stringify(value1, depth);
    const completeValue2 = stringify(value2, depth);

    switch (type) {
      case 'not changed':
        return `${indent}  ${key}: ${completeValue1}\n`;
      case 'removed':
        return `${indent}- ${key}: ${completeValue1}\n`;
      case 'added':
        return `${indent}+ ${key}: ${completeValue2}\n`;
      case 'updated':
        return `${indent}- ${key}: ${completeValue1}\n${indent}+ ${key}: ${completeValue2}\n`;
      case 'nested':
        return `${indent}  ${key}: {\n${style(children, depth + 1)}${indent}  }\n`;
      default:
        return '';
    }
  })
  .join('');

const stylish = (diff) => `{\n${style(diff)}}`;

export default stylish;
