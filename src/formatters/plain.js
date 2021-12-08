import _ from 'lodash';

const stringify = (value) => ((typeof value === 'string')
  ? `'${value}'`
  : value);

const getIfObject = (value) => ((_.isObject(value))
  ? '[complex value]'
  : stringify(value));

const getUpdateString = (completeKey, value) => {
  const [oldValue, newValue] = value.map((item) => getIfObject(item.value));
  return `Property '${completeKey}' was updated. From ${oldValue} to ${newValue}`;
};

const getDiffString = (difference, completeKey, completeValue) => {
  switch (difference) {
    case 'add':
      return `Property '${completeKey}' was added with value: ${completeValue}`;
    case 'remove':
      return `Property '${completeKey}' was removed`;
    default:
      return '';
  }
};

const plain = (diff, upperKey = '') => diff
  .map(({
    difference, key, value,
  }) => {
    const completeKey = `${upperKey}${key}`;

    if (difference === 'update') return getUpdateString(completeKey, value);

    const completeValue = getIfObject(value);

    if (Array.isArray(value)) return plain(value, `${completeKey}.`);

    return getDiffString(difference, completeKey, completeValue);
  })
  .filter((item) => item !== '')
  .join('\n');

export default plain;
