const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMessageSpan = document.querySelector(".error-message-span");

let pokemon_name = "pikachu";
let baseURL = `https://pokeapi.co/api/v2/pokemon/`;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input.value === "") {
    pokemon_name = "pikachu";
  } else {
    pokemon_name = input.value;
  }

  fetchFunc();
});

const fetchFunc = async () => {
  try {
    const fetchURL = await fetch(`${baseURL}${pokemon_name}`);
    const characterData = await fetchURL.json();
    const statName = await characterData.stats.map((stat) => stat.stat.name);
    const baseStat = await characterData.stats.map((stat) => stat.base_stat);
    const abilities = await characterData.abilities.map((ability) =>
      ability.ability.name.replace(/,/g, ", ")
    );

    if (!fetchURL.ok) {
      return;
    } else {
      input.classList.remove("error-state");
      errorMessageSpan.classList.remove("error-message-span-effect");

      const characterOutput = document.querySelector("#character-output");

      characterOutput.innerHTML = `
        <div class="character-sprite-wrapper">
          <img class="character-sprite" src=${characterData.sprites.front_shiny} />
        </div>
        <div class="character-info-wrapper">
          <span class="character-name">${characterData.name}</span>
  
           <div class="character-primary-abilities">
            <span class="stat-span hp">${statName[0]}: ${baseStat[0]}</span>
            <span class="stat-span base-experience-span">BASE EXPERIENCE: ${characterData.base_experience}</span>
          </div>
  
          <div class="attack-and-defense">
            <span class="stat-span attack">${statName[1]}: ${baseStat[1]}</span>
            <span class="stat-span defense">${statName[2]}: ${baseStat[2]}</span>
          </div>
  
          <div class="character-primary-info">
            <span class="stat-span special-attack">${statName[3]}: ${baseStat[3]}</span>
            <span class="stat-span special-defense">${statName[4]}: ${baseStat[4]}</span>
          </div>
          <div class="character-secondary-abilities">
            <span class="stat-span character-weight">WEIGHT: ${characterData.weight}</span>
            <span class="stat-span speed">${statName[5]}: ${baseStat[5]}</span>
            
          </div>
              <span class="stat-span abilities">ABILITIES: ${abilities}</span>
        </div>
        `;
    }
  } catch (err) {
    console.error("CHARACTER NOT FOUND");
    input.classList.add("error-state");
    errorMessageSpan.classList.add("error-message-span-effect");
  }
};

fetchFunc();

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
