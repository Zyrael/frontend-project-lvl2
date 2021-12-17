import _ from 'lodash';

const stringify = (value) => ((typeof value === 'string')
  ? `'${value}'`
  : value);

const getIfObject = (value) => ((_.isObject(value))
  ? '[complex value]'
  : stringify(value));

const plain = (diff, upperKey = '') => diff
  .map((item) => {
    const {
      difference, key, value1, value2,
    } = item;
    const completeKey = `${upperKey}${key}`;

    if (_.has(item, 'children')) return plain(item.children, `${completeKey}.`);

    const completeValue1 = getIfObject(value1);
    const completeValue2 = getIfObject(value2);

    switch (difference) {
      case 'add':
        return `Property '${completeKey}' was added with value: ${completeValue2}`;
      case 'remove':
        return `Property '${completeKey}' was removed`;
      case 'update':
        return `Property '${completeKey}' was updated. From ${completeValue1} to ${completeValue2}`;
      default:
        return '';
    }
  })
  .filter((item) => item !== '')
  .join('\n');

export default plain;
