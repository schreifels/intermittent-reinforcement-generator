const LOADING_DELAY_MS = 1050;
const DEFAULT_RATIO = 85;
const YES_CLASSNAME = "yes";
const NO_CLASSNAME = "no";

function getRatio() {
  const queryString = new URLSearchParams(window.location.search);
  const ratio = queryString.get("ratio");
  if (!ratio) {
    return;
  }

  const parsedRatio = parseInt(ratio);
  if (Number.isNaN(parsedRatio)) {
    return;
  }

  return parsedRatio;
}

function redirectWithRatio() {
  const queryString = new URLSearchParams(window.location.search);
  queryString.set("ratio", DEFAULT_RATIO);
  window.location.replace(window.location.pathname + "?" + queryString);
}

function getRandomNumber1To100() {
  return Math.floor(Math.random() * 100) + 1;
}

function unhideElement(ratio, randomNumber) {
  const className = randomNumber > ratio ? NO_CLASSNAME : YES_CLASSNAME;
  document.body.classList.add(className);
}

window.addEventListener("load", () => {
  const ratio = getRatio();
  if (ratio === undefined) {
    redirectWithRatio();
    return;
  }

  const randomNumber = getRandomNumber1To100();
  setTimeout(() => unhideElement(ratio, randomNumber), LOADING_DELAY_MS);
});
