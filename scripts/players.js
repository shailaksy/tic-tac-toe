import {
    startGame
} from './game.js';

export const playerOneNameInput = document.querySelector("[data-input-player-one-name]");
const playerOneName = document.querySelector("#player-one");
export const playerTwoNameInput = document.querySelector("[data-input-player-two-name]");
const playerTwoName = document.querySelector("#player-two");
const playerPage = document.querySelector("#player-page");
const scoreboard = document.querySelector("#scoreboard");
const playerOneNameDisplay = document.querySelector("#player-one-name");
const playerTwoNameDisplay = document.querySelector("#player-two-name");
export const playerOneScoreDisplay = document.querySelector("#player-one-score");
export const playerTwoScoreDisplay = document.querySelector("#player-two-score");
export const turnDisplay = document.querySelector("#turn-display-text");

playerTwoName.style.display = "none";
turnDisplay.style.display = "none";

playerOneNameInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      if (playerOneNameInput.value) {
        playerOneName.style.display = "none";
        playerTwoName.style.display = "block";
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
          playerOneNameDisplay.textContent = playerOneNameInput.value;
          playerTwoNameDisplay.textContent = playerTwoNameInput.value;
          playerOneScoreDisplay.textContent = "0";
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