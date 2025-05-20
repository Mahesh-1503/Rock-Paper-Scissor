let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const updateMessage = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerHTML = `
      <span class="text-green-600">Win! </span>
      ${userChoice} > ${compChoice}
    `;
  } else if (userChoice === compChoice) {
    msg.innerHTML = `
      <span class="text-gray-600">Draw. </span>
      Play again
    `;
  } else {
    compScore++;
    compScorePara.innerText = compScore;
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
};

// Add event listener for reset button
const resetBtn = document.querySelector("#resetBtn");
if (resetBtn) {
  resetBtn.addEventListener("click", resetGame);
}

const playGame = (userChoice) => {
  const compChoice = genCompChoice();
  
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

// Initialize event listeners
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
