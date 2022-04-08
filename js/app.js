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
