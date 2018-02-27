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

//
// GLOBALS
//
let genderChosen;
const genderBox = document.getElementById('js-gender-box');

//
// A counter to see how many times the app has been used
//
function increaseUseCounter() {
  if (localStorage.triesLeft) {
    localStorage.triesLeft = Number(localStorage.triesLeft) - 1;
  } else {
    localStorage.triesLeft = 200;
  }
}

//
//  Check how many times the user has calculated a natural expression / mask the screen if too many
//
function checkGoesLeft() {
  if (localStorage.triesLeft < 1) {
    document.getElementById('natural-expression-generator--mask').style.display = 'block';
  }
}

//
// Output the information to the DOM
//
function outputToDOM(thingsToPrint) {
  document.getElementById('attemps-left').innerHTML = localStorage.triesLeft;
  document.getElementById('results').innerHTML = `
  <p>(Your number of goes using this app are <strong>${localStorage.triesLeft}</strong>)</p>
  <p>Your gender is <strong>${genderChosen}</strong></p>
  <p>Your Expression is <strong>${thingsToPrint.typeOfExpression}</strong></p>
  <p>You are <strong>${thingsToPrint.duality}</strong></p>
  <p>You are a <strong>${thingsToPrint.complexity}</strong> Expression</p>
  <p>Your primary number is <strong>${thingsToPrint.primaryNumber}</strong></p>
  <p>Your second number is <strong>${thingsToPrint.secondNumber}</strong></p>    
  <h3>Your 9-Energy Natural Expression is:</h3>
  <h2><strong>${thingsToPrint.primaryNumber}-${thingsToPrint.secondNumber}-${thingsToPrint.thirdNumber}</strong></h2>
  <p><strong>"${thingsToPrint.text}"</strong></p>`;
}

//
// Translate the actual chosen year to the special Natural Expression year
//
function calculateYear(selectedDates) {
  if ((selectedDates[0].getMonth() === 0) ||
    (selectedDates[0].getMonth() === 1 && selectedDates[0].getDate() < 4)) {
    return selectedDates[0].getFullYear() - 1;
  }
  return selectedDates[0].getFullYear();
}

//
// Read from the data and calculate the results
//
function findPrimaryNumberAndTypeObjectReturn(gender, naturalExpressionYearOfBirth, monthOfBirth) {
  const results = {};

  // find primaryNumber and typeOfExpression
  const includesYearOfBirth = element =>
    element.year.includes(naturalExpressionYearOfBirth);

  if (gender === 'F') {
    results.primaryNumber = (primaryNumberFemales.find(includesYearOfBirth) || {}).number;
    results.typeOfExpression = (primaryNumberFemales.find(includesYearOfBirth) || {}).name;
  } else {
    results.primaryNumber = (primaryNumberMales.find(includesYearOfBirth) || {}).number;
    results.typeOfExpression = (primaryNumberMales.find(includesYearOfBirth) || {}).name;
  }
  // --------------------------------------------------------------------------

  // find secondaryNumber * needs results.primaryNumber created above
  const includesPrimaryNumber = element =>
    element.primary.includes(results.primaryNumber);

  const listOfSecondaryNumbers = (gender === 'F') ?
    (secondNumberFemales.find(includesPrimaryNumber) || {}).secondary :
    (secondNumberMales.find(includesPrimaryNumber) || {}).secondary;

  let monthIndex = monthOfBirth - 1;

  if (monthIndex < 0) {
    monthIndex = listOfSecondaryNumbers.length - 1;
  }

  results.secondNumber = listOfSecondaryNumbers[monthIndex];
  // --------------------------------------------------------------------------

  // Find duality and complexity
  const isPrimaryNumber = element =>
    element.number === results.primaryNumber;

  if (gender === 'F') {
    results.duality = (primaryNumberFemales.find(isPrimaryNumber) || {}).duality;
    results.complexity = (primaryNumberFemales.find(isPrimaryNumber) || {}).complexity;
  } else {
    results.duality = (primaryNumberMales.find(isPrimaryNumber) || {}).duality;
    results.complexity = (primaryNumberMales.find(isPrimaryNumber) || {}).complexity;
  }

  // find third number and text
  let secondNumberIndex = results.secondNumber;
  let primaryNumberIndex = results.primaryNumber;
  secondNumberIndex -= 1;
  primaryNumberIndex -= 1;
  const thirdNumberIndex = 2;
  const textIndex = 3;

  results.thirdNumber = (thirdNumberArray[secondNumberIndex][primaryNumberIndex])[thirdNumberIndex];
  results.text = (thirdNumberArray[secondNumberIndex][primaryNumberIndex])[textIndex];

  return results;
}

//
// Main function to execute all the functions to calculate the results
//
function calculateNaturalExpression(selectedDates) {
  checkGoesLeft();
  const naturalExpressionYearOfBirth = calculateYear(selectedDates);
  const monthOfBirth = selectedDates[0].getMonth();
  const allResults = findPrimaryNumberAndTypeObjectReturn(genderChosen, naturalExpressionYearOfBirth, monthOfBirth);
  increaseUseCounter();
  outputToDOM(allResults);
}


//
// Run flatpickr onChange which has its own event handler
//
const fp = flatpickr('#flatpickr', {
  onChange(selectedDates) {
    if (genderChosen !== undefined) {
      calculateNaturalExpression(selectedDates);
    }
  },
});

//
// When the user clicks the box to change gender this function is executed
//
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

//
// add event listeners
//
genderBox.addEventListener('click', toggleGenderBox, false);

checkGoesLeft();
