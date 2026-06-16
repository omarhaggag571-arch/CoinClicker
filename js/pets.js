// ===========================
// pets.js
// ===========================

let pets = [];

const petList = document.getElementById("petList");

const petTypes = [

    {
        name: "🐱 Cat",
        power: 1
    },

    {
        name: "🐶 Dog",
        power: 2
    },

    {
        name: "🦊 Fox",
        power: 4
    },

    {
        name: "🐼 Panda",
        power: 8
    },

    {
        name: "🐉 Dragon",
        power: 20
    }

];

// ----------------------------
// Random Pet
// ----------------------------

function randomPet() {

    const r = Math.random() * 100;

    if (r < 50) return { ...petTypes[0] };
    if (r < 80) return { ...petTypes[1] };
    if (r < 92) return { ...petTypes[2] };
    if (r < 98) return { ...petTypes[3] };

    return { ...petTypes[4] };

}

// ----------------------------
// Add Pet
// ----------------------------

function addPet() {

    const pet = randomPet();

    pets.push(pet);

    power += pet.power;

    drawPets();

    updateUI();

    createFloatingText(pet.name);

    saveGame();

}

// ----------------------------
// Draw Pets
// ----------------------------

function drawPets() {

    petList.innerHTML = "";

    if (pets.length === 0) {

        petList.innerHTML = "No Pets";

        return;

    }

    for (const pet of pets) {

        const div = document.createElement("div");

        div.innerHTML =
            pet.name +
            "<br><small>+" +
            pet.power +
            " Click Power</small>";

        petList.appendChild(div);

    }

}

// ----------------------------
// Load Pets
// ----------------------------

function loadPets() {

    const saved = localStorage.getItem("pets");

    if (!saved) {

        drawPets();

        return;

    }

    pets = JSON.parse(saved);

    // game.js already loaded your upgrade power.
    // Only add the pet bonuses.

    for (const pet of pets) {

        power += pet.power;

    }

    drawPets();

    updateUI();

}

// ----------------------------
// Start
// ----------------------------

loadPets();