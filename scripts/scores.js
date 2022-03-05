import {player} from "./variables.js";
let xScore = 0;
let oScore = 0;

function setScore() {
    if (player === 'x') {
        const xScoreDisplay = document.querySelector('.X-score');
        xScoreDisplay.textContent = `X : ${++xScore}`;
    } else {
        const oScoreDisplay = document.querySelector('.O-score');
        oScoreDisplay.textContent = `O : ${++oScore}`;
    }
}

function decScore() {
    if (player === 'x') {
        const xScoreDisplay = document.querySelector('.X-score');
        xScoreDisplay.textContent = `X : ${--xScore}`;
    } else {
        const oScoreDisplay = document.querySelector('.O-score');
        oScoreDisplay.textContent = `O : ${--oScore}`;
    }
}

export {setScore, decScore};