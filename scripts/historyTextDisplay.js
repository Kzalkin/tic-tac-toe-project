import {historyDisplay, player} from "./variables.js";
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

export { saveHistoryDisplay, revertHistoryDisplay, removeHistoryDisplay, resetHistoryDisplay };