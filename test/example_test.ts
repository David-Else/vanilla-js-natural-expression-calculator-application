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

// var assert = chai.assert;
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { test } from "https://deno.land/std/testing/mod.ts";
import { findPrimaryAndType } from "../dist/bundle.js";

// const assert = require("assert").strict;

// describe("findPrimaryAndType(naturalExpressionYearOfBirth, gender)", function() {
//   it(`findPrimaryAndType(2015, 'F') should return {primaryNumber: 3, typeOfExpression: 'Thunder'}`, function() {
//     assert.deepEqual(findPrimaryAndType(2015, "F"), {
//       primaryNumber: 3,
//       typeOfExpression: "Thunder"
//     });
//   });
// });

// describe("findSecondaryNumber(primaryNumber, gender, monthOfBirth)", function() {
//   it(`findSecondaryNumber(1, 'M', 1) should return 8`, function() {
//     assert.equal(findSecondaryNumber(1, "M", 1), 8);
//   });
// });
const document = {};
test({
  name: "testing example",

  fn(): void {
    assertEquals(findPrimaryAndType(2015, "F"), {
      primaryNumber: 3,
      typeOfExpression: "Thunder"
    });
  }
});

// test({
//   name: "testing example",
//   fn(): void {
//     assertEquals(true, false);
//   }
// });
