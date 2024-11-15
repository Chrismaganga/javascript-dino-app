// Fetch dinosaur data from JSON
document.getElementById('btn').addEventListener('click', generateInfographic);

async function generateInfographic() {
    // Hide the form after submission
    document.getElementById('dino-compare').style.display = 'none';

    // Fetch dino data
    const dinoData = await fetchDinoData();

    // Get human data from the form
    const humanData = getHumanData();

    // Generate and display tiles
    const tiles = createTiles(dinoData, humanData);
    displayTiles(tiles);

    // Save the generated infographic to local storage
    localStorage.setItem('dinoGrid', document.getElementById('grid').innerHTML);
}

async function fetchDinoData() {
    const response = await fetch('./dino.json');
    const data = await response.json();
    return data.Dinos;
}

function getHumanData() {
    return {
        name: document.getElementById('name').value,
        height: parseFloat(document.getElementById('feet').value) * 12 + parseFloat(document.getElementById('inches').value),
        weight: parseFloat(document.getElementById('weight').value),
        diet: document.getElementById('diet').value.toLowerCase()
    };
}

function createTiles(dinoData, humanData) {
    const tiles = dinoData.map((dino) => {
        return createDinoTile(dino, humanData);
    });

    // Insert human tile in the center (4th index) of the 3x3 grid
    tiles.splice(4, 0, createHumanTile(humanData));

    return tiles;
}

function createDinoTile(dino, humanData) {
    const facts = generateFacts(dino, humanData);
    const fact = facts[Math.floor(Math.random() * facts.length)];

    return `
        <div class="tile">
            <h3>${dino.species}</h3>
            <img src="images/${dino.species.toLowerCase()}.png" alt="${dino.species}">
            <p>${fact}</p>
        </div>
    `;
}

function createHumanTile(humanData) {
    return `
        <div class="tile">
            <h3>${humanData.name}</h3>
            <img src="images/human.png" alt="Human">
            <p>You are ${humanData.height} inches tall, weigh ${humanData.weight} lbs, and have a ${humanData.diet} diet.</p>
        </div>
    `;
}

function generateFacts(dino, human) {
    return [
        `The ${dino.species} was ${dino.weight} lbs, compared to you at ${human.weight} lbs.`,
        `The ${dino.species} was ${dino.height} inches tall, compared to you at ${human.height} inches.`,
        `The ${dino.species} was a ${dino.diet}, while you are a ${human.diet}.`,
        `The ${dino.species} lived during the ${dino.when}.`,
        `The ${dino.species} was found in ${dino.where}.`,
        "All birds are considered dinosaurs."
    ];
}

function displayTiles(tiles) {
    const grid = document.getElementById('grid');
    grid.innerHTML = tiles.join('');
}

// Ensure fresh data is generated on browser refresh
window.addEventListener('DOMContentLoaded', () => {
    // Clear local storage on every page load to ensure fresh data
    localStorage.removeItem('dinoGrid');
});
// Fetch dinosaur data from JSON
document.getElementById('btn').addEventListener('click', generateInfographic);

async function generateInfographic() {
    // Hide the form after submission
    document.getElementById('dino-compare').style.display = 'none';

    // Fetch dino data
    const dinoData = await fetchDinoData();

    // Get human data from the form
    const humanData = getHumanData();

    // Generate and display tiles
    const tiles = createTiles(dinoData, humanData);
    displayTiles(tiles);

    // Save the generated infographic to local storage
    localStorage.setItem('dinoGrid', document.getElementById('grid').innerHTML);
}

async function fetchDinoData() {
    const response = await fetch('./dino.json');
    const data = await response.json();
    return data.Dinos;
}

function getHumanData() {
    return {
        name: document.getElementById('name').value,
        height: parseFloat(document.getElementById('feet').value) * 12 + parseFloat(document.getElementById('inches').value),
        weight: parseFloat(document.getElementById('weight').value),
        diet: document.getElementById('diet').value.toLowerCase()
    };
}

function createTiles(dinoData, humanData) {
    const tiles = dinoData.map((dino) => {
        return createDinoTile(dino, humanData);
    });

    // Insert human tile in the center (4th index) of the 3x3 grid
    tiles.splice(4, 0, createHumanTile(humanData));

    return tiles;
}

function createDinoTile(dino, humanData) {
    const facts = generateFacts(dino, humanData);
    const fact = facts[Math.floor(Math.random() * facts.length)];

    return `
        <div class="tile">
            <h3>${dino.species}</h3>
            <img src="images/${dino.species.toLowerCase()}.png" alt="${dino.species}">
            <p>${fact}</p>
        </div>
    `;
}

function createHumanTile(humanData) {
    return `
        <div class="tile">
            <h3>${humanData.name}</h3>
            <img src="images/human.png" alt="Human">
            <p>You are ${humanData.height} inches tall, weigh ${humanData.weight} lbs, and have a ${humanData.diet} diet.</p>
        </div>
    `;
}

function generateFacts(dino, human) {
    return [
        `The ${dino.species} was ${dino.weight} lbs, compared to you at ${human.weight} lbs.`,
        `The ${dino.species} was ${dino.height} inches tall, compared to you at ${human.height} inches.`,
        `The ${dino.species} was a ${dino.diet}, while you are a ${human.diet}.`,
        `The ${dino.species} lived during the ${dino.when}.`,
        `The ${dino.species} was found in ${dino.where}.`,
        "All birds are considered dinosaurs."
    ];
}

function displayTiles(tiles) {
    const grid = document.getElementById('grid');
    grid.innerHTML = tiles.join('');
}

// Ensure fresh data is generated on browser refresh
window.addEventListener('DOMContentLoaded', () => {
    // Clear local storage on every page load to ensure fresh data
    localStorage.removeItem('dinoGrid');
});
