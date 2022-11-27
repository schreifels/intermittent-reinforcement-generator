const LOADING_DELAY_MS = 1050;
const RESET_DELAY_MS = 15000;
const DEFAULT_PERCENTAGE = 85;
const YES_CLASSNAME = "yes";
const NO_CLASSNAME = "no";
const REROLL_CLASSNAME = "reroll";

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

function revealReward(percentage, randomNumber) {
  const className = randomNumber > percentage ? NO_CLASSNAME : YES_CLASSNAME;
  document.body.classList.add(className);
}

function resetReward() {
  document.body.classList.remove(YES_CLASSNAME, NO_CLASSNAME);
  document.body.classList.add(REROLL_CLASSNAME);
}

window.addEventListener("load", () => {
  const percentage = getPercentage();
  if (percentage === undefined) {
    redirectWithPercentage();
    return;
  }

  document.title = percentage + "% " + document.title;

  const randomNumber = getRandomNumber1To100();
  setTimeout(() => revealReward(percentage, randomNumber), LOADING_DELAY_MS);
  setTimeout(resetReward, RESET_DELAY_MS);
});
