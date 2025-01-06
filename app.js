const form = document.getElementById('dino-compare');
const compareButton = document.getElementById('btn');
const grid = document.getElementById('grid');

class InfographicGenerator {
    constructor(form, grid) {
        this.form = form;
        this.grid = grid;
    }

    async generateInfographic() {
        // Hide the form after submission
        this.form.style.display = 'none';

        try {
            // Fetch dino data
            const dinoData = await this.fetchDinoData();

            // Get human data from the form
            const humanData = this.getHumanData();

            // Generate and display tiles
            const tiles = this.createTiles(dinoData, humanData);
            this.displayTiles(tiles);

            // Save the generated infographic to local storage
            localStorage.setItem('dinoGrid', this.grid.innerHTML);
        } catch (error) {
            this.form.style.display = 'block';
            throw error;
        }
    }

    async fetchDinoData() {
        try {
            const response = await fetch('./dino.json');
            if (!response.ok) {
                throw new Error('Failed to fetch dinosaur data');
            }
            const data = await response.json();
            return data.Dinos;
        } catch (error) {
            throw new Error('Failed to load dinosaur data. Please check your connection and try again.');
        }
    }

    getHumanData() {
        return {
            name: document.getElementById('name').value.trim(),
            height: parseFloat(document.getElementById('feet').value) * 12 + parseFloat(document.getElementById('inches').value),
            weight: parseFloat(document.getElementById('weight').value),
            diet: document.getElementById('diet').value.toLowerCase()
        };
    }

    createTiles(dinoData, humanData) {
        const tiles = dinoData.map((dino) => {
            return this.createDinoTile(dino, humanData);
        });

        // Insert human tile in the center (4th index) of the 3x3 grid
        tiles.splice(4, 0, this.createHumanTile(humanData));

        return tiles;
    }

    createDinoTile(dino, humanData) {
        const facts = this.generateFacts(dino, humanData);
        const fact = facts[Math.floor(Math.random() * facts.length)];

        return `
            <div class="tile">
                <h3>${dino.species}</h3>
                <img src="images/${dino.species.toLowerCase()}.png" alt="${dino.species}">
                <p>${fact}</p>
            </div>
        `;
    }

    createHumanTile(humanData) {
        return `
            <div class="tile">
                <h3>${humanData.name}</h3>
                <img src="images/human.png" alt="Human">
                <p>You are ${humanData.height} inches tall, weigh ${humanData.weight} lbs, and have a ${humanData.diet} diet.</p>
            </div>
        `;
    }

    generateFacts(dino, human) {
        return [
            `The ${dino.species} was ${dino.weight} lbs, compared to you at ${human.weight} lbs.`,
            `The ${dino.species} was ${dino.height} inches tall, compared to you at ${human.height} inches.`,
            `The ${dino.species} was a ${dino.diet}, while you are a ${human.diet}.`,
            `The ${dino.species} lived during the ${dino.when}.`,
            `The ${dino.species} was found in ${dino.where}.`,
            "All birds are considered dinosaurs."
        ];
    }

    displayTiles(tiles) {
        this.grid.innerHTML = tiles.join('');
    }
}

// Instantiate the class
const infographicGenerator = new InfographicGenerator(form, grid);

// Add loading state and error handling to button
compareButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
        compareButton.disabled = true;
        compareButton.value = 'Loading...';
        await infographicGenerator.generateInfographic();
    } catch (error) {
        showError('An error occurred while generating the infographic. Please try again.');
        console.error('Error:', error);
    } finally {
        compareButton.disabled = false;
        compareButton.value = 'Compare Me!';
    }
});

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const feet = document.getElementById('feet').value;
    const inches = document.getElementById('inches').value;
    const weight = document.getElementById('weight').value;

    if (!name) {
        showError('Please enter your name');
        return false;
    }
    if (!feet || feet < 0) {
        showError('Please enter a valid height in feet');
        return false;
    }
    if (!inches || inches < 0 || inches > 11) {
        showError('Please enter a valid height in inches (0-11)');
        return false;
    }
    if (!weight || weight <= 0) {
        showError('Please enter a valid weight');
        return false;
    }
    return true;
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;

    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();

    // Insert error before the form
    form.insertBefore(errorDiv, form.firstChild);

    // Remove error after 3 seconds
    setTimeout(() => errorDiv.remove(), 3000);
}

// Ensure fresh data is generated on browser refresh
window.addEventListener('DOMContentLoaded', () => {
    // Clear local storage on every page load to ensure fresh data
    localStorage.removeItem('dinoGrid');

    // Add input validation listeners
    document.getElementById('feet').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    document.getElementById('inches').addEventListener('input', (e) => {
        let value = parseInt(e.target.value);
        if (value > 11) e.target.value = 11;
        if (value < 0) e.target.value = 0;
    });

    document.getElementById('weight').addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
});
