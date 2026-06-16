// ===========================
// Coin Clicker - game.js
// ===========================

let coins = 0;
let power = 1;
let cost = 50;

const coinsText = document.getElementById("coins");
const powerText = document.getElementById("power");
const costText = document.getElementById("cost");

const coinButton = document.getElementById("coinButton");
const upgradeButton = document.getElementById("upgrade");
const resetButton = document.getElementById("reset");

const floating = document.getElementById("floating");

// Load saved data
loadGame();
updateUI();

// ----------------------------
// Clicking
// ----------------------------

coinButton.onclick = function () {

    coins += power;

    createFloatingText("+" + power);

    updateUI();

    saveGame();

};

// ----------------------------
// Upgrade
// ----------------------------

upgradeButton.onclick = function () {

    if (coins < cost) return;

    coins -= cost;

    power++;

    cost = Math.ceil(cost * 1.5);

    updateUI();

    saveGame();

};

// ----------------------------
// Reset Progress
// ----------------------------

resetButton.onclick = function () {

    if (!confirm("Are you sure you want to reset ALL progress?"))
        return;

    localStorage.clear();

    location.reload();

};

// ----------------------------
// UI
// ----------------------------

function updateUI() {

    coinsText.textContent = coins + " Coins";
    powerText.textContent = power;
    costText.textContent = cost;

}

// ----------------------------
// Floating Text
// ----------------------------

function createFloatingText(text) {

    const div = document.createElement("div");

    div.className = "float";

    div.textContent = text;

    div.style.left = "170px";
    div.style.top = "170px";

    floating.appendChild(div);

    setTimeout(function () {

        div.remove();

    }, 800);

}

// ----------------------------
// Saving
// ----------------------------

function saveGame() {

    localStorage.setItem("coins", coins);
    localStorage.setItem("power", power);
    localStorage.setItem("cost", cost);

    if (typeof eggCost !== "undefined")
        localStorage.setItem("eggCost", eggCost);

    if (typeof pets !== "undefined")
        localStorage.setItem("pets", JSON.stringify(pets));

}

// ----------------------------
// Loading
// ----------------------------

function loadGame() {

    coins = Number(localStorage.getItem("coins")) || 0;
    power = Number(localStorage.getItem("power")) || 1;
    cost = Number(localStorage.getItem("cost")) || 50;

}