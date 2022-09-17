import {
    winnerDisplay,
    undoMove,
    redoMove
} from './game.js'

export const restartButton = document.querySelector("#restart");
const backButton = document.querySelector("#back");
export const undoButton = document.querySelector("#undo");
export const redoButton = document.querySelector("#redo");

backButton.addEventListener("click", () => {
    winnerDisplay.style.display = "none";
    undoButton.style.display = 'inline';
    redoButton.style.display = 'inline';
});
  
undoButton.addEventListener('click', undoMove);
  
redoButton.addEventListener('click', redoMove);