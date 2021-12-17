const stylishExpected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const plainExpected = `Property 'common.follow' was added with value: false
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

const jsonExpected = '[{"key":"common","children":[{"difference":"add","key":"follow","value2":false},{"key":"setting1","value1":"Value 1"},{"difference":"remove","key":"setting2","value1":200},{"difference":"update","key":"setting3","value1":true,"value2":null},{"difference":"add","key":"setting4","value2":"blah blah"},{"difference":"add","key":"setting5","value2":{"key5":"value5"}},{"key":"setting6","children":[{"key":"doge","children":[{"difference":"update","key":"wow","value1":"","value2":"so much"}]},{"key":"key","value1":"value"},{"difference":"add","key":"ops","value2":"vops"}]}]},{"key":"group1","children":[{"difference":"update","key":"baz","value1":"bas","value2":"bars"},{"key":"foo","value1":"bar"},{"difference":"update","key":"nest","value1":{"key":"value"},"value2":"str"}]},{"difference":"remove","key":"group2","value1":{"abc":12345,"deep":{"id":45}}},{"difference":"add","key":"group3","value2":{"deep":{"id":{"number":45}},"fee":100500}}]';

export { stylishExpected, plainExpected, jsonExpected };
