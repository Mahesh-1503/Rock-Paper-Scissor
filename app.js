let userScore = 0;
let compScore = 0;

// Sound effects
const playSound = (type) => {
  // Create audio context
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  
  // Create oscillator
  const oscillator = ctx.createOscillator();
  oscillator.connect(ctx.destination);
  oscillator.start();

  // Add a gain node for volume control
  const gain = ctx.createGain();
  gain.connect(ctx.destination);
  oscillator.connect(gain);

  // Set parameters based on sound type
  switch(type) {
    case 'select':
      oscillator.frequency.value = 1200;
      oscillator.type = 'sine';
      gain.gain.value = 0.5;
      oscillator.stop(ctx.currentTime + 0.15);
      break;

    case 'win':
      oscillator.frequency.value = 700;
      oscillator.type = 'triangle';
      gain.gain.value = 0.8;
      oscillator.stop(ctx.currentTime + 0.4);
      break;

    case 'lose':
      oscillator.frequency.value = 450;
      oscillator.type = 'square';
      gain.gain.value = 0.6;
      oscillator.stop(ctx.currentTime + 0.3);
      break;

    case 'draw':
      oscillator.frequency.value = 550;
      oscillator.type = 'sawtooth';
      gain.gain.value = 0.7;
      oscillator.stop(ctx.currentTime + 0.35);
      break;
  }
};

// Game elements
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

// Game functions
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const updateMessage = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    playSound('win');
    msg.innerHTML = `
      <span class="text-green-600">Win! </span>
      ${userChoice} > ${compChoice}
    `;
  } else if (userChoice === compChoice) {
    playSound('draw');
    msg.innerHTML = `
      <span class="text-gray-600">Draw. </span>
      Play again
    `;
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    playSound('lose');
    msg.innerHTML = `
      <span class="text-red-600">Lost. </span>
      ${compChoice} > ${userChoice}
    `;
  }
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerHTML = `Play your move`;
  playSound('select');
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();
  playSound('select');
  
  let userWin = false;
  if (userChoice === compChoice) {
    updateMessage(false, userChoice, compChoice);
  } else if (userChoice === "rock") {
    userWin = compChoice === "scissors";
  } else if (userChoice === "paper") {
    userWin = compChoice === "rock";
  } else {
    userWin = compChoice === "paper";
  }
  
  updateMessage(userWin, userChoice, compChoice);
};

// Event listeners
const resetBtn = document.querySelector("#resetBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", resetGame);
}

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
