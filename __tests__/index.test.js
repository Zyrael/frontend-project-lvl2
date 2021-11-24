/* eslint-disable no-underscore-dangle */

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe, test, expect } from '@jest/globals';
import diff from '../src/diff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonFile1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
const jsonFile2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');
const yamlFile1 = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
const yamlFile2 = path.join(__dirname, '..', '__fixtures__', 'file2.yml');

const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
describe('main flow', () => {
  test('json test', () => {
    expect(diff(jsonFile1, jsonFile2)).toBe(expected);
  });
  test('yaml test', () => {
    expect(diff(yamlFile1, yamlFile2)).toBe(expected);
  });
});
