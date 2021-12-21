import stylish from './stylish.js';
import plain from './plain.js';

const format = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff);
    case 'diff':
      return diff;
    default:
      throw (new Error(`No such format: ${formatName}`));
  }
};

export default format;
