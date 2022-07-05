//? GLOBAL
const input = document.querySelector("input");
const searchBtn = document.querySelector("#search-btn");
const errorMessageSpan = document.querySelector(".error-message-span");

let pokemon_name = "pikachu";
let baseURL = `https://pokeapi.co/api/v2/pokemon/`;

searchBtn.addEventListener("click", () => {
  input.value === ""
    ? (pokemon_name = "pikachu")
    : (pokemon_name = input.value.toLowerCase());

  fetchFunc(pokemon_name);
});

input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) searchBtn.click();
});

const fetchFunc = async (pokemon_name) => {
  try {
    const fetchURL = await fetch(`${baseURL}${pokemon_name}`);
    const characterData = await fetchURL.json();
    const statName = await characterData.stats.map((stat) => stat.stat.name);
    const baseStat = await characterData.stats.map((stat) => stat.base_stat);
    const abilities = await characterData.abilities.map(
      (ability) => ability.ability.name
    );

    if (!fetchURL.ok) return;

    //? REMOVE ERROR SPAN WHEN INVOKED
    input.classList.remove("error-state");
    errorMessageSpan.classList.remove("error-message-span-effect");
    //? REMOVE ERROR SPAN WHEN INVOKED --- END

    const characterOutput = document.querySelector("#character-output");

    characterOutput.innerHTML = `
        <div class="character-sprite-wrapper">
          <img class="character-sprite" src=${
            characterData.sprites.front_default
          } />
        </div>
        <div class="character-info-wrapper">
          <span class="character-name">${characterData.name}</span>
  
          <div class="character-info-inner-wrapper">
            <div class="character-primary-abilities">
              <span class="stat-span hp">${statName[0]}: ${baseStat[0]}</span>
              <span class="stat-span base-experience-span">BASE XP: ${
                characterData.base_experience
              }</span>
            </div>
  
            <div class="attack-and-defense">
              <span class="stat-span attack">${statName[1]}: ${
      baseStat[1]
    }</span>
              <span class="stat-span defense">${statName[2]}: ${
      baseStat[2]
    }</span>
            </div>
  
            <div class="character-primary-info">
              <span class="stat-span special-attack">SP ATTACK: ${
                baseStat[3]
              }</span>
              <span class="stat-span special-defense">SP DEFENSE: ${
                baseStat[4]
              }</span>
            </div>
            <div class="character-secondary-abilities">
              <span class="stat-span character-weight">WEIGHT: ${
                characterData.weight
              }</span>
              <span class="stat-span speed">${statName[5]}: ${
      baseStat[5]
    }</span>
            </div>
            <div class="abilities-wrapper">
              <span class="abilities">ABILITIES: </span>
              <span class="abilities-span">${abilities
                .toString()
                .replace(/,/g, ", ")}</span>
            </div>
          <div>
        </div>
        `;
  } catch (err) {
    //? ADDS ERROR SPAN
    errorMessageSpan.classList.add("error-message-span-effect");
    input.classList.add("error-state");
    console.error("CHARACTER NOT FOUND");
  }
};

fetchFunc(pokemon_name);

//? SERVICE WORKER REGISTRATION
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("sw.js")
    .then(() => {
      console.log("SW registered");
    })
    .catch((error) => {
      console.error("SW Registration failed!" - error);
    });
}
