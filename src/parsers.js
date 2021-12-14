import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const getRawData = (filepath) => {
  const openedFile = fs.openSync(filepath, 'r');
  return fs.readFileSync(openedFile, 'utf-8');
};

export default (fileName) => {
  const fileExtension = path.extname(fileName);
  const filepath = path.resolve(fileName);
  const rawData = getRawData(filepath);
  switch (fileExtension) {
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
