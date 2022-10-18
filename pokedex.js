const pokedex$$ = document.querySelector("#pokedex");
const searchInput$$ = document.querySelector(".sectionSearch input");
const ALL_POKEMONS_INFO = []; // Cuando una variable se declara en scope global para ser usada por otros, se hace en mayúsculas.

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
  p$$.textContent = "No se encuentran resultados";

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

// const hoverCard = (poke) => {

// }

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

const navbar$$ = document.querySelector("header");

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
      let newWindow$$ = open(imgPoke$$, title = 'Pokemon', 'width=200, height=200');
    });

const randomPokemon$$ = document.createElement("a");

header$$.appendChild(randomPokemon$$);
header$$.appendChild(ask$$);
header$$.appendChild(pokeball$$);
navbar$$.appendChild(header$$);

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
