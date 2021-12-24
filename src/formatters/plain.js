import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return ((typeof value === 'string')
    ? `'${value}'`
    : value);
};

const plain = (diff, upperKey = '') => diff
  .map((item) => {
    const {
      type, key, children, value1, value2,
    } = item;
    const completeKey = `${upperKey}${key}`;

    switch (type) {
      case 'removed':
        return `Property '${completeKey}' was removed`;
      case 'added':
        return `Property '${completeKey}' was added with value: ${stringify(value2)}`;
      case 'updated':
        return `Property '${completeKey}' was updated. From ${stringify(value1)} to ${stringify(value2)}`;
      case 'nested':
        return plain(children, `${completeKey}.`);
      default:
        return '';
    }
  })
  .filter((item) => item !== '')
  .join('\n');

export default plain;
