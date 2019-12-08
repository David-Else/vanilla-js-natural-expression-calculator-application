/*
 * Read from the DOM
 */
export const genderBox = document.getElementById("js-gender-box");

/*
 * Write to the DOM
 */
export function changeDisplayProperty(elementId, value) {
  document.getElementById(elementId).style.display = value;
}

export function outputAttempsLeft() {
  document.getElementById("attemps-left").innerHTML = localStorage.triesLeft;
}

export function setGenderBoxMale() {
  genderBox.textContent = "Male";
  genderBox.classList.remove(
    "natural-expression-generator__gender-box--color-female"
  );
  genderBox.classList.add(
    "natural-expression-generator__gender-box--color-male"
  );
}

export function switchGenderBoxFemale() {
  genderBox.textContent = "Female";
  genderBox.classList.remove(
    "natural-expression-generator__gender-box--color-male"
  );
  genderBox.classList.add(
    "natural-expression-generator__gender-box--color-female"
  );
}

export function initGenderBox() {
  genderBox.textContent = "Male";
  genderBox.classList.add(
    "natural-expression-generator__gender-box--color-male"
  );
}

export function outputResults(results) {
  outputAttempsLeft();
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
