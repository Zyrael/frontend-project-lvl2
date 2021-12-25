import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return ((typeof value === 'string')
    ? `'${value}'`
    : value);
};

const plain = (diff, previousKeys = []) => diff
  .map((item) => {
    const {
      type, key, children, value1, value2,
    } = item;
    const currentKeys = [...previousKeys, key];
    const completeKey = currentKeys.join('.');

    switch (type) {
      case 'removed':
        return `Property '${completeKey}' was removed`;
      case 'added':
        return `Property '${completeKey}' was added with value: ${stringify(value2)}`;
      case 'updated':
        return `Property '${completeKey}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      case 'nested':
        return plain(children, currentKeys);
      default:
        return '';
    }
  })
  .filter((item) => item !== '')
  .join('\n');

export default plain;
