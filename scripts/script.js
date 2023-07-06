"use strict";

// variables at startup
const scoreElement = document.querySelector(".score");
const highscoreElement = document.querySelector(".highscore");
const guessBoxElement = document.querySelector(".guess");

// creating secrect number
function createSecretNumber() {
  let numberGenerator = Math.trunc(Math.random() * 20) + 1;
  return numberGenerator;
}
let secretNumber = createSecretNumber();

// log secrect number to console (identify secrect num for testing purposes)
console.log(secretNumber);

// defining score & highscore
let score = 20;
let highScore = 0;

// global functions
const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
};

const changeBackgroundColor = function (color) {
  document.querySelector("body").style.backgroundColor = color;
};

const formatNumberBox = function (boxsize, item) {
  document.querySelector(".number").style.width = boxsize;
  document.querySelector(".number").textContent = item;
};

// implementing game logic
document.querySelector(".check").addEventListener("click", () => {
  const guess = Number(guessBoxElement.value);
  if (!guess) {
    displayMessage("⛔️ No Number! ⛔️");
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!");
    changeBackgroundColor("#60b347");
    formatNumberBox("30rem", secretNumber);
    if (score > highScore) {
      highScore = score;
      highscoreElement.textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 The guess is too high 📈" : "📉 The guess is too low 📉");
      score--;
      scoreElement.textContent = score;
    } else {
      displayMessage("🙁 You lost the game! 🙁");
      scoreElement.textContent = 0;
    }
  }
});

// add event listener using an anonymous function for the "Again!" btn
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = createSecretNumber();
  scoreElement.textContent = score;
  console.log(secretNumber);
  displayMessage("start guessing...");
  changeBackgroundColor("#222");
  formatNumberBox("15rem", "?");
  guessBoxElement.value = "";
});
