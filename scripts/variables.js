const historyDisplay = document.querySelector('.history-display');
const gameContainer = document.querySelector('.game-container');
const playerDisplay = document.querySelector('.display');
const previous = document.querySelector('.previous');
const buttons = document.querySelectorAll('button')
const cells = document.querySelectorAll('.cell');
const reset = document.querySelector('.reset');
const next = document.querySelector('.next');
const winPattern = [[0,1,2],[0,0,0],[1,1,1],[2,2,2],[0,1,2],[2,1,0]];
let player = 'x';

function switchPlayer() {
    player === 'x'? player = 'o' : player = 'x';
}

function displayPlayer(display) {
    display.textContent = `${player.toUpperCase()} is playing`;
}

function resetPlayer() {
    player = 'x';
}

export { gameContainer, previous, buttons, 
        playerDisplay, cells, reset, next, 
        winPattern, historyDisplay, player, 
        switchPlayer, displayPlayer, resetPlayer };