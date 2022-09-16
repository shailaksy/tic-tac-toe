const playerOneNameInput = document.querySelector(
  "[data-input-player-one-name]"
);
const playerOneName = document.querySelector("#player-one");
const playerTwoNameInput = document.querySelector(
  "[data-input-player-two-name]"
);
const playerTwoName = document.querySelector("#player-two");
const playerPage = document.querySelector("#player-page");
const scoreboard = document.querySelector("#scoreboard");
const playerOneNameDisplay = document.querySelector("#player-one-name");
const playerTwoNameDisplay = document.querySelector("#player-two-name");
const playerOneScoreDisplay = document.querySelector("#player-one-score");
const playerTwoScoreDisplay = document.querySelector("#player-two-score");

const turnDisplay = document.querySelector("#turn-display-text");

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

///

const cells = document.querySelectorAll(".cell");

const restartButton = document.querySelector("#restart");
const backButton = document.querySelector("#back");
const undoButton = document.querySelector("#undo");
const redoButton = document.querySelector("#redo");

const winnerDisplay = document.getElementById("winner-message");
const winnerDisplayText = document.querySelector("[data-winner-message-text]");

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

let movesHistory = [];

let history = [
  [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
];

let player = 1;

function startGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  restartButton.addEventListener("click", restartGame);
  gameRunning = true;
  turnDisplay.style.display = 'block';
  undoButton.style.display = 'none';
  redoButton.style.display = 'none';
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");

  if (placeholders[cellIndex] != "" || !gameRunning) {
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
  currentPlayerName =
    currentPlayer === "X" ? playerOneNameInput.value : playerTwoNameInput.value;
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
      playerOneScoreDisplay.textContent =
        localStorage.getItem("PlayerOneScore");
    } else {
      localStorage.PlayerTwoScore = Number(localStorage.PlayerTwoScore) + 1;
      playerTwoScoreDisplay.textContent =
        localStorage.getItem("PlayerTwoScore");
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
  movesHistory = [];
  boardData = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  player = 1;
  turnDisplay.style.display = 'block';
  undoButton.style.display = 'none';
  redoButton.style.display = 'none';
  localStorage.removeItem("MovesHistory");
  turnDisplay.textContent = `${playerOneNameInput.value}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  gameRunning = true;
}

backButton.addEventListener("click", () => {
  winnerDisplay.style.display = "none";
  undoButton.style.display = 'inline';
  redoButton.style.display = 'inline';
});

const displayBoard = (array) => {
    array.flat().forEach((cell, i) => {
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

  movesHistory.push(JSON.parse(JSON.stringify(boardData)));
  localStorage.setItem("MovesHistory", movesHistory);

  history[moves] = JSON.parse(JSON.stringify(boardData));
  localStorage.setItem("History", history);
}

function undoMove() {
    if (moves > 1) {
        history.pop();
        moves--;
        displayBoard(history[moves]);
    } else {
        undoButton.style.display = 'none';
    }
}

function redoMove() {
    moves++;
    console.log(history[moves]);
}

undoButton.addEventListener('click', undoMove);
redoButton.addEventListener('click', redoMove);