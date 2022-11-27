const LOADING_DELAY_MS = 1050;
const DEFAULT_PERCENTAGE = 85;
const YES_CLASSNAME = "yes";
const NO_CLASSNAME = "no";

function getPercentage() {
  const queryString = new URLSearchParams(window.location.search);
  const percentage = queryString.get("pct");
  if (!percentage) {
    return;
  }

  const parsedPercentage = parseInt(percentage);
  if (Number.isNaN(parsedPercentage)) {
    return;
  }

  return parsedPercentage;
}

function redirectWithPercentage() {
  const queryString = new URLSearchParams(window.location.search);
  queryString.set("pct", DEFAULT_PERCENTAGE);
  window.location.replace(window.location.pathname + "?" + queryString);
}

function getRandomNumber1To100() {
  return Math.floor(Math.random() * 100) + 1;
}

function unhideElement(percentage, randomNumber) {
  const className = randomNumber > percentage ? NO_CLASSNAME : YES_CLASSNAME;
  document.body.classList.add(className);
}

window.addEventListener("load", () => {
  const percentage = getPercentage();
  if (percentage === undefined) {
    redirectWithPercentage();
    return;
  }

  document.title = percentage + "% " + document.title;

  const randomNumber = getRandomNumber1To100();
  setTimeout(() => unhideElement(percentage, randomNumber), LOADING_DELAY_MS);
});
