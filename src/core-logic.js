import {
  primaryNumberFemales,
  primaryNumberMales,
  secondNumberFemales,
  secondNumberMales,
  thirdNumberArray
} from "./data.js";

export function calculateYear(selectedDate) {
  const isFebFirstToThird = selectedDate =>
    selectedDate.getMonth() === 1 && selectedDate.getDate() < 4;
  const isJan = selectedDate => selectedDate.getMonth() === 0;
  return isJan(selectedDate) || isFebFirstToThird(selectedDate)
    ? selectedDate.getFullYear() - 1
    : selectedDate.getFullYear();
}

export function findPrimaryAndType(naturalExpressionYearOfBirth, gender) {
  const includesYearOfBirth = element =>
    element.year.includes(naturalExpressionYearOfBirth);
  return gender === "F"
    ? {
        primaryNumber: (primaryNumberFemales.find(includesYearOfBirth) || {})
          .number,
        typeOfExpression: (primaryNumberFemales.find(includesYearOfBirth) || {})
          .name
      }
    : {
        primaryNumber: (primaryNumberMales.find(includesYearOfBirth) || {})
          .number,
        typeOfExpression: (primaryNumberMales.find(includesYearOfBirth) || {})
          .name
      };
}

export function findSecondaryNumber(primaryNumber, gender, monthOfBirth) {
  const includesPrimaryNumber = element =>
    element.primary.includes(primaryNumber);
  const listOfSecondaryNumbers =
    gender === "F"
      ? (secondNumberFemales.find(includesPrimaryNumber) || {}).secondary
      : (secondNumberMales.find(includesPrimaryNumber) || {}).secondary;
  let monthIndex = monthOfBirth - 1;
  if (monthIndex < 0) {
    monthIndex = listOfSecondaryNumbers.length - 1;
  }
  return listOfSecondaryNumbers[monthIndex];
}

export function findDualityAndComplexity(primaryNumber, gender) {
  const isPrimaryNumber = element => element.number === primaryNumber;
  return gender === "F"
    ? {
        duality: (primaryNumberFemales.find(isPrimaryNumber) || {}).duality,
        complexity: (primaryNumberFemales.find(isPrimaryNumber) || {})
          .complexity
      }
    : {
        duality: (primaryNumberMales.find(isPrimaryNumber) || {}).duality,
        complexity: (primaryNumberMales.find(isPrimaryNumber) || {}).complexity
      };
}

export function findThirdNumberAndText(secondNumber, primaryNumber) {
  let secondNumberIndex = secondNumber;
  let primaryNumberIndex = primaryNumber;
  secondNumberIndex -= 1;
  primaryNumberIndex -= 1;
  const thirdNumberIndex = 2;
  const textIndex = 3;
  return {
    thirdNumber:
      thirdNumberArray[secondNumberIndex][primaryNumberIndex][thirdNumberIndex],
    text: thirdNumberArray[secondNumberIndex][primaryNumberIndex][textIndex]
  };
}
