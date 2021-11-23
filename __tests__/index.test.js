/* eslint-disable no-underscore-dangle */
/* global test, expect */

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
const file2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('gendiff', () => {
  expect(genDiff(file1, file2)).toBe(expected);
});
