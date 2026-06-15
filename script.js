let coins = 0;

const coinCounter = document.getElementById("coinCounter");
const clickButton = document.getElementById("clickButton");

clickButton.addEventListener("click", function(){

    coins++;

    coinCounter.textContent = coins + " Coins";

});