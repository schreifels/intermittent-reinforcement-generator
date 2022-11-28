const LOADING_DELAY_MS = 1050;
const RESET_DELAY_MS = 10000 + LOADING_DELAY_MS;
const DEFAULT_PERCENTAGE = 60;
const YES_CLASSNAME = "yes";
const NO_CLASSNAME = "no";
const REROLL_CLASSNAME = "reroll";

const timeouts = [];

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
  clearTrackedTimeouts();
  document.body.classList.remove(YES_CLASSNAME, NO_CLASSNAME);
  document.body.classList.add(REROLL_CLASSNAME);
}

function setTrackedTimeout(...args) {
  const timeout = setTimeout(...args);
  timeouts.push(timeout);
  return timeout;
}

function clearTrackedTimeouts() {
  timeouts.forEach(clearTimeout);
  timeouts.splice(0, timeouts.length); // clear timeouts array in-place
}

window.addEventListener("load", () => {
  const percentage = getPercentage();
  if (percentage === undefined) {
    redirectWithPercentage();
    return;
  }

  document.title = percentage + "% " + document.title;

  const randomNumber = getRandomNumber1To100();
  setTrackedTimeout(
    () => revealReward(percentage, randomNumber),
    LOADING_DELAY_MS
  );
  setTrackedTimeout(resetReward, RESET_DELAY_MS);
  window.addEventListener("blur", resetReward);
});
