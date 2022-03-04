const gameContainer = document.querySelector('.game-container');
const previous = document.querySelector('.previous');
const buttons = document.querySelectorAll('button')
const playerDisplay = document.querySelector('.display');
const cells = document.querySelectorAll('.cell');
const reset = document.querySelector('.reset');
const next = document.querySelector('.next');
const winCheck = [[0,1,2],[0,0,0],[1,1,1],[2,2,2],[0,1,2],[2,1,0]];
let boardValue = [['','',''],['','',''],['','','']];
let historyHandler = [];
let historyIndex = -1;
let gameHistory = [];
let historyLimit = 0;
let player = 'x';

function checkWin() {
    for (let count = 0; count < winCheck.length; ++count) {
        for (let incount = 0; incount < boardValue.length; ++incount) {
            if (count === 0) {
                let a = boardValue[incount][winCheck[count][0]];
                let b = boardValue[incount][winCheck[count][1]];
                let c = boardValue[incount][winCheck[count][2]];
                if (a === "" || b === "" || c === "") { continue };
                if (a === b && b === c && a === c) { return true; };
            } else {
                let a = boardValue[0][winCheck[count][0]];
                let b = boardValue[1][winCheck[count][1]];
                let c = boardValue[2][winCheck[count][2]];
                if (a === "" || b === "" || c === "") { continue };
                if (a === b && b === c && a === c) { return true; };
            }
        }
    }
    return false;
}

function setValues(array) {
    let cellIndex = 0;
    for (let count = 0; count < array.length; count++) {
        for (let incount = 0; incount < array[count].length; ++incount) {
            if (array[count][incount] === 'x') {
                cells[cellIndex++].innerHTML = `<i class="fa-solid fa-x"></i>`;
            } else if (array[count][incount] === 'o') {
                cells[cellIndex++].innerHTML = `<i class="fa-solid fa-o"></i>`;
            } else {
                cells[cellIndex++].textContent = "";
            }
        }
    }
}

function switchPlayer() {
    player === 'x'? player = 'o' : player = 'x';
}

function displayPlayer() {
    playerDisplay.textContent = `${player.toUpperCase()} is playing`;
}

function saveValues(position, data , array) {
    if (position < 3) {
        array[0][position % 3] = data;
    } else if ( position >= 3 && position < 6) {
        array[1][position % 3] = data;
    } else if (position >= 6) {
        array[2][position % 3] = data;
    }
}

function cellsRemoveListeners(fn) {
    cells.forEach( item => {
        item.removeEventListener('click', fn);
    })
}

function cellsCreateListener(fn) {
    cells.forEach( item => {
        if (item.innerHTML === '') 
        item.addEventListener('click', fn);
    })
}

function drawCheck() {
    let isDraw = true;
    for (let count = 0; count < cells.length; ++count) {
        if (cells[count].innerHTML === '') {
            isDraw = false;
            break; 
        }
    }
    // cells.forEach( item => {
    //     if (item.innerHTML === '') {
    //         isDraw = false;
    //         return isDraw;
    //     }
    // })
    return isDraw;
}

function buttonFlipFalse(item, fn) {
    item.style.opacity = 0.5;
    item.removeEventListener('click', fn);
}

function buttonFlipTrue(item, fn) {
    item.style.opacity = 1;
    item.addEventListener('click', fn);
}

function determineWinner() {
    if (checkWin()) {
        playerDisplay.textContent = `${player.toUpperCase()} Won!`;
        cellsRemoveListeners(play);
        cellsRemoveListeners(newPlay);
        buttonFlipFalse(next, setNext);
        gameContainer.style.pointerEvents = 'none';
        return true;
    } else if (drawCheck()) {
        playerDisplay.textContent = 'DRAW!';
        gameContainer.style.pointerEvents = 'none';
        buttonFlipFalse(next, setNext);
        return true;
    };
}

function handlePlay(event) {
    let id = event.target.id;
    cells[id].innerHTML = `<i class="fa-solid fa-${player}"></i>`;
    saveValues(id, player, boardValue);
    gameHistory.push(JSON.parse(JSON.stringify(boardValue)));
    cells[id].removeEventListener('click', play);
    saveHistoryDisplay(event);
    if (!determineWinner()) {
        switchPlayer();
        displayPlayer();
    }
    if (historyLimit !== 1) {
        buttonFlipTrue(previous, setPrevious);
    }
    buttonFlipFalse(next, setNext);
}

function play(event) {
    ++historyIndex;
    ++historyLimit;
    handlePlay(event);
    playerDisplay.style.cursor = 'default';
    playerDisplay.removeEventListener('click', changeInitialPlayer);
}

function newPlay(event) {
    historyHandler = [];
    historyIndex = gameHistory.length;
    historyLimit = gameHistory.length + 1;
    handlePlay(event);
    cellsRemoveListeners(play);
}

function previousBWinHandle() {
    const maxHistoryLimit = 9;
    const display = playerDisplay.textContent;
    if (historyIndex + 2 === maxHistoryLimit && display === 'DRAW!' || display.includes('Won') ) {
        displayPlayer();
    } else {
        switchPlayer();
        displayPlayer();
    }
}

function setPrevious() {
    if (historyIndex > 0) {
        if (historyIndex === 1) { 
            buttonFlipFalse(previous, setPrevious);
        }
        historyHandler.push(gameHistory.pop());
        setValues(gameHistory[--historyIndex]);
        boardValue = JSON.parse(JSON.stringify(gameHistory[historyIndex]));
        previousBWinHandle();
        removeHistoryDisplay();
        cellsCreateListener(newPlay);
        buttonFlipTrue(next, setNext);
        gameContainer.style.pointerEvents = 'auto';
    }
}

function nextBWinHandle() {
    if (checkWin()){
        playerDisplay.textContent = `${player.toUpperCase()} Won!`;
        gameContainer.style.pointerEvents = 'none';
        cellsRemoveListeners(play);
        cellsRemoveListeners(newPlay);
    } else if (drawCheck()) {
        playerDisplay.textContent = 'DRAW!';
        gameContainer.style.pointerEvents = 'none';
    } else {
        switchPlayer();
        displayPlayer();
    }
}

function setNext() {
    if (historyIndex < historyLimit - 1) {
        if (historyIndex === historyLimit - 2) {
            buttonFlipFalse(next, setNext);
        };
        gameHistory.push(historyHandler.pop());
        setValues(gameHistory[++historyIndex]);
        boardValue = JSON.parse(JSON.stringify(gameHistory[historyIndex]));
        nextBWinHandle();
        revertHistoryDisplay();
        cellsCreateListener(newPlay);
        buttonFlipTrue(previous, setPrevious);
    }
}

function setReset() {
    player = 'x';
    gameHistory = [];
    historyLimit = 0;
    historyIndex = -1;
    historyHandler = [];
    boardValue = [['','',''],['','',''],['','','']];
    displayPlayer();
    resetHistoryDisplay();
    setValues(boardValue);
    cellsCreateListener(play);
    cellsRemoveListeners(newPlay);
    buttonFlipFalse(next, setNext);
    buttonFlipFalse(previous, setPrevious);
    playerDisplay.style.cursor = 'pointer';
    playerDisplay.addEventListener( 'click', changeInitialPlayer);
    gameContainer.style.pointerEvents = 'auto';
}

function changeInitialPlayer() {
    switchPlayer();
    displayPlayer();
}

function init() {
    displayPlayer();
    cellsCreateListener(play);
    buttonFlipFalse(next, setNext);
    buttonFlipFalse(previous, setPrevious);
    reset.addEventListener('click', setReset);
    playerDisplay.addEventListener( 'click', changeInitialPlayer);
}

const historyDisplay = document.querySelector('.history-display');
let historyDisplayHandler = [];

function saveHistoryDisplay(event) {
    const historyItem = document.createElement('p');
    let id = event.target.id;
    if (id < 3) {
        historyItem.textContent = `${player.toUpperCase()}: Row 1, Column ${(id % 3) + 1}`;
    } else if ( id >= 3 && id < 6) {
        historyItem.textContent = `${player.toUpperCase()}: Row 2, Column ${(id % 3) + 1}`;
    } else if (id >= 6) {
        historyItem.textContent = `${player.toUpperCase()}: Row 3, Column ${(id % 3) + 1}`;
    }
    historyDisplay.appendChild(historyItem);
}

function revertHistoryDisplay() {
    const historyItem = document.createElement('p');
    historyItem.textContent = historyDisplayHandler.pop();
    historyDisplay.appendChild(historyItem);
}

function removeHistoryDisplay() {
    historyDisplayHandler.push(historyDisplay.lastElementChild.textContent);
    historyDisplay.removeChild(historyDisplay.lastElementChild);
}

function resetHistoryDisplay() {
    historyDisplay.innerHTML = "";
}

init();