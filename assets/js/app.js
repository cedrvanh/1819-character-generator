const generateGrid = (count) => {
    const container = document.querySelector('.grid');

    for(let i = 0; i < count; i++) {
        const row  = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);

        for(let j = 0; j < count; j++) {
            const cell  = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
    }
}

const generateRandomCharacter = () => {
    const rows = document.querySelectorAll('.grid .row');

    rows.forEach(row => {
        const cells = row.children;
        for(let i = 0; i < (cells.length / 2); i++) {
            if(Math.random() > 0.5) {
                cells[i].classList.add('active');
                cells[cells.length - 1 - i].classList.add('active');
            }
        }
    })
}

const init = () => {
    generateGrid(8);
    generateRandomCharacter();
}

init();