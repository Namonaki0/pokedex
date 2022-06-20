const form = document.querySelector("form");
const input = document.querySelector("form input");

let pokemon_name = "pikachu";
let baseURL = `https://pokeapi.co/api/v2/pokemon/${pokemon_name}/`;

input.addEventListener("change", (e) => {
  if (e.target.value === "") {
    pokemon_name = "pikachu";
  } else {
    pokemon_name = e.target.value;
  }
  baseURL = `https://pokeapi.co/api/v2/pokemon/${pokemon_name}/`;

  fetchFunc(baseURL);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const fetchFunc = async () => {
  const fetchURL = await fetch(baseURL);
  const characterData = await fetchURL.json();
  const statName = await characterData.stats.map((stat) => stat.stat.name);
  const baseStat = await characterData.stats.map((stat) => stat.base_stat);
  const abilities = await characterData.abilities.map((ability) =>
    ability.ability.name.replace(/,/g, ", ")
  );

  const characterOutput = await document.querySelector("#character-output");

  characterOutput.innerHTML = `
      <div class="character-sprite-wrapper">
        <img class="character-sprite" src=${characterData.sprites.front_shiny} />
      </div>
      <div class="character-info-wrapper">
        <span class="character-name">${characterData.name}</span>
         <div class="character-primary-abilities">
          <span class="stat-span hp">${statName[0]}: ${baseStat[0]}</span>
          <span class="stat-span attack">${statName[1]}: ${baseStat[1]}</span>
          <span class="stat-span defense">${statName[2]}: ${baseStat[2]}</span>
        </div>
        <div class="character-primary-info">
          <span class="character-weight">WEIGHT: ${characterData.weight}</span>
          <span class="base-experience-span">BASE EXPERIENCE: ${characterData.base_experience}</span>
        </div>
        <div class="character-secondary-abilities">
          <span class="stat-span special-attack">${statName[3]}: ${baseStat[3]}</span>
          <span class="stat-span special-defense">${statName[4]}: ${baseStat[4]}</span>
          <span class="stat-span speed">${statName[5]}: ${baseStat[5]}</span>
          <span class="stat-span abilities">ABILITIES: ${abilities}</span>
        </div>
      </div>
      `;
};

fetchFunc();
// function generate() {

//   console.log(newURL);
//   for (i = 1; i <= url.length; i++) {
//     const div = document.createElement("div");

//     if (i === null) {
//       div.style.visibility = "hidden";
//       div.style.position = "absolute";
//     } else if (i < 10) {
//       div.innerHTML = `<span class="span-style">0${i}</span>`;
//       const img = document.createElement("img");
//       img.src = `${url}${i}.png`;
//       div.appendChild(img);
//       body.appendChild(div);
//     } else {
//       div.innerHTML = `<span class="span-style">${i}</span>`;
//       const img = document.createElement("img");
//       img.src = `${url}${i}.png`;
//       div.appendChild(img);
//       body.appendChild(div);
//     }
//   }
// }

// generate();

//? SERVICE WORKER REGISTRATION
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(() => {
      console.log("SW registered");
    })
    .catch((error) => {
      console.error("SW Registration failed!");
      console.error(error);
    });
}
