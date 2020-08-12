var assert = require('assert');
// const { add } = require('../dist/add')
// const {add} = require('../src/add')
// import assert from 'assert'
import { add } from '../src/add.js'  // nyc not support import

describe('add', function() {
  it('add(3, 4) should be 7', function () {
    assert.equal(add(3, 4), 7)
  });
})
