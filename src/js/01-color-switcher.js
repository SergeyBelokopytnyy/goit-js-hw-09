const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const color = document.querySelector('body');

let timerId = null;

function interval() {
  timerId = setInterval(onBtnStartClick, 1000);
}

function toggleBtn(start, stop) {
  btnStart.disabled = start;
  btnStop.disabled = stop;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStop.disabled = true;

btnStart.addEventListener('click', interval);
btnStop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  color.style.backgroundColor = getRandomHexColor();
  toggleBtn(true, false);
  console.dir(color.style.backgroundColor);
}

function onBtnStopClick() {
  clearInterval(timerId);
  toggleBtn(false, true);
}
