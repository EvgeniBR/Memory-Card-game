const cards = document.querySelectorAll(`.memorycard`);
const mediumCards = document.querySelectorAll(`.medium`);
const hardCards = document.querySelectorAll(`.hard`);
const restart = document.querySelector(`.restart`);
let flipCounter = document.querySelector(`.flipcounter`);
let scoreCounter = document.querySelector(`.scorecounter`);
let winCounter = 0;
let currentMinut = document.querySelector(`.minuts`);
let currentSecond = document.querySelector(`.seconds`);
let currentMilisecond = document.querySelector(`.miliseconds`);
let flippedCard = false;
let firstCard;
let secondCard;
let waitForCards = false;
let warningscreen = document.querySelector(`.warningcontainer`);
let warning = document.querySelector(`.warning`);
const watch = setInterval(runStopWatch, 10);

  

// runStopWatch();
// winScreen();

function flipCard() {
  if (waitForCards) return;
  this.classList.toggle(`flipthecard`);

  if (!flippedCard) {
    flippedCard = true;
    firstCard = this;
    return;
  }

  flippedCard = false;
  secondCard = this;

  flipCounter.textContent = parseInt(flipCounter.textContent) + 1;

  checkMatch();
}

function checkMatch() {
  let mabyMatch = firstCard.dataset.img === secondCard.dataset.img;
  if (mabyMatch) {
    stopFlip();
    scoreCounter.textContent = parseInt(scoreCounter.textContent) + 30;
    winCounter += 1;
    if (winCounter === 6 && cards.length === 12) {
      winScreen();
    } else if (winCounter === 9 && mediumCards.length === 18) {
      winScreen();
    } else if (winCounter === 12 && hardCards.length === 24) {
      winScreen();
    }
  } else {
    turnBack();
    scoreCounter.textContent = parseInt(scoreCounter.textContent) - 10;
  }
}

function stopFlip() {
  firstCard.removeEventListener(`click`, flipCard);
  secondCard.removeEventListener(`click`, flipCard);
}
function turnBack() {
  waitForCards = true;
  setTimeout(() => {
    firstCard.classList.remove(`flipthecard`);
    secondCard.classList.remove(`flipthecard`);
    waitForCards = false;
  }, 1500);
}
// shuffle cards-----------------------------------------------------------------------
(function shuffle() {
  cards.forEach((card) => {
    let position = Math.floor(Math.random() * 24);
    card.style.order = position;
  });
})();
(function shuffle() {
  mediumCards.forEach((card) => {
    let position = Math.floor(Math.random() * 24);
    card.style.order = position;
  });
})();
(function shuffle() {
  hardCards.forEach((card) => {
    let position = Math.floor(Math.random() * 24);
    card.style.order = position;
  });
})();

//timer function ------------------------------------------------------------------------------------
function runStopWatch() {
  currentMilisecond.textContent = parseInt(currentMilisecond.textContent) + 1;

  if (parseInt(currentMilisecond.textContent) === 59) {
    currentSecond.textContent = parseInt(currentSecond.textContent) + 1;
    currentMilisecond.textContent = 00;
  }
  if (parseInt(currentSecond.textContent) === 60) {
    currentMinut.textContent = parseInt(currentMinut.textContent) + 1;
    currentSecond.textContent = 0;
  }
  if (parseInt(currentMinut.textContent) === 60) {
    currentMinut.textContent = 0;
  }
  if (parseInt(currentSecond.textContent) < 10) {
    currentSecond.textContent = "0" + parseInt(currentSecond.textContent);
  }
  if (parseInt(currentMinut.textContent) < 10) {
    currentMinut.textContent = "0" + parseInt(currentMinut.textContent);
  }
}

//event listeners on cards --------------------------------------------------------->
cards.forEach((card) => card.addEventListener(`click`, flipCard));

mediumCards.forEach((card) => card.addEventListener(`click`, flipCard));

hardCards.forEach((card) => card.addEventListener(`click`, flipCard));

restart.addEventListener(`click`, () => {
  window.location.reload();
});
// win screen! --------------------------------------------------------------------->

function winScreen() {
  warningscreen.classList.add(`open`);
  warning.textContent = `You WIN!`;
  let resBtn = document.createElement("BUTTON");
  resBtn.classList.add(`resbtn`);
  resBtn.textContent = `restart`;
  let backBtn = document.createElement("BUTTON");
  backBtn.classList.add(`backbtn`);
  backBtn.textContent = `back to menu`;
  warning.insertAdjacentElement("beforeend", resBtn);
  warning.insertAdjacentElement("beforeend", backBtn);

  resBtn.addEventListener(`click`, () => {
    window.location.reload();
  });

  backBtn.addEventListener(`click`, () => {
    document.location.href = "https://fervent-goodall-a0eb43.netlify.app/";
  });
}
