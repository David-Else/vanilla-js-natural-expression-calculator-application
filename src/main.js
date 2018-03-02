// @ts-check

import '../src/main.css';
import '../node_modules/flatpickr/dist/flatpickr.css';
import flatpickr from 'flatpickr';
import {
  primaryNumberMales,
  primaryNumberFemales,
  secondNumberMales,
  secondNumberFemales,
  thirdNumberArray,
} from './data';

let genderChosen;
const genderBox = document.getElementById('js-gender-box');

/**
 * Output the information to the DOM
 *
 * @param {Object} results
 * @param {number} results.primaryNumber
 * @param {string} results.typeOfExpression
 * @param {number} results.secondNumber
 * @param {string} results.duality
 * @param {string} results.complexity
 * @param {number} results.thirdNumber
 * @param {string} results.text
 */
function outputToDOM(results) {
  document.getElementById('attemps-left').innerHTML = localStorage.triesLeft;
  document.getElementById('results').innerHTML = `
  <p>(Your number of goes using this app are <strong>${localStorage.triesLeft}</strong>)</p>
  <p>Your gender is <strong>${genderChosen}</strong></p>
  <p>Your Expression is <strong>${results.typeOfExpression}</strong></p>
  <p>You are <strong>${results.duality}</strong></p>
  <p>You are a <strong>${results.complexity}</strong> Expression</p>
  <p>Your primary number is <strong>${results.primaryNumber}</strong></p>
  <p>Your second number is <strong>${results.secondNumber}</strong></p>    
  <h3>Your 9-Energy Natural Expression is:</h3>
  <h2><strong>${results.primaryNumber}-${results.secondNumber}-${results.thirdNumber}</strong></h2>
  <p><strong>"${results.text}"</strong></p>`;
}

/**
 * Translate the actual chosen year to the special natural expression year
 *
 * @param {array} selectedDates An array from flatpickr
 * @return {number} The special natural expression year
 */
function calculateYear(selectedDates) {
  if ((selectedDates[0].getMonth() === 0) ||
    (selectedDates[0].getMonth() === 1 && selectedDates[0].getDate() < 4)) {
    return selectedDates[0].getFullYear() - 1;
  }
  return selectedDates[0].getFullYear();
}

/**
 * Find the primary number and type of expression
 *
 * @param {number} naturalExpressionYearOfBirth
 * @param {string} gender
 * @return {Object} Both the primary number and type of expression
 */
function findPrimaryAndType(naturalExpressionYearOfBirth, gender) {
  const includesYearOfBirth = element => element.year.includes(naturalExpressionYearOfBirth);
  return (gender === 'F') ? {
    primaryNumber: (primaryNumberFemales.find(includesYearOfBirth) || {}).number,
    typeOfExpression: (primaryNumberFemales.find(includesYearOfBirth) || {}).name,
  } : {
    primaryNumber: (primaryNumberMales.find(includesYearOfBirth) || {}).number,
    typeOfExpression: (primaryNumberMales.find(includesYearOfBirth) || {}).name,
  };
}

/**
 * Find the secondary number
 *
 * @param {number} primaryNumber
 * @param {string} gender
 * @param {number} monthOfBirth
 * @return {number} The secondary number
 */
function findSecondaryNumber(primaryNumber, gender, monthOfBirth) {
  const includesPrimaryNumber = element => element.primary.includes(primaryNumber);
  const listOfSecondaryNumbers = (gender === 'F') ?
    (secondNumberFemales.find(includesPrimaryNumber) || {}).secondary :
    (secondNumberMales.find(includesPrimaryNumber) || {}).secondary;
  let monthIndex = monthOfBirth - 1;
  if (monthIndex < 0) {
    monthIndex = listOfSecondaryNumbers.length - 1;
  }
  return listOfSecondaryNumbers[monthIndex];
}

/**
 * Find the duality and complexity
 *
 * @param {number} primaryNumber
 * @param {string} gender
 * @return {Object} Both the duality and complexity
 */
function findDualityAndComplexity(primaryNumber, gender) {
  const isPrimaryNumber = element => element.number === primaryNumber;
  return (gender === 'F') ? {
    duality: (primaryNumberFemales.find(isPrimaryNumber) || {}).duality,
    complexity: (primaryNumberFemales.find(isPrimaryNumber) || {}).complexity,
  } : {
    duality: (primaryNumberMales.find(isPrimaryNumber) || {}).duality,
    complexity: (primaryNumberMales.find(isPrimaryNumber) || {}).complexity,
  };
}

/**
 * Find the third number and text
 *
 * @param {number} secondNumber
 * @param {number} primaryNumber
 * @return {Object} Both the third number and text
 */
function findThirdNumberAndText(secondNumber, primaryNumber) {
  let secondNumberIndex = secondNumber;
  let primaryNumberIndex = primaryNumber;
  secondNumberIndex -= 1;
  primaryNumberIndex -= 1;
  const thirdNumberIndex = 2;
  const textIndex = 3;
  return {
    thirdNumber: (thirdNumberArray[secondNumberIndex][primaryNumberIndex])[thirdNumberIndex],
    text: (thirdNumberArray[secondNumberIndex][primaryNumberIndex])[textIndex],
  };
}

/**
 * Check how many times the user calculated a natural expression and mask screen if needed
 */
function checkGoesLeft() {
  if (localStorage.triesLeft < 1) {
    document.getElementById('natural-expression-generator--mask').style.display = 'block';
  }
}

/**
 * A counter to see how many times the app has been used
 */
function increaseUseCounter() {
  if (localStorage.triesLeft) {
    localStorage.triesLeft = Number(localStorage.triesLeft) - 1;
  } else {
    localStorage.triesLeft = 200;
  }
}

/**
 * When date is selected and a gender has been chosen this function is executed
 *
 * @param {array} selectedDates an array from flatpickr
 */
function calculateNaturalExpression(selectedDates) {
  checkGoesLeft();
  increaseUseCounter();
  const naturalExpressionYearOfBirth = calculateYear(selectedDates);
  const monthOfBirth = selectedDates[0].getMonth();
  const {
    primaryNumber,
    typeOfExpression,
  } = findPrimaryAndType(naturalExpressionYearOfBirth, genderChosen);
  const secondNumber = findSecondaryNumber(primaryNumber, genderChosen, monthOfBirth);
  const {
    duality,
    complexity,
  } = findDualityAndComplexity(primaryNumber, genderChosen);
  const {
    thirdNumber,
    text,
  } = findThirdNumberAndText(secondNumber, primaryNumber);
  outputToDOM({
    primaryNumber,
    typeOfExpression,
    secondNumber,
    duality,
    complexity,
    thirdNumber,
    text,
  });
}

const fp = flatpickr('#flatpickr', {
  onChange(selectedDates) {
    if (genderChosen !== undefined) {
      calculateNaturalExpression(selectedDates);
    }
  },
});

/**
 * When the user clicks the button to change gender this function is executed
 */
function toggleGenderBox() {
  switch (genderChosen) {
    case undefined:
      genderChosen = 'M';
      genderBox.textContent = 'Male';
      genderBox.classList.add('natural-expression-generator__gender-box--color-male');
      break;
    case 'M':
      genderChosen = 'F';
      genderBox.textContent = 'Female';
      genderBox.classList.remove('natural-expression-generator__gender-box--color-male');
      genderBox.classList.add('natural-expression-generator__gender-box--color-female');
      break;
    case 'F':
      genderChosen = 'M';
      genderBox.textContent = 'Male';
      genderBox.classList.remove('natural-expression-generator__gender-box--color-female');
      genderBox.classList.add('natural-expression-generator__gender-box--color-male');
      break;
    default:
      break;
  }
  if (fp.selectedDates.length > 0) {
    calculateNaturalExpression(fp.selectedDates);
  }
}

genderBox.addEventListener('click', toggleGenderBox, false);

checkGoesLeft();
