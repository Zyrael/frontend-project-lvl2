/* eslint-disable no-underscore-dangle */

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  describe, test, expect, beforeAll,
} from '@jest/globals';
import diff from '../src/diff.js';
import { getRawData } from '../src/functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFilePath = (file) => path.join(__dirname, '..', '__fixtures__', file);

let stylishExpected;
let plainExpected;
let jsonFile1;
let jsonFile2;
let yamlFile1;
let yamlFile2;
let txtFile;

beforeAll(() => {
  stylishExpected = getRawData(getFilePath('stylish-expected.txt'));
  // plainExpected = getRawData(getFilePath('plain-expected.txt'));
  plainExpected = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
  jsonFile1 = getFilePath('file1.json');
  jsonFile2 = getFilePath('file2.json');
  yamlFile1 = getFilePath('file1.yaml');
  yamlFile2 = getFilePath('file2.yaml');
  txtFile = getFilePath('file.txt');
});

describe('main flow', () => {
  test('stylish test', () => {
    expect(diff(jsonFile1, jsonFile2, 'stylish')).toBe(stylishExpected);
    expect(diff(yamlFile1, yamlFile2, 'stylish')).toBe(stylishExpected);
  });
  test('plain test', () => {
    expect(diff(jsonFile1, jsonFile2, 'plain')).toBe(plainExpected);
    expect(diff(yamlFile1, yamlFile2, 'plain')).toBe(plainExpected);
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
