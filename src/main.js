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
import { genderBox, outputToDOM } from "./view";

let genderChosen;

/*
 * Set the number of goes allowed from a HTML dataset value
 * only when the application is first run
 */

const allowedGoes = genderBox.dataset.uses;
if (localStorage.triesLeft === undefined) {
  localStorage.triesLeft = allowedGoes;
}

/*
 * Write to the DOM
 */
document.getElementById("attemps-left").innerHTML = localStorage.triesLeft;

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
