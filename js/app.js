/******** Version 3.0 ********/

// Set the button IDs for reference later.
const blkButton = document.getElementById('black-button');
const rgbButton = document.getElementById('rainbow-button');
const eraButton = document.getElementById('eraser-button');
const clrButton = document.getElementById('clear-button');

// Set the size slider IDs for reference later.
const gridSizeElement = document.getElementById('grid-size-element');
const gridSizeInput = document.getElementById('grid-size-input');

// Set the grid ID for reference later.
const grid = document.getElementById('grid');

// Set the default values for the etch-a-sketch board.
const DEFAULT_COLOR = '#3b4145';
const DEFAULT_STATE = 'black';
const DEFAULT_SIZE = 16;

// Set the current values for the etch-a-sketch board.
let currentColor = DEFAULT_COLOR;
let currentState = DEFAULT_STATE;
let currentSize = DEFAULT_SIZE;

// Set the mouseDown event.
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// Functions to change game state when certain buttons are pressed.
blkButton.addEventListener('click', function (e) {
    console.log(e);
    setCurrentBoardState('black');
});

rgbButton.addEventListener('click', function (e) {
    console.log(e);
    setCurrentBoardState('rainbow');
});

eraButton.addEventListener('click', function (e) {
    console.log(e);
    setCurrentBoardState('eraser');
});

clrButton.addEventListener('click', function (e) {
    console.log(e);
    reloadGrid();
});

// Functions to update the status of the board.
function setCurrentColor(newColor) {
    currentColor = newColor;
    console.log('Color swtich: ' + newColor);
}

function setCurrentBoardState(newState) {
    console.log('State switch: ' + currentState + ' to ' + newState);
    setButtonState(newState);
    currentState = newState;
}

function setCurrentSize(newSize) {
    currentSize = newSize;
    console.log('Size switch: ' + newSize);
}

// Functions to control the reset button.
function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

// Function to change the button state CSS.
function setButtonState(newState) {
    // Remove the active state of the buttons.
    if (currentState === 'black') {
        blkButton.classList.remove('active');
    } else if (currentState === 'rainbow') {
        rgbButton.classList.remove('active');
    } else if (currentState === 'eraser') {
        eraButton.classList.remove('active');
    } else {
        console.log(ERROR);
    }

    // Add the active state to new button.
    if (newState === 'black') {
        blkButton.classList.add('active');
    } else if (newState === 'rainbow') {
        rgbButton.classList.add('active');
    } else if (newState === 'eraser') {
        eraButton.classList.add('active');
    } else {
        console.log(ERROR);
    }
}

// Function to control the grid size settings.
gridSizeInput.addEventListener('change', function (e) {
    changeSize(e.target.value);
});

function updateSizeValue(value) {
    gridSizeElement.innerHTML = `Grid Size: ${value} x ${value}`;
}

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

// Setup the grid using defined settings.
function setupGrid(gridSize) {
    let cellSize = (40 / gridSize) + 'vw';

    grid.style.setProperty('--grid-rows', gridSize);
    grid.style.setProperty('--grid-columns', gridSize);
    grid.style.setProperty('--cell-width', cellSize);
    grid.style.setProperty('--cell-height', cellSize);

    for (var i = 0; i < gridSize * gridSize; i++) {
        let gridCell = document.createElement('div');
        grid.appendChild(gridCell).className = 'grid-cell';
        gridCell.addEventListener('mouseover', changeColor);
        gridCell.addEventListener('mousedown', changeColor);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentState === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentState === 'black') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentState === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    } else {
        console.log('ERROR');
    }
}

// Window load function calls.
window.onload = () => {
    setupGrid(DEFAULT_SIZE);
    setButtonState(DEFAULT_STATE);
}
