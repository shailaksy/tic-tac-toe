import {
  turnDisplay,
  playerOneNameInput,
  playerTwoNameInput,
  playerOneScoreDisplay,
  playerTwoScoreDisplay
} from './players.js';

import {
  restartButton,
  undoButton,
  redoButton
} from './buttons.js';

const cells = document.querySelectorAll("[data-cell]");
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
export const winnerDisplay = document.querySelector("[data-winner-message]");
const winnerDisplayText = document.querySelector("[data-winner-message-text]");

let placeholders = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let currentPlayerName = "";
let gameRunning = false;
let moves = 0;
let boardData = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let history = [
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
];
let player = 1;

export function startGame() {
  cells.forEach((cell) => cell.addEventListener("click", clickCell));
  restartButton.addEventListener("click", restartGame);
  gameRunning = true;
  turnDisplay.style.display = 'block';
  undoButton.style.display = 'none';
  redoButton.style.display = 'none';
}

function clickCell() {
  const cellIndex = this.getAttribute("cellIndex");
  if (boardData.flat()[cellIndex] != "" || !gameRunning) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  placeholders[index] = currentPlayer;
  cell.textContent = currentPlayer;
  saveData(index);
  
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  currentPlayerName = currentPlayer === "X" ? playerOneNameInput.value : playerTwoNameInput.value;
  turnDisplay.textContent = `${currentPlayerName}'s turn`;
}

function checkWinner() {
  let gameoverWin = false;
  for (let i = 0; i < winCombos.length; i++) {
    const combo = winCombos[i];
    const cellRowOne = placeholders[combo[0]];
    const cellRowTwo = placeholders[combo[1]];
    const cellRowThree = placeholders[combo[2]];
    if (cellRowOne === "" || cellRowTwo === "" || cellRowThree === "") {
      continue;
    } else if (cellRowOne === cellRowTwo && cellRowTwo === cellRowThree) {
      gameoverWin = true;
      break;
    }
  }
  if (gameoverWin) {
    winnerDisplay.style.display = "flex";
    winnerDisplayText.textContent = `${currentPlayerName} wins`;
    turnDisplay.style.display = 'none';
    gameRunning = false;
    if (currentPlayer === "X") {
      localStorage.PlayerOneScore = Number(localStorage.PlayerOneScore) + 1;
      playerOneScoreDisplay.textContent = localStorage.getItem("PlayerOneScore");
    } else {
      localStorage.PlayerTwoScore = Number(localStorage.PlayerTwoScore) + 1;
      playerTwoScoreDisplay.textContent = localStorage.getItem("PlayerTwoScore");
    }
  } else if (!placeholders.includes("")) {
    winnerDisplay.style.display = "flex";
    winnerDisplayText.textContent = `draw`;
    gameRunning = false;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  placeholders = ["", "", "", "", "", "", "", "", ""];
  moves = 0;
  boardData = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  player = 1;
  turnDisplay.style.display = 'block';
  undoButton.style.display = 'none';
  redoButton.style.display = 'none';
  localStorage.removeItem("History");
  turnDisplay.textContent = `${playerOneNameInput.value}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  gameRunning = true;
}

function displayBoard(board) {
  board.flat().forEach((cell, i) => {
    if (cell !== "") {
      cells[i].textContent = cell > 0 ? "X" : "O";
    } else {
      cells[i].textContent = cell;
    }
  });
}

function saveData(i) {
  let col = i % 3;
  let row = (i - col) / 3;
  boardData[row][col] = player; //x
  player *= -1; //o
  moves++;
  history[moves] = JSON.parse(JSON.stringify(boardData));
  localStorage.setItem("History", history);
}

export function undoMove() {
  console.log('moves',moves);
  console.log('history',history);
  if (moves > 1) {
    moves--;
    displayBoard(history[moves]);
    redoButton.style.display = 'inline';
    if (moves === 1) {
      undoButton.style.display = 'none';
    }
  }
}

export function redoMove() {
  if (moves < history.length) {
    moves++;
    displayBoard(history[moves]);
    undoButton.style.display = 'inline';
    if (moves === history.length - 1) {
      redoButton.style.display = 'none';
    }
  }
}
