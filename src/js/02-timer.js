import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');
const secondsValue = document.querySelector('[data-seconds]');
const minutesValue = document.querySelector('[data-minutes]');
const hoursValue = document.querySelector('[data-hours]');
const daysValue = document.querySelector('[data-days]');

let timerId = null;

btnStart.disabled = true;

let startDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (timer.isActive) {
      return;
    }
    startDate = selectedDates[0].getTime();
    if (startDate < options.defaultDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
      return;
    }
    Notiflix.Notify.success('Valid date selected');
    btnStart.disabled = false;
  },
};

flatpickr('input[type="text"]', options);

const timer = {
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    timerId = setInterval(() => {
      updateTimer();
    }, 1000);
  },
};

function updateTimer() {
  const currentDate = Date.now();

  if (startDate > currentDate) {
    const timerTime = startDate - currentDate;
    const convertTime = convertMs(timerTime);

    console.log(convertTime);

    secondsValue.textContent = convertTime.seconds;
    minutesValue.textContent = convertTime.minutes;
    hoursValue.textContent = convertTime.hours;
    daysValue.textContent = convertTime.days;
  } else {
    clearInterval(timerId);
    Notiflix.Report.info('Timer is over', 'Please press "Ok"', 'Ok');
  }
}

btnStart.addEventListener('click', () => {
  timer.start();
  btnStart.disabled = true;
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
