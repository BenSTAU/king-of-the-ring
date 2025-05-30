import { paysList } from "./pays.js";
const select = document.getElementById("select");
console.log(paysList);
export default function createFlag() {
  paysList.forEach((p) => {
    const button = document.createElement("button");
    const flag = document.createElement("img");
    flag.src = p.drapeau_link;
    button.id = `${p.codeAlpha3}`;
    flag.style.height = "90%";
    flag.style.width = "90%";
    button.appendChild(flag);
    select.appendChild(button);
    button.classList.add("flag");
    flag.style.border = "black";
  });
}
const filter = document.getElementById("filter");
filter.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  paysList.forEach((p) => {
    const flag = document.getElementById(p.codeAlpha3);
    if (
      p.nom.toLowerCase().includes(value) ||
      p.codeAlpha3.toLowerCase().includes(value)
    ) {
      flag.style.display = "block";
    } else {
      flag.style.display = "none";
    }
  });
});
