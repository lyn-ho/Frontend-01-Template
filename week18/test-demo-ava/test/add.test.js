const test = require('ava')
const {add} = require('../src/add')
// const {add} = require('../dist/add.js')

test('add(3, 4) should be 7', t => {
    add(3, 4) === 7 && t.pass();
});
