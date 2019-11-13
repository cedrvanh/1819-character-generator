// Firestore Instance
const db = firebase.firestore();
const characterRef = db.collection('characters');

const generateBtn = document.querySelector('#generateBtn');
const saveBtn = document.querySelector('#saveBtn');
const clearBtn = document.querySelector('#clearBtn');
const size = 8;
const character = [];

const generateGrid = (count) => {
    const container = document.querySelector('.character-generator > .grid');

    for(let i = 0; i < count; i++) {
        const row  = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);

        for(let j = 0; j < count; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
    }
}

const generateSmallCharacterGrid = (character, container) => {
    // Get bits in readable format
    const bits = JSON.parse(character.bitArray);
                
    // Define elements
    const characterItem = document.createElement('article');
    const characterHeading = document.createElement('h2');
    const grid = document.createElement('div');

    // Add classes
    characterItem.classList.add('character');
    grid.classList.add('grid', 'grid--small');
    characterHeading.classList.add('character__name');

    // Set character name
    characterHeading.innerHTML = character.name;

    // Loop through bits and calculate active pixels
    bits.map(rowData => {
        const row  = document.createElement('div');
        row.classList.add('row');

        rowData.forEach(cellData => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cellData ? cell.classList.add('active') : ''
            row.appendChild(cell);
        })

        grid.appendChild(row)
    })

    // Append childs
    characterItem.appendChild(grid);
    characterItem.appendChild(characterHeading);
    container.appendChild(characterItem);
}

const resetGrid = () => {
    const cells = document.querySelectorAll('.character-generator > .grid .cell');
    let inputElement = document.querySelector('#characterName');
    
    cells.forEach(cell => {
        if(cell.classList.contains('active')) {
            cell.classList.remove('active');
        }
    })
    inputElement.value = '';
}


const generateRandomCharacter = () => {    
    const rows = document.querySelectorAll('.character-generator > .grid .row');

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

const liveMode = () => {
    const cells = document.querySelectorAll('.character-generator > .grid .cell');
    cells.forEach(cell => {
        cell.addEventListener('click', (e) =>  {
            const cell = e.target;
            cell.classList.toggle('active');
        })
    })
}

const saveCharacter = () => {
    const rows = document.querySelectorAll('.character-generator > .grid .row');

    // Iterate grid rows
    rows.forEach(row => {
        const cells = row.children;
        const rowData = [];

        // Push active | non-active bits to row array
        for(let i = 0; i < cells.length; i++) {
            if(cells[i].classList.contains('active')) {
                rowData.push(1);
            } else {
                rowData.push(0);
            }
        }
        
        // Push row data to character array
        character.push(rowData);
    })

    // Save character to DB
    saveToDatabase(characterRef, {
        bitArray: JSON.stringify(character),
        name: getCharacterName()
    });

    // // Empties grid after saving character
    resetGrid();
}


const getCharacters = async () => {
    const collection = await characterRef.get();
    return collection.docs.map(doc => doc.data());
}

const renderCharacters = () => {
    const container = document.querySelector('.characters');
    container.innerHTML = '';

    getCharacters().then(doc => {
        doc.map(character => {
            generateSmallCharacterGrid(character, container);
        });
    })
}


const saveToDatabase = (ref, obj) => {
    ref.add(obj).then(doc => {
        console.log(`Document with ID: ${doc.id} successfully created`);
    })
}

const getCharacterName = () => {
    const inputValue = document.querySelector('#characterName').value;
    return inputValue;
}

const resetCharacterName = () => {
    let inputElempent = document.querySelector('#characterName');
    inputElempent.value = '';
}


const init = () => {
    generateGrid(size);
    generateRandomCharacter();
    liveMode();

    characterRef.onSnapshot(() => {
        renderCharacters();
    })

    generateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Clear Grid
        resetGrid();
        // Generate new character
        generateRandomCharacter();
    })

    saveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Save character
        saveCharacter();
    })

    clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Reset grid
        resetGrid();
    })
}

init();