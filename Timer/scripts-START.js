//Start by declaring variables that will be used through out the code.//
let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const customForm = document.querySelector("#custom");

//Set your first function called 'timer' which takes in one parameter(seconds)//
function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

/*Set your 'displayTimeLeft' which takes in one parameter-seconds-
and displays it on the page in minutes and second format.*/
function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  document.title = display;
  timerDisplay.textContent = display;
}

/* Set your 'displayEndTime' with timestamp 
parameter which displays when the timer should end*/
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}
//Set your startTimer function
function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}
// Set two event listener- one for preset button and one for submitting the form//
buttons.forEach((button) => button.addEventListener("click", startTimer));
customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  if (!isNaN(mins)) {
    timer(mins * 60);
    this.reset();
  }
});
