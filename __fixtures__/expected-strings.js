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

const jsonExpected = '[{"key":"common","value":[{"difference":"add","key":"follow","value":false},{"key":"setting1","value":"Value 1"},{"difference":"remove","key":"setting2","value":200},{"difference":"update","key":"setting3","value":[{"difference":"remove","key":"setting3","value":true},{"difference":"add","key":"setting3","value":null}]},{"difference":"add","key":"setting4","value":"blah blah"},{"difference":"add","key":"setting5","value":{"key5":"value5"}},{"key":"setting6","value":[{"key":"doge","value":[{"difference":"update","key":"wow","value":[{"difference":"remove","key":"wow","value":""},{"difference":"add","key":"wow","value":"so much"}]}]},{"key":"key","value":"value"},{"difference":"add","key":"ops","value":"vops"}]}]},{"key":"group1","value":[{"difference":"update","key":"baz","value":[{"difference":"remove","key":"baz","value":"bas"},{"difference":"add","key":"baz","value":"bars"}]},{"key":"foo","value":"bar"},{"difference":"update","key":"nest","value":[{"difference":"remove","key":"nest","value":{"key":"value"}},{"difference":"add","key":"nest","value":"str"}]}]},{"difference":"remove","key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"difference":"add","key":"group3","value":{"deep":{"id":{"number":45}},"fee":100500}}]';

export { stylishExpected, plainExpected, jsonExpected };
