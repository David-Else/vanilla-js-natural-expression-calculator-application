// @ts-check

import flatpickr from "flatpickr";
import "../node_modules/flatpickr/dist/flatpickr.css";
import "../src/main.css";
import {
  primaryNumberFemales,
  primaryNumberMales,
  secondNumberFemales,
  secondNumberMales,
  thirdNumberArray
} from "./data.js";

let genderChosen;

/*
 * Set the number of goes allowed from a HTML dataset value
 * only when the application is first run
 */
const genderBox = document.getElementById("js-gender-box");
const allowedGoes = genderBox.dataset.uses;
if (localStorage.triesLeft === undefined) {
  localStorage.triesLeft = allowedGoes;
}

/*
 * Write to the DOM
 */
document.getElementById("attemps-left").innerHTML = localStorage.triesLeft;

function outputToDOM(results) {
  document.getElementById("attemps-left").innerHTML = localStorage.triesLeft;
  document.getElementById("results").innerHTML = `
  <p>Your Expression is <strong>${results.typeOfExpression}</strong></p>
  <p>You are <strong>${results.duality}</strong></p>
  <p>You are a <strong>${results.complexity}</strong> Expression</p>
  <p>Your primary number is <strong>${results.primaryNumber}</strong></p>
  <p>Your second number is <strong>${results.secondNumber}</strong></p>
  <p>Your third number is <strong>${results.thirdNumber}</strong></p>  
  <h3>Your 9-Energy Natural Expression is:</h3>
  <h2><strong>${results.primaryNumber}-${results.secondNumber}-${results.thirdNumber}</strong></h2>
  <p><strong>"${results.text}"</strong></p>`;
}

function calculateYear(selectedDate) {
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

function findDualityAndComplexity(primaryNumber, gender) {
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

function findThirdNumberAndText(secondNumber, primaryNumber) {
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

function checkGoesLeft() {
  if (localStorage.triesLeft < 1) {
    document.getElementById(
      "natural-expression-generator--mask"
    ).style.display = "block";
  }
}

function IncreaseUseCounter() {
  localStorage.triesLeft = Number(localStorage.triesLeft) - 1;
}

/**
 * @param {Date[]} selectedDates
 */
function calculateNaturalExpression(selectedDates) {
  const selectedDate = selectedDates[0];
  checkGoesLeft();
  IncreaseUseCounter();
  const naturalExpressionYearOfBirth = calculateYear(selectedDate);
  const monthOfBirth = selectedDate.getMonth();
  const { primaryNumber, typeOfExpression } = findPrimaryAndType(
    naturalExpressionYearOfBirth,
    genderChosen
  );
  const secondNumber = findSecondaryNumber(
    primaryNumber,
    genderChosen,
    monthOfBirth
  );
  const { duality, complexity } = findDualityAndComplexity(
    primaryNumber,
    genderChosen
  );
  const { thirdNumber, text } = findThirdNumberAndText(
    secondNumber,
    primaryNumber
  );
  outputToDOM({
    primaryNumber,
    typeOfExpression,
    secondNumber,
    duality,
    complexity,
    thirdNumber,
    text
  });
}

const fp = flatpickr("#flatpickr", {
  onChange(selectedDates) {
    if (genderChosen !== undefined) {
      calculateNaturalExpression(selectedDates);
    }
  }
});

function toggleGenderBox() {
  switch (genderChosen) {
    case undefined:
      genderChosen = "M";
      genderBox.textContent = "Male";
      genderBox.classList.add(
        "natural-expression-generator__gender-box--color-male"
      );
      break;
    case "M":
      genderChosen = "F";
      genderBox.textContent = "Female";
      genderBox.classList.remove(
        "natural-expression-generator__gender-box--color-male"
      );
      genderBox.classList.add(
        "natural-expression-generator__gender-box--color-female"
      );
      break;
    case "F":
      genderChosen = "M";
      genderBox.textContent = "Male";
      genderBox.classList.remove(
        "natural-expression-generator__gender-box--color-female"
      );
      genderBox.classList.add(
        "natural-expression-generator__gender-box--color-male"
      );
      break;
    default:
      break;
  }

  // If a date has been choosen then calculate the Natural Expression
  if (fp.selectedDates.length > 0) {
    calculateNaturalExpression(fp.selectedDates);
  }
}

genderBox.addEventListener("click", toggleGenderBox, false);

checkGoesLeft();
