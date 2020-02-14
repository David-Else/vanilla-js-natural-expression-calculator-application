import { assertEquals } from 'https://deno.land/std@v0.33.0/testing/asserts.ts';
import { findPrimaryAndType, findSecondaryNumber } from '../src/core-logic.js';

Deno.test({
  name: 'findPrimaryAndType()',
  fn(): void {
    // Arrange
    const year = 2015;
    const gender = 'F';
    // Act
    const result = findPrimaryAndType(year, gender);
    // Assert
    assertEquals(result, {
      primaryNumber: 3,
      typeOfExpression: 'Thunder'
    });
  }
});

Deno.test({
  name: 'findSecondaryNumber()',
  fn(): void {
    // Arrange
    const primaryNumber = 1;
    const gender = 'M';
    const monthOfBirth = 1;
    // Act
    const result = findSecondaryNumber(primaryNumber, gender, monthOfBirth);
    // Assert
    assertEquals(result, 8);
  }
});
