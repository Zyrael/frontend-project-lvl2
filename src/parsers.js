import yaml from 'js-yaml';

export default (rawData, extension) => {
  switch (extension) {
    case '.yaml':
      return yaml.load(rawData);
    case '.yml':
      return yaml.load(rawData);
    case '.json':
      return JSON.parse(rawData);
    default:
      throw (new Error('This extension is not supported'));
  }
};
