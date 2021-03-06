import { winPattern, gameContainer, previous, playerDisplay, cells, reset, next, switchPlayer, displayPlayer, resetPlayer, player } from "./variables.js";
import { checkWin, setValues, saveValues, drawCheck, cellsCreateListener, cellsRemoveListeners, buttonFlipFalse, buttonFlipTrue, copyArray, setPointerEvents, setPlayerSwitchFalse, setPlayerSwitchTrue } from "./functions.js";
import { saveHistoryDisplay, revertHistoryDisplay, removeHistoryDisplay, resetHistoryDisplay } from "./historyTextDisplay.js";
import {setScore, decScore} from "./scores.js";
let boardValue = [['','',''],['','',''],['','','']];
let historyHandler = [];
let historyIndex = -1;
let gameHistory = [];
let historyLimit = 0;

function changeInitialPlayer() {
    switchPlayer();
    displayPlayer(playerDisplay);
}

function determineWinner() {
    if (checkWin(boardValue, winPattern)) {
        playerDisplay.textContent = `${player.toUpperCase()} Won!`;
        cellsRemoveListeners(cells,play);
        cellsRemoveListeners(cells,newPlay);
        buttonFlipFalse(next, setNext);
        setPointerEvents(gameContainer, 'none');
        setScore();
        return true;
    } else if (drawCheck(cells)) {
        playerDisplay.textContent = 'DRAW!';
        setPointerEvents(gameContainer, 'none');
        buttonFlipFalse(next, setNext);
        return true;
    };
}

function handlePlay(event) {
    const element = event.target;
    element.innerHTML = `<i class="fa-solid fa-${player}"></i>`;
    element.removeEventListener('click', play);
    saveValues(event, player, boardValue);
    gameHistory.push(copyArray(boardValue));
    saveHistoryDisplay(event);
    if (!determineWinner()) {
        switchPlayer();
        displayPlayer(playerDisplay);
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
    setPlayerSwitchFalse(playerDisplay, changeInitialPlayer);
}

function newPlay(event) {
    historyHandler = [];
    historyIndex = gameHistory.length;
    historyLimit = gameHistory.length + 1;
    handlePlay(event);
    cellsRemoveListeners(cells,play);
}

function previousBWinHandle() {
    const maxHistoryLimit = 9;
    const display = playerDisplay.textContent;
    if (historyIndex + 2 === maxHistoryLimit && display === 'DRAW!') {
        displayPlayer(playerDisplay);
    } else if (display.includes('Won')) {
        displayPlayer(playerDisplay);
        decScore();
    } else {
        switchPlayer();
        displayPlayer(playerDisplay);
    }
}

function setPrevious() {
    if (historyIndex > 0) {
        if (historyIndex === 1) { 
            buttonFlipFalse(previous, setPrevious);
        }
        historyHandler.push(gameHistory.pop());
        setValues(gameHistory[--historyIndex], cells);
        boardValue = copyArray(gameHistory[historyIndex]);
        previousBWinHandle();
        removeHistoryDisplay();
        cellsCreateListener(cells,newPlay);
        buttonFlipTrue(next, setNext);
        setPointerEvents(gameContainer, 'auto');
    }
}

function nextBWinHandle() {
    if (checkWin(boardValue, winPattern)){
        playerDisplay.textContent = `${player.toUpperCase()} Won!`;
        setPointerEvents(gameContainer, 'none');
        cellsRemoveListeners(cells,play);
        cellsRemoveListeners(cells,newPlay);
        setScore();
    } else if (drawCheck(cells)) {
        playerDisplay.textContent = 'DRAW!';
        setPointerEvents(gameContainer, 'none');
    } else {
        switchPlayer();
        displayPlayer(playerDisplay);
    }
}

function setNext() {
    if (historyIndex < historyLimit - 1) {
        if (historyIndex === historyLimit - 2) {
            buttonFlipFalse(next, setNext);
        };
        gameHistory.push(historyHandler.pop());
        setValues(gameHistory[++historyIndex], cells);
        boardValue = copyArray(gameHistory[historyIndex]);
        nextBWinHandle();
        revertHistoryDisplay();
        cellsCreateListener(cells,newPlay);
        buttonFlipTrue(previous, setPrevious);
    }
}

function setReset() {
    resetPlayer();
    gameHistory = [];
    historyLimit = 0;
    historyIndex = -1;
    historyHandler = [];
    boardValue = [['','',''],['','',''],['','','']];
    displayPlayer(playerDisplay);
    resetHistoryDisplay();
    setValues(boardValue, cells);
    cellsCreateListener(cells,play);
    cellsRemoveListeners(cells,newPlay);
    buttonFlipFalse(next, setNext);
    buttonFlipFalse(previous, setPrevious);
    setPlayerSwitchTrue(playerDisplay, changeInitialPlayer);
    setPointerEvents(gameContainer, 'auto');
}

function init() {
    displayPlayer(playerDisplay);
    cellsCreateListener(cells,play);
    buttonFlipFalse(next, setNext);
    buttonFlipFalse(previous, setPrevious);
    reset.addEventListener('click', setReset);
    setPlayerSwitchTrue(playerDisplay, changeInitialPlayer);
}

init();