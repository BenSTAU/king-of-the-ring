import createFlag from "./flag.js";
import { paysList } from "./pays.js";
import combat from "./combat.js";
createFlag();
const buttons = document.querySelectorAll(".flag");
const fighterOne = document.getElementById("fighterOne");
const fighterTwo = document.getElementById("fighterTwo");
const flagp1 = document.createElement("img");
const flagp2 = document.createElement("img");
const swapOne = document.getElementById("swapOne");
const swapTwo = document.getElementById("swapTwo");

let playerOne = null;
let playerTwo = null;

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const p = paysList.find((country) => country.codeAlpha3 === button.id);
    if (playerOne == null && playerTwo != p) {
      playerOne = p;
      button.style.borderColor = "red";
      button.style.borderWidth = "6px";
      fighterOne.innerText = p.nom;
      flagp1.src = p.drapeau_link;
      flagp1.style.maxHeight = "90%";
      flagp1.style.maxWidth = "90%";

      fighterOne.appendChild(flagp1);
    } else if (playerTwo == null && playerOne != p) {
      playerTwo = p;
      button.style.borderColor = "blue";
      button.style.borderWidth = "6px";
      fighterTwo.innerText = p.nom;
      flagp2.src = p.drapeau_link;
      flagp2.style.maxHeight = "90%";
      flagp2.style.maxWidth = "90%";
      fighterTwo.appendChild(flagp2);
    }
  });
});
swapOne.addEventListener("click", function () {
  const pl1 = document.getElementById(playerOne.codeAlpha3);
  pl1.style.borderColor = "grey";
  pl1.style.borderWidth = "2px";
  fighterOne.innerText = "";
  flagp1.src = "";
  playerOne = null;
});

swapTwo.addEventListener("click", function () {
  const pl2 = document.getElementById(playerTwo.codeAlpha3);
  pl2.style.borderColor = "grey";
  pl2.style.borderWidth = "2px";
  fighterTwo.innerText = "";
  flagp2.src = "";
  playerTwo = null;
});

const start = document.getElementById("start");
start.addEventListener("click", function () {
  combat(playerOne, playerTwo);
});
