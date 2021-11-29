/* eslint-disable no-underscore-dangle */

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe, test, expect } from '@jest/globals';
import diff from '../src/diff.js';
import { getRawData } from '../src/functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (file) => path.join(__dirname, '..', '__fixtures__', file);

const expectedPath = getFilePath('expected.txt');
const expected = getRawData(expectedPath);

describe('main flow', () => {
  test('json test', () => {
    expect(diff(getFilePath('file1.json'), getFilePath('file2.json'), 'stylish')).toBe(expected);
  });
  test('yaml test', () => {
    expect(diff(getFilePath('file1.yaml'), getFilePath('file2.yaml'), 'stylish')).toBe(expected);
  });
});

describe('error cases', () => {
  test('wrong extension', () => {
    expect(() => diff(getFilePath('file.txt'), getFilePath('file2.json'), 'stylish')).toThrow();
  });
  test('wrong format', () => {
    expect(() => diff(getFilePath('file1.json'), getFilePath('file2.json'), 'wrong')).toThrow();
  });
});
