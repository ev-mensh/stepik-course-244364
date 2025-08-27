const ANIMATION_TIME = 1000;

let start;
let elements;

document.addEventListener("DOMContentLoaded", () => {
  document.fonts.ready.then(() => {
    initCounters();
  });
});

function initCounters() {
  elements = document.querySelectorAll(".counter");
  requestAnimationFrame(step);
}

function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  let elapsed = timestamp - start;

  elements.forEach((item) => {
    let max = parseInt(item.dataset.max);
    let nextValue = Math.min((elapsed * max) / ANIMATION_TIME, max).toFixed(0);
    item.innerText = nextValue;
  });

  if (elapsed < ANIMATION_TIME) {
    requestAnimationFrame(step);
  }
}
