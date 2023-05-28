let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now(); // current time
    const then  = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it...
        if (secondsLeft <= 0) {
            clearInterval(countdown);
            return;
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hours = end.getHours();
    const adjustedHour = hours > 12 ? hours - 12: hours; // used for 12h format
    const minutes = end.getMinutes();
    // endTime.textContent = `Be Back At ${hours}:${minutes < 10 ? '0' : ''}${minutes}`; // 24h format
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}${hours > 12 ? 'PM': 'AM'}`; // 12h format
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e){ //custom timer
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});