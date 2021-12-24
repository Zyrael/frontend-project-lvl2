/* eslint-disable no-underscore-dangle */

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  describe, test, expect,
} from '@jest/globals';
import diff from '../src/diff.js';
import { stylishExpected, plainExpected, jsonExpected } from '../__fixtures__/expected-strings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (file) => path.join(__dirname, '..', '__fixtures__', file);

const jsonFile1 = getFilePath('file1.json');
const jsonFile2 = getFilePath('file2.json');
const yamlFile1 = getFilePath('file1.yml');
const yamlFile2 = getFilePath('file2.yaml');
const txtFile = getFilePath('file.txt');

describe('main flow', () => {
  test.each([
	 {
		 file1: jsonFile1, file2: jsonFile2, formatter: 'stylish', expected: stylishExpected,
    },
	 {
		 file1: yamlFile1, file2: yamlFile2, formatter: 'stylish', expected: stylishExpected,
    },
	 {
		 file1: yamlFile1, file2: yamlFile2, formatter: 'plain', expected: plainExpected,
    },
	 {
		 file1: yamlFile1, file2: yamlFile2, formatter: 'json', expected: jsonExpected,
    },
  ])('$formatter test', ({
    file1, file2, formatter, expected,
  }) => {
    expect(diff(file1, file2, formatter)).toBe(expected);
  });
});

describe('error cases', () => {
  test('wrong extension', () => {
    expect(() => diff(jsonFile1, txtFile, 'stylish')).toThrow();
  });
  test('wrong format', () => {
    expect(() => diff(jsonFile1, jsonFile2, 'wrong')).toThrow();
  });
});
