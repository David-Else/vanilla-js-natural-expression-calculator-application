const genderBoxClassColor = `natural-expression-generator__gender-box--color-`;

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

// test
// https://ultimatecourses.com/blog/stop-toggling-classes-with-js-use-behaviour-driven-dom-manipulation-with-data-states

// .nav ul[data-state=closed] {
//   display: none;
// }
// .nav ul[data-state=open] {
//   display: inherit;
// }

// var toggleState = function(elem, one, two) {
//   var elem = document.querySelector(elem);
//   elem.setAttribute(
//     "data-state",
//     elem.getAttribute("data-state") === one ? two : one
//   );
//   console.log(elem.getAttribute("data-state"));
// };

// genderBox.onclick = function(e) {
//   toggleState(
//     `.natural-expression-generator__gender-box--color-female`,
//     "closed",
//     "open"
//   );
//   e.preventDefault();
// };
///

// OR just use toggle? or have i been through all that...
export function setGenderBoxMale() {
  genderBox.textContent = "Male";
  genderBox.classList.remove(`${genderBoxClassColor}female`);
  genderBox.classList.add(`${genderBoxClassColor}male`);
}

export function switchGenderBoxFemale() {
  genderBox.textContent = "Female";
  genderBox.classList.remove(`${genderBoxClassColor}male`);
  genderBox.classList.add(`${genderBoxClassColor}female`);
}

export function initGenderBox() {
  genderBox.textContent = "Male";
  genderBox.classList.add(`${genderBoxClassColor}male`);
}

export function outputAttempsLeft() {
  document.getElementById("attemps-left").innerHTML = localStorage.triesLeft;
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
