import {
    startGame
} from './game.js';

export const playerOneNameInput = document.querySelector("[data-input-player-one-name]");
const playerOneName = document.querySelector("[data-player-one]");
export const playerTwoNameInput = document.querySelector("[data-input-player-two-name]");
const playerTwoName = document.querySelector("[data-player-two]");
const playerPage = document.querySelector("[data-player-page]");
const scoreboard = document.querySelector("[data-scoreboard]");
const playerOneNameDisplay = document.querySelector("[data-player-one-name]");
const playerTwoNameDisplay = document.querySelector("[data-player-two-name]");
export const playerOneScoreDisplay = document.querySelector("[data-player-one-score]");
export const playerTwoScoreDisplay = document.querySelector("[data-player-two-score]");
export const turnDisplay = document.querySelector("[data-turn-display-text]");

playerTwoName.style.display = "none";
turnDisplay.style.display = "none";

playerOneNameInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      if (playerOneNameInput.value) {
        playerOneName.style.display = "none";
        playerTwoName.style.display = "block";
        playerOneNameDisplay.textContent = playerOneNameInput.value;
        playerOneScoreDisplay.textContent = "0";
        localStorage.setItem("PlayerOne", playerOneNameInput.value);
        localStorage.PlayerOneScore = 0;
      } else {
        alert("Enter a new player's name.");
      }
    }
  });
  
playerTwoNameInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      if (playerTwoNameInput.value) {
        if (playerTwoNameInput.value === playerOneNameInput.value) {
          alert("Enter a new player's name.");
        } else {
          localStorage.setItem("PlayerTwo", playerTwoNameInput.value);
          localStorage.PlayerTwoScore = 0;
          playerTwoName.style.display = "none";
          scoreboard.style.display = "flex";
          playerTwoNameDisplay.textContent = playerTwoNameInput.value;
          playerTwoScoreDisplay.textContent = "0";
          playerPage.style.display = "none";
          turnDisplay.style.display = "block";
          turnDisplay.textContent = `${playerOneNameInput.value}'s turn`;
          startGame();
        }
      } else {
        alert("Enter a new player's name.");
      }
    }
});