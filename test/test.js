/* eslint-disable */

// old code needed for jsdom, don't forget it!
// document.body.innerHTML = '<!DOCTYPE html><html><head></head><body><div id="js-gender-box"><input id="demo" placeholder="Select date" data-alt-input=true data-alt-format="F j, Y"><div id="results"></div></div></body></html>'

var assert = chai.assert;

// examples to delete

describe('findPrimaryNumber(gender, naturalExpressionYearOfBirth)', function () {
  it(`findPrimaryNumber('F', 2015) should return 3`, function () {
    assert.equal(findPrimaryNumber('F', 2015), 3)

  })
})

describe('findSecondNumber(gender, primaryNumber, monthOfBirth)', () => {
  it(`findSecondNumber('M', 1, 1) should return 8`, () => {
    assert.equal(findSecondNumber('M', 1, 1), 8)
  });
});
