const statConfig = {
  densite_population: { mode: "max", weight: 5 },
  esperance_de_vie: { mode: "max", weight: 15 },
  chomage: { mode: "min", weight: 20 },
  dette_publique: { mode: "min", weight: 20 },
  taux_alphabetisation: { mode: "max", weight: 15 },
  esperance_de_vie_naissance: { mode: "max", weight: 15 },
  inflation: { mode: "min", weight: 25 },
  mortalite_infantile: { mode: "min", weight: 20 },
  medecin_pour_1000_habitants: { mode: "max", weight: 10 },
  consomation_energie_par_habitants: { mode: "min", weight: 10 },
};
const selection = document.getElementById("selection");
const battle = document.getElementById("battle");
const drapeau1 = document.getElementById("drapeau1");
const drapeau2 = document.getElementById("drapeau2");
const result = document.getElementById("result");
const resultPlayerOne = document.getElementById("resultPlayerOne");
const resultPlayerTwo = document.getElementById("resultPlayerTwo");
const winner = document.getElementById("winner");
export default async function combat(country1, country2) {
  if (country1 == null || country2 == null) {
    return;
  }
  await country1.start_game();
  await country2.start_game();
  console.log(country1);
  console.log(country2);

  selection.style.display = "none";
  battle.style.display = "flex";
  drapeau1.src = country1.drapeau_link;
  drapeau2.src = country2.drapeau_link;

  const statUsed = [];
  while (country1.health > 0 && country2.health > 0 && statUsed.length < 10) {
    let stat;
    do {
      stat = pickRandomStat(statConfig);
    } while (statUsed.includes(stat));

    const value1 = country1[stat];
    const value2 = country2[stat];
    if (statConfig[stat].mode === "max") {
      if (value1 > value2) {
        country2.health -= statConfig[stat].weight;
        addResult(stat, resultPlayerOne, resultPlayerTwo);
        updateBar("p2", statConfig[stat].weight);
      } else if (value1 < value2) {
        country1.health -= statConfig[stat].weight;
        addResult(stat, resultPlayerTwo, resultPlayerOne);
        updateBar("p1", statConfig[stat].weight);
      }
    } else if (statConfig[stat].mode === "min") {
      if (value1 < value2) {
        country2.health -= statConfig[stat].weight;
        addResult(stat, resultPlayerOne, resultPlayerTwo);
        updateBar("p2", statConfig[stat].weight);
      } else if (value1 > value2) {
        country1.health -= statConfig[stat].weight;
        addResult(stat, resultPlayerTwo, resultPlayerOne);
        updateBar("p1", statConfig[stat].weight);
      }
    } else {
      if (value1 === value2) {
        console.log("nul");
      }
    }

    console.log(
      country1.health,
      country2.health,
      stat,
      country1[stat],
      country2[stat],
      statConfig[stat].mode,
      statConfig[stat].weight
    );
    statUsed.push(stat);

    await sleep(1000);
  }
  if (country1.health > country2.health || country2.health > country1.health) {
    const img = document.createElement("img");
    img.src = country1.health > country2.health ? drapeau1.src : drapeau2.src;
    img.style.width = "90px";
    img.style.height = "60px";
    img.style.objectFit = "cover"; // Pour bien remplir la div

    winner.appendChild(img);
    winner.style.display = "flex";
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function updateBar(player, healthLost) {
  const bar = document.getElementById(`barredevie${player}`);
  let currentWidth = parseFloat(bar.style.width) || 600;
  let newHealth = currentWidth - healthLost * 6;
  if (newHealth < 0) {
    newHealth = 0;
  }
  bar.style.width = `${newHealth}px`;
}

function pickRandomStat(statConfig) {
  const keys = Object.keys(statConfig);
  return keys[Math.floor(Math.random() * keys.length)];
}

function addResult(stat, playerWin, playerLose) {
  const resultStatWin = document.createElement("p");
  const resultStatLose = document.createElement("p");
  resultStatWin.textContent = stat;
  resultStatLose.textContent = stat;
  resultStatWin.style.color = "green";
  resultStatLose.style.color = "red";
  playerWin.appendChild(resultStatWin);
  playerLose.appendChild(resultStatLose);
}
