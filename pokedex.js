const pokedex$$ = document.querySelector("#pokedex");
const searchInput$$ = document.querySelector(".sectionSearch input");
const ALL_POKEMONS_INFO = [];

const arrancar = async () => {
  addEventsListeners();
  const allPokemons = await getAllPokemons();

  for (const pokemon of allPokemons) {
    const pokemonIndividualInfo = await getOnePokemon(pokemon.url);
    ALL_POKEMONS_INFO.push(pokemonIndividualInfo);
  }
  console.log("ALL_POKEMONS_INFO", ALL_POKEMONS_INFO);
  renderPokemons(ALL_POKEMONS_INFO);
};

window.onload = arrancar;

function getAllPokemons() {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((response) => response.json())
    .then((response) => {
      return response.results;
    })
    .catch((error) => console.log("No existe", error));
}

function getOnePokemon(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("No existe", error));
}

const cleanPokedex = () => (pokedex$$.innerHTML = "");

const renderNoResults = () => {
  const li$$ = document.createElement("li");

  const p$$ = document.createElement("p");
  p$$.classList.add("card-title");
  p$$.textContent = "No existe";

  li$$.appendChild(p$$);
  pokedex$$.appendChild(li$$);
};

const renderPokemonsCard = (poke) => {
  const li$$ = document.createElement("li");
  li$$.classList.add("card");

  const img$$ = document.createElement("img");
  img$$.src = poke.sprites.front_default;
  img$$.alt = poke.name;

  const divId$$ = document.createElement("div");
  divId$$.classList.add("id-card");
  divId$$.textContent = "#" + poke.id;

  const p$$ = document.createElement("p");
  p$$.classList.add("card-title");
  p$$.textContent = poke.name;

  const p1$$ = document.createElement("p");
  p1$$.classList.add("card-subtitle");
  p1$$.textContent = poke.types[0].type.name;

  li$$.appendChild(divId$$);
  li$$.appendChild(p$$);
  li$$.appendChild(img$$);
  li$$.appendChild(p1$$);

  pokedex$$.appendChild(li$$);
};

const renderPokemons = (pokemons) => {
  cleanPokedex();
  if (!pokemons.length) renderNoResults();
  pokemons.forEach((pokemon) => renderPokemonsCard(pokemon));
};

const search = (value) => {
  const filtered = ALL_POKEMONS_INFO.filter((pokemon) => {
    const matchName = pokemon.name.includes(value);
    const matchId = pokemon.id == value;
    const matchType = pokemon.types.includes(value);

    return matchName || matchId || matchType;
  });
  renderPokemons(filtered);
};

const addEventsListeners = () => {
  searchInput$$.addEventListener("input", (event) => {
    search(event.target.value);
  });
};

const navbar$$ = document.querySelector("h1");

const header$$ = document.createElement("div");
header$$.classList.add("header");

const ask$$ = document.createElement("h2");
ask$$.textContent = "¿Que pokemon eres hoy?";
ask$$.classList.add("askDay");

const pokeball$$ = document.createElement("img");
pokeball$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/770px-Pok%C3%A9_Ball_icon.svg.png"
);
pokeball$$.classList.add("pokeball");

pokeball$$.addEventListener("click", function (event) {
  let randomPokemon = Math.floor(Math.random() * 151) + 1;
  let imgPoke$$ = ALL_POKEMONS_INFO[randomPokemon].sprites.front_default;
  let newWindow$$ = open(
    imgPoke$$,
    (title = "Pokemon"),
    "width=200, height=200"
  );
});

const randomPokemon$$ = document.createElement("a");

header$$.appendChild(randomPokemon$$);
header$$.appendChild(ask$$);
header$$.appendChild(pokeball$$);
navbar$$.appendChild(header$$);

const imgTypes$$ = document.querySelector(".icons");
const bicho$$ = document.createElement("img");
bicho$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Pok%C3%A9mon_Bug_Type_Icon.svg/512px-Pok%C3%A9mon_Bug_Type_Icon.svg.png?20200511091608"
);
const dragon$$ = document.createElement("img");
dragon$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pok%C3%A9mon_Dragon_Type_Icon.svg/640px-Pok%C3%A9mon_Dragon_Type_Icon.svg.png"
);
const electrico$$ = document.createElement("img");
electrico$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg/640px-Pok%C3%A9mon_Electric_Type_Icon.svg.png"
);
const hada$$ = document.createElement("img");
hada$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg/640px-Pok%C3%A9mon_Fairy_Type_Icon.svg.png"
);
const lucha$$ = document.createElement("img");
lucha$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg/640px-Pok%C3%A9mon_Fighting_Type_Icon.svg.png"
);
const fuego$$ = document.createElement("img");
fuego$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Pok%C3%A9mon_Fire_Type_Icon.svg/640px-Pok%C3%A9mon_Fire_Type_Icon.svg.png"
);
const volador$$ = document.createElement("img");
volador$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Pok%C3%A9mon_Flying_Type_Icon.svg/640px-Pok%C3%A9mon_Flying_Type_Icon.svg.png"
);
const fantasma$$ = document.createElement("img");
fantasma$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Pok%C3%A9mon_Ghost_Type_Icon.svg/640px-Pok%C3%A9mon_Ghost_Type_Icon.svg.png"
);
const hierba$$ = document.createElement("img");
hierba$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Pok%C3%A9mon_Grass_Type_Icon.svg/640px-Pok%C3%A9mon_Grass_Type_Icon.svg.png"
);
const tierra$$ = document.createElement("img");
tierra$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg/640px-Pok%C3%A9mon_Ground_Type_Icon.svg.png"
);
const hielo$$ = document.createElement("img");
hielo$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg/640px-Pok%C3%A9mon_Ice_Type_Icon.svg.png"
);
const normal$$ = document.createElement("img");
normal$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg/640px-Pok%C3%A9mon_Normal_Type_Icon.svg.png"
);
const veneno$$ = document.createElement("img");
veneno$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg/640px-Pok%C3%A9mon_Poison_Type_Icon.svg.png"
);
const psiquico$$ = document.createElement("img");
psiquico$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg/640px-Pok%C3%A9mon_Psychic_Type_Icon.svg.png"
);
const roca$$ = document.createElement("img");
roca$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg/640px-Pok%C3%A9mon_Rock_Type_Icon.svg.png"
);
const acero$$ = document.createElement("img");
acero$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg/640px-Pok%C3%A9mon_Steel_Type_Icon.svg.png"
);
const agua$$ = document.createElement("img");
agua$$.setAttribute(
  "src",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg/640px-Pok%C3%A9mon_Water_Type_Icon.svg.png"
);

imgTypes$$.appendChild(bicho$$);
imgTypes$$.appendChild(dragon$$);
imgTypes$$.appendChild(electrico$$);
imgTypes$$.appendChild(hada$$);
imgTypes$$.appendChild(lucha$$);
imgTypes$$.appendChild(fuego$$);
imgTypes$$.appendChild(volador$$);
imgTypes$$.appendChild(fantasma$$);
imgTypes$$.appendChild(hierba$$);
imgTypes$$.appendChild(tierra$$);
imgTypes$$.appendChild(hielo$$);
imgTypes$$.appendChild(normal$$);
imgTypes$$.appendChild(veneno$$);
imgTypes$$.appendChild(psiquico$$);
imgTypes$$.appendChild(roca$$);
imgTypes$$.appendChild(acero$$);
imgTypes$$.appendChild(agua$$);

const footer$$ = document.querySelector("footer");
const snorlax$$ = document.createElement("img");
snorlax$$.setAttribute(
  "src",
  "https://cdn-icons-png.flaticon.com/512/189/189001.png"
);
snorlax$$.classList.add(".footer");
footer$$.appendChild(snorlax$$);
