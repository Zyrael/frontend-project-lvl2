import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

export default (fileName) => {
  const fileExtension = path.extname(fileName);
  const filepath = path.resolve(fileName);
  const openedFile = fs.openSync(filepath);
  const rawData = fs.readFileSync(openedFile, 'utf-8');
  switch (fileExtension) {
    case '.yaml':
    case '.yml':
      return yaml.load(rawData);
    case '.json':
      return JSON.parse(rawData);
    default:
      throw (new Error('This extension is not supported'));
  }
};
