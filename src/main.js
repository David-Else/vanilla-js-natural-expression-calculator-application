// @ts-check

import flatpickr from "flatpickr";
import "../node_modules/flatpickr/dist/flatpickr.css";
import "../src/main.css";
import {
  calculateYear,
  findDualityAndComplexity,
  findPrimaryAndType,
  findSecondaryNumber,
  findThirdNumberAndText
} from "./core-logic";
import {
  genderBox,
  outputResults,
  changeDisplayProperty,
  outputAttempsLeft,
  initGenderBox,
  switchGenderBoxFemale,
  setGenderBoxMale
} from "./view";

let genderChosen;

/*
 * Set the number of goes allowed from a HTML dataset value
 * only when the application is first run
 */
if (localStorage.triesLeft === undefined) {
  localStorage.triesLeft = genderBox.dataset.uses;
}

outputAttempsLeft();

function checkGoesLeft() {
  if (localStorage.triesLeft < 1) {
    changeDisplayProperty("natural-expression-generator--mask", "block");
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
  outputResults({
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
      initGenderBox();
      break;
    case "M":
      genderChosen = "F";
      switchGenderBoxFemale();
      break;
    case "F":
      genderChosen = "M";
      setGenderBoxMale();
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
