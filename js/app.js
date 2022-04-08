
// Set the button IDs for reference later.
const blkButton = document.getElementById('black-button');
const rgbButton = document.getElementById('rainbow-button');
const eraButton = document.getElementById('eraser-button');
const clrButton = document.getElementById('clear-button');

// Set the size slider IDs for reference later.
const gridSizeValue = document.getElementById('grid-size-selector-element');
const gridSizeSlide = document.getElementById('grid-size-input');

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

// Functions to change default values for the board.
function setCurrentColor(newColor) {
    currentColor = newColor;
    console.log('Color Switch: ' + newColor);
}

function setCurrentState(newState) {
    setButtonState(newState);
    currentState = newState;
    console.log('State Switch: ' + newState);
}

function setCurrentSize(newSize) {
    currentSize = newSize;
    console.log('Size Switch: ' + newSize);
}

// Functions to change game state when certain buttons are pressed.
blkButton.onclick = () => setCurrentState('black');
rgbButton.onclick = () => setCurrentState('rainbow');
eraButton.onclick = () => setCurrentState('eraser');

// Functions to control the reset button.
clrButton.onclick = () => reloadGrid();

function reloadGrid() {
    clearGrid();
    setupGrid(currentSize);
}

function clearGrid() {
    grid.innerHTML = '';
}

// Functions to control the grid size.
gridSizeSlide.onmousemove = (e) => updateSizeValue(e.target.value);
gridSizeSlide.onchange = (e) => changeSize(e.target.value);

function updateSizeValue(value) {
    gridSizeValue.innerHTML = `Grid Size: ${value} x ${value}`;
}

function changeSize(value) {
    setCurrentSize(value);
    updateSizeValue(value);
    reloadGrid();
}

// Change the toggle status of the buttons via CSS classes.
function setButtonState(newState) {
    // Remove the active state of current button.
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
    if (currentState === 'black') {
        blkButton.classList.add('active');
    } else if (currentState === 'rainbow') {
        rgbButton.classList.add('active');
    } else if (currentState === 'eraser') {
        eraButton.classList.add('active');
    } else {
        console.log(ERROR);
    }
}

// Setup the grid based on the values chosen.
function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (var i = 0; i < size; i++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid-cell');
        gridCell.addEventListener('mouseover', changeColor);
        gridCell.addEventListener('mousedown', changeColor);
        grid.appendChild(gridCell);
    }
}

// Change the color of individual cells.
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    if (currentState === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
    } else if (currentState === 'color') {
        e.target.style.backgroundColor = currentColor;
    } else if (currentState === 'eraser') {
        e.target.style.backgroundColor = '#fefefe';
    }
}

// Create the grid on window load.
window.onLoad = () => {
    setupGrid(DEFAULT_SIZE);
    setButtonState(DEFAULT_STATE);
}



/*
const container = document.getElementById('grid');
const gridSizePrompt = prompt('What grid size should we use?')
const inputGridSize = document.querySelectorAll('.grid-size-range');

function makeGrid(gridSize) {
    let cellSize = (40 / gridSize) + 'vh';

    container.style.setProperty('--grid-rows', gridSize);
    container.style.setProperty('--grid-columns', gridSize);
    container.style.setProperty('--cell-width', cellSize);
    container.style.setProperty('--cell-height', cellSize);

    for (var i = 0; i < (gridSize * gridSize); i++) {
        let gridCell = document.createElement('div');
        container.appendChild(gridCell).className = 'grid-cell';
    }
}

makeGrid(gridSizePrompt);
*/
