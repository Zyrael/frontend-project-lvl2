import stylish from './stylish.js';
import plain from './plain.js';
import jsonStyle from './json-style.js';

const format = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return jsonStyle(diff);
    default:
      throw (new Error(`There is no such format: ${formatName}`));
  }
};

export default format;
