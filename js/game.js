// ===========================
// Coin Clicker - game.js
// ===========================

let coins = 0;
let power = 1;
let cost = 50;

let rebirths = 0;
let rebirthCost = 1000;
let coinMultiplier = 1;

const coinsText = document.getElementById("coins");
const powerText = document.getElementById("power");
const costText = document.getElementById("cost");

const coinButton = document.getElementById("coinButton");
const upgradeButton = document.getElementById("upgrade");
const resetButton = document.getElementById("reset");

const rebirthButton = document.getElementById("rebirthButton");
const rebirthText = document.getElementById("rebirths");
const rebirthCostText = document.getElementById("rebirthCost");
const boostText = document.getElementById("boost");

const floating = document.getElementById("floating");

loadGame();

if(typeof loadPets==="function"){
    loadPets();
}

updateUI();

// ----------------------------
// Clicking
// ----------------------------

coinButton.onclick = function(){

    coins += Math.floor(power * coinMultiplier);

    createFloatingText("+" + Math.floor(power * coinMultiplier));

    updateUI();

    saveGame();

};

// ----------------------------
// Upgrade
// ----------------------------

upgradeButton.onclick = function(){

    if(coins < cost) return;

    coins -= cost;

    power++;

    cost = Math.ceil(cost * 1.5);

    updateUI();

    saveGame();

};

// ----------------------------
// Rebirth
// ----------------------------

rebirthButton.onclick = function(){

    if(coins < rebirthCost){

        alert("You need " + rebirthCost + " coins!");

        return;

    }

    const yes = confirm(
"WARNING!\n\nIf you rebirth your Coins, Click Power, Pets and Egg Progress will disappear!\n\nBut you'll permanently earn 1.1x MORE coins!\n\nContinue?"
);

    if(!yes) return;

    rebirths++;

    coinMultiplier *= 1.1;

    rebirthCost = Math.ceil(rebirthCost * 1.2);

    coins = 0;
    power = 1;
    cost = 50;

    if(typeof pets !== "undefined"){
        pets.length = 0;
        localStorage.setItem("pets","[]");

        if(typeof drawPets==="function"){
            drawPets();
        }
    }

    if(typeof eggCost !== "undefined"){
        eggCost = 100;

        const eggCostText=document.getElementById("eggCost");

        if(eggCostText){
            eggCostText.textContent=eggCost;
        }
    }

    updateUI();

    saveGame();

};

// ----------------------------
// Reset
// ----------------------------

resetButton.onclick = function(){

    if(!confirm("Delete ALL progress?")) return;

    localStorage.clear();

    location.reload();

};

// ----------------------------
// UI
// ----------------------------

function updateUI(){

    coinsText.textContent = Math.floor(coins) + " Coins";

    powerText.textContent = power;

    costText.textContent = cost;

    rebirthText.textContent = rebirths;

    rebirthCostText.textContent = Math.floor(rebirthCost);

    boostText.textContent = coinMultiplier.toFixed(2) + "x";

}

// ----------------------------
// Floating Text
// ----------------------------

function createFloatingText(text){

    const div=document.createElement("div");

    div.className="float";

    div.textContent=text;

    div.style.left="170px";

    div.style.top="170px";

    floating.appendChild(div);

    setTimeout(function(){

        div.remove();

    },800);

}

// ----------------------------
// Save
// ----------------------------

function saveGame(){

    localStorage.setItem("coins",coins);
    localStorage.setItem("power",power);
    localStorage.setItem("cost",cost);

    localStorage.setItem("rebirths",rebirths);
    localStorage.setItem("rebirthCost",rebirthCost);
    localStorage.setItem("coinMultiplier",coinMultiplier);

    if(typeof eggCost!=="undefined")
        localStorage.setItem("eggCost",eggCost);

    if(typeof pets!=="undefined")
        localStorage.setItem("pets",JSON.stringify(pets));

}

// ----------------------------
// Load
// ----------------------------

function loadGame(){

    coins = Number(localStorage.getItem("coins")) || 0;
    power = Number(localStorage.getItem("power")) || 1;
    cost = Number(localStorage.getItem("cost")) || 50;

    rebirths = Number(localStorage.getItem("rebirths")) || 0;
    rebirthCost = Number(localStorage.getItem("rebirthCost")) || 1000;
    coinMultiplier = Number(localStorage.getItem("coinMultiplier")) || 1;

}
// ----------------------------
// Number Formatter
// ----------------------------

function formatNumber(num){

    if(num >= 1e15) return (num/1e15).toFixed(1) + "Q";
    if(num >= 1e12) return (num/1e12).toFixed(1) + "T";
    if(num >= 1e9) return (num/1e9).toFixed(1) + "B";
    if(num >= 1e6) return (num/1e6).toFixed(1) + "M";
    if(num >= 1e3) return (num/1e3).toFixed(1) + "K";

    return Math.floor(num);

}

// ----------------------------
// Update UI
// ----------------------------

function updateUI(){

    coinsText.textContent = formatNumber(coins) + " Coins";

    powerText.textContent = formatNumber(power);

    costText.textContent = formatNumber(cost);

    rebirthText.textContent = rebirths;

    rebirthCostText.textContent = formatNumber(rebirthCost);

    boostText.textContent = coinMultiplier.toFixed(2) + "x";

    if(typeof eggCost !== "undefined"){

        const eggCostText = document.getElementById("eggCost");

        if(eggCostText){

            eggCostText.textContent = formatNumber(eggCost);

        }

    }

}

// ----------------------------
// Floating Text
// ----------------------------

function createFloatingText(text,x,y){

    const div = document.createElement("div");

    div.className = "float";

    div.textContent = text;

    const rect = floating.getBoundingClientRect();

    div.style.left = (x - rect.left) + "px";

    div.style.top = (y - rect.top) + "px";

    floating.appendChild(div);

    setTimeout(function(){

        div.remove();

    },800);

}

// ----------------------------
// Save
// ----------------------------

function saveGame(){

    localStorage.setItem("coins",coins);

    localStorage.setItem("power",power);

    localStorage.setItem("cost",cost);

    localStorage.setItem("rebirths",rebirths);

    localStorage.setItem("rebirthCost",rebirthCost);

    localStorage.setItem("coinMultiplier",coinMultiplier);

    if(typeof eggCost !== "undefined"){

        localStorage.setItem("eggCost",eggCost);

    }

    if(typeof pets !== "undefined"){

        localStorage.setItem(

            "pets",

            JSON.stringify(pets)

        );

    }

}

// ----------------------------
// Load
// ----------------------------

function loadGame(){

    coins = Number(localStorage.getItem("coins")) || 0;

    power = Number(localStorage.getItem("power")) || 1;

    cost = Number(localStorage.getItem("cost")) || 50;

    rebirths = Number(localStorage.getItem("rebirths")) || 0;

    rebirthCost = Number(localStorage.getItem("rebirthCost")) || 1000;

    coinMultiplier = Number(localStorage.getItem("coinMultiplier")) || 1;

}

// ----------------------------
// Auto Save
// ----------------------------

setInterval(function(){

    saveGame();

},5000);