function checkWin(array, checkArray) {
    for (let count = 0; count < checkArray.length; ++count) {
        for (let incount = 0; incount < array.length; ++incount) {
            if (count === 0) {
                let a = array[incount][checkArray[count][0]];
                let b = array[incount][checkArray[count][1]];
                let c = array[incount][checkArray[count][2]];
                if (a === "" || b === "" || c === "") { continue };
                if (a === b && b === c && a === c) { return true; };
            } else if (incount === 0) {
                let a = array[0][checkArray[count][0]];
                let b = array[1][checkArray[count][1]];
                let c = array[2][checkArray[count][2]];
                if (a === "" || b === "" || c === "") { continue };
                if (a === b && b === c && a === c) { return true; };
            }
        }
    }
    return false;
}

function setValues(array, element) {
    let cellIndex = 0;
    for (let count = 0; count < array.length; count++) {
        for (let incount = 0; incount < array[count].length; ++incount) {
            if (array[count][incount] === 'x') {
                element[cellIndex++].innerHTML = `<i class="fa-solid fa-x"></i>`;
            } else if (array[count][incount] === 'o') {
                element[cellIndex++].innerHTML = `<i class="fa-solid fa-o"></i>`;
            } else {
                element[cellIndex++].textContent = "";
            }
        }
    }
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

function drawCheck(cells) {
    let isDraw = true;
    for (let count = 0; count < cells.length; ++count) {
        if (cells[count].innerHTML === '') {
            isDraw = false;
            break; 
        }
    }
    return isDraw;
}

function cellsRemoveListeners(cells, fn) {
    cells.forEach( item => {
        item.removeEventListener('click', fn);
    })
}

function cellsCreateListener(cells, fn) {
    cells.forEach( item => {
        if (item.innerHTML === '') 
        item.addEventListener('click', fn);
    })
}

function buttonFlipFalse(item, fn) {
    item.style.opacity = 0.5;
    item.removeEventListener('click', fn);
}

function buttonFlipTrue(item, fn) {
    item.style.opacity = 1;
    item.addEventListener('click', fn);
}

function copyArray(array) {
    return JSON.parse(JSON.stringify(array));
}

function setPointerEvents(element, state) {
    element.style.pointerEvents = state;
}

function setPlayerSwitchTrue(element, fn) {
    element.style.cursor = 'pointer';
    element.addEventListener( 'click', fn);
}

function setPlayerSwitchFalse(element, fn) {
    element.style.cursor = 'default';
    element.removeEventListener('click', fn);
}

export{ checkWin, setValues, saveValues, 
        drawCheck, cellsCreateListener, 
        cellsRemoveListeners, buttonFlipFalse, 
        buttonFlipTrue, copyArray, setPointerEvents,
        setPlayerSwitchFalse, setPlayerSwitchTrue };