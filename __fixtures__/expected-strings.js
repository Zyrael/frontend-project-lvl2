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

const jsonExpected = '[{"type":"nested","key":"common","children":[{"type":"added","key":"follow","value2":false},{"type":"not changed","key":"setting1","value1":"Value 1"},{"type":"removed","key":"setting2","value1":200},{"type":"updated","key":"setting3","value1":true,"value2":null},{"type":"added","key":"setting4","value2":"blah blah"},{"type":"added","key":"setting5","value2":{"key5":"value5"}},{"type":"nested","key":"setting6","children":[{"type":"nested","key":"doge","children":[{"type":"updated","key":"wow","value1":"","value2":"so much"}]},{"type":"not changed","key":"key","value1":"value"},{"type":"added","key":"ops","value2":"vops"}]}]},{"type":"nested","key":"group1","children":[{"type":"updated","key":"baz","value1":"bas","value2":"bars"},{"type":"not changed","key":"foo","value1":"bar"},{"type":"updated","key":"nest","value1":{"key":"value"},"value2":"str"}]},{"type":"removed","key":"group2","value1":{"abc":12345,"deep":{"id":45}}},{"type":"added","key":"group3","value2":{"deep":{"id":{"number":45}},"fee":100500}}]'

export { stylishExpected, plainExpected, jsonExpected };
