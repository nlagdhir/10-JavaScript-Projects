const daysEl = document.querySelector('#days');
const hoursEl = document.querySelector('#hours');
const minsEl = document.querySelector('#mins');
const secondsEl = document.querySelector('#seconds');

const newYear = '01 Jan 2023';

const countdown = () => {
    const newYearDate = new Date(newYear);
    const currentDate = new Date();
    const milliSeconds = Math.abs(newYearDate - currentDate);
    const totalSeconds = milliSeconds / 1000;

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const mins = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
}

const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
}
// Initial Call
countdown();

setInterval(countdown,1000);