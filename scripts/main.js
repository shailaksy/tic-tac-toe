const playerOneNameInput = document.querySelector('[data-input-player-one-name]');
const playerOneName = document.querySelector('#player-one');
const playerTwoNameInput = document.querySelector('[data-input-player-two-name]');
const playerTwoName = document.querySelector('#player-two');
const playerPage = document.querySelector('#player-page');
const scoreboard = document.querySelector('#scoreboard');
const playerOneNameDisplay = document.querySelector('#player-one-name');
const playerTwoNameDisplay = document.querySelector('#player-two-name');
const playerOneScoreDisplay = document.querySelector('#player-one-score');
const playerTwoScoreDisplay = document.querySelector('#player-two-score');

const turnDisplay = document.querySelector('#turn-display-text');

playerTwoName.style.display = "none";
turnDisplay.style.display = "none";

playerOneNameInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        if (playerOneNameInput.value) {
            playerOneName.style.display = "none";
            playerTwoName.style.display = "block";
            localStorage.setItem('PlayerOne', playerOneNameInput.value);
            localStorage.PlayerOneScore = 0;
        } else {
            alert("Enter a new player\'s name.");
        }
    } 
})

playerTwoNameInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        if (playerTwoNameInput.value) {
            if (playerTwoNameInput.value === playerOneNameInput.value) {
                alert("Enter a new player\'s name.");
            } else {
                localStorage.setItem('PlayerTwo', playerTwoNameInput.value); 
                localStorage.PlayerTwoScore = 0;
                playerTwoName.style.display = "none";
                scoreboard.style.display = "flex";
                playerOneNameDisplay.textContent = playerOneNameInput.value;
                playerTwoNameDisplay.textContent = playerTwoNameInput.value;
                playerOneScoreDisplay.textContent = '0';
                playerTwoScoreDisplay.textContent = '0';
                playerPage.style.display = "none";
                turnDisplay.style.display = "block";
                turnDisplay.textContent = `${playerOneNameInput.value}'s turn`;
                startGame();
            }
        } else {
            alert("Enter a new player\'s name.");
        }    
    }
})

///

const cells = document.querySelectorAll('.cell');

const resetButton = document.querySelector('#reset');
const restartButton = document.querySelector('#restart');
const undoButton = document.querySelector('#undo');
const redoButton = document.querySelector('#redo');

const winnerDisplay = document.getElementById('winner-message');
const winnerDisplayText = document.querySelector('[data-winner-message-text]');

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let currentPlayerName = '';
let running = false;

let moves = 0;

function startGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    resetButton.addEventListener("click", restartGame);
    running = true;
}   

function cellClicked() {
    const cellIndex = this.getAttribute('cellIndex');

    if (options[cellIndex] != "" || !running) { 
        return;
    }
    
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    moves += 1;
    console.log(moves);
}


/* hover

    cell.addEventListener('mouseover', () => {
        if (cell.textContent = '') {
            if (moves % 2 === 0) {
                cell.textContent = 'O';
            } else {
                cell.textContent = 'X';
            }
        }
    })
*/

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    currentPlayerName = (currentPlayer === 'X') ? playerOneNameInput.value : playerTwoNameInput.value;
    turnDisplay.textContent = `${currentPlayerName}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winCombos.length; i++) {
        const combo = winCombos[i];
        const cellA = options[combo[0]];
        const cellB = options[combo[1]];
        const cellC = options[combo[2]];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        } else if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if(roundWon) {
        winnerDisplay.style.display = 'flex';
        winnerDisplayText.textContent = `${currentPlayerName} wins`;
        running = false;
        if (currentPlayer === 'X'){
            localStorage.PlayerOneScore = Number(localStorage.PlayerOneScore) + 1;
            playerOneScoreDisplay.textContent = localStorage.getItem('PlayerOneScore');
        } else {
            localStorage.PlayerTwoScore = Number(localStorage.PlayerTwoScore) + 1;
            playerTwoScoreDisplay.textContent = localStorage.getItem('PlayerTwoScore');
        }
    } else if (!options.includes('')) {
        winnerDisplay.style.display = 'flex';
        winnerDisplayText.textContent = `draw`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    turnDisplay.textContent = `${playerOneNameInput.value}'s turn`;
    cells.forEach(cell => cell.textContent = '');
    running = true;
}

restartButton.addEventListener("click", () => {
    restartGame();
    winnerDisplay.style.display = 'none';
});


///

/*
if() // if board has cells, allow undo

undoButton.addEventListener('click', () => {

})

redoButton.addEventListener('click', () => {

})

function previousMove() {

}

function nextMove() {

}
*/

const array = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
];

const history = [
    [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ],
];

