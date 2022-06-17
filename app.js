const body = document.querySelector("body");
const characterModal = document.querySelector(".character-modal");
// const url = `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/`;

const newURL = `https://pokeapi.co/api/v2/pokemon/snorlax/`;

const fetchFunc = async () => {
  const fetchURL = await fetch(newURL);
  const characterData = await fetchURL.json();
  const statName = await characterData.stats.map((stat) => stat.stat.name);
  const baseStat = await characterData.stats.map((stat) => stat.base_stat);
  const abilities = await characterData.abilities.map(
    (ability) => ability.ability.name
  );

  console.log(characterData);

  characterModal.innerHTML = `
  <img src=${characterData.sprites.front_default} />
  <div class="character-name">NAME: ${characterData.name}</div>
  <span class="weight-span">WEIGHT: ${characterData.weight}</span>
  <div class="stats-wrapper">
    <div class="stat-span speed">${statName[0]} - ${baseStat[0]}</div>
    <div class="stat-span special-defense">${statName[1]} - ${baseStat[1]}</div>
    <div class="stat-span special-attack">${statName[2]} - ${baseStat[2]}</div>
    <div class="stat-span defense">${statName[3]} - ${baseStat[3]}</div>
    <div class="stat-span attack">${statName[4]} - ${baseStat[4]}</div>
    <div class="stat-span hp">${statName[5]} - ${baseStat[5]}</div>
  </div>
  <div class="abilities-wrapper">
    <div class="ability-span speed">ABILITIES: ${abilities}</div>
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
