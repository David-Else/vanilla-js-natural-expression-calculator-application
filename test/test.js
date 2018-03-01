/* eslint-disable */

// import {
//   assert,
// } from 'chai';

// ------------------------------------------------------------------------
//
// YOUR DREAM way of making it work with quokka goodness
//
// import {
//   assert,
// } from 'chai';

// import assert from '../test/assert.js';
// console.log(assert.deepEqual);

// const assert = require('chai').assert;

// assert.deepEqual(findPrimaryAndType(2015, 'F'), {
//   primaryNumber: 3,
//   typeOfExpression: 'Thunder',
// }, 'fail');

// ------------------------------------------------------------------------

var assert = chai.assert;

describe('findPrimaryNumber(gender, naturalExpressionYearOfBirth)', function () {
  it(`findPrimaryAndType(2015, 'F') should return {primaryNumber: 3, typeOfExpression: 'Thunder'}`, function () {
    assert.deepEqual(findPrimaryAndType(2015, 'F'), {
      primaryNumber: 3,
      typeOfExpression: 'Thunder',
    })
  })
})

// Don't delete, decent test

// describe('findSecondaryNumber(primaryAndType, gender, monthOfBirth)', () => {
//   it(`findSecondaryNumber('M', 1, 1) should return 8`, () => {
//     assert.equal(findSecondaryNumber('M', 1, 1), 8)
//   });
// });
