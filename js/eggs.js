// ===========================
// eggs.js
// ===========================

let eggCost = Number(localStorage.getItem("eggCost")) || 100;

const eggCostText = document.getElementById("eggCost");
const eggButton = document.getElementById("eggButton");

updateEggUI();

eggButton.onclick = function () {

    if (coins < eggCost) return;

    coins -= eggCost;

    eggCost = Math.ceil(eggCost * 1.5);

    addPet();

    updateEggUI();

    updateUI();

    saveGame();

};

function updateEggUI() {

    eggCostText.textContent = eggCost;

}