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

const init = () => {
    generateGrid(8);
}

init();