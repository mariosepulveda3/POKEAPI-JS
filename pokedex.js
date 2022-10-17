
const iconosTipos = ["bug", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "grass", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"];
const pokedex$$ = document.querySelector('#pokedex');
const searchInput$$ = document.querySelector(".sectionSearch input");
const ALL_POKEMONS_INFO = []; // Cuando una variable se declara en scope global para ser usada por otros, se hace en mayúsculas.

// function getAllPokemons() {
//   return fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
//     .then((response) => response.json())
//     .then((response) => {
//       return response.results;
//     })
//     .catch((error) => console.log('No existe', error));
// }

function getAllPokemons() {
    return fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then((response) => response.json())
      .then((response) => {
        return response.results;
      })
      .catch((error) => console.log('No existe', error));
  }

function getOnePokemon(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('No existe', error));
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
    
      const li$$ = document.createElement('li');
      li$$.classList.add('card');
    
      const img$$ = document.createElement('img');
      img$$.src = poke.sprites.front_default;
      img$$.alt = poke.name;
    
      const divId$$ = document.createElement('div');
      divId$$.classList.add('id-card');
      divId$$.textContent = '#' + poke.id;

      const p$$ = document.createElement('p');
      p$$.classList.add('card-title');
      p$$.textContent = poke.name;
    
      const p1$$ = document.createElement('p');
      p1$$.classList.add('card-subtitle');
      p1$$.textContent = poke.types[0].type.name;
      
    //   const p2$$ = document.createElement('p');
    //   p2$$.classList.add('card-subtitle');
    //   p2$$.textContent = poke.types[1].type.name;

      li$$.appendChild(divId$$);
      li$$.appendChild(p$$);
      li$$.appendChild(img$$);
      li$$.appendChild(p1$$);
    //   li$$.appendChild(p2$$);
    
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

  const imprimirTipos = (pokemon, div) => {

    for (const tipo of pokemon.types) {       
        for (const tipoImagen of iconosTipos) {            
            if (tipoImagen === tipo.type.name) {               
                const imagenTipo = document.createElement("img");
                imagenTipo.classList.add("tipo");
                imagenTipo.setAttribute("src", "./imgs/icons/" + tipoImagen + ".svg");
                imagenTipo.classList.add(`${tipoImagen}`);
                div.appendChild(imagenTipo);
            }
        }
    }
}
  

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
  


// async function arrancar() {

//     addEventsListeners();
//   const allPokemons = await getAllPokemons();
//   for(const pokemon of allPokemons) { 
//     const pokemonInfo = await getOnePokemon(pokemon.url);
//     ALL_POKEMONS_INFO.push(pokemonInfo);
//   };

//   console.log('ALL_POKEMONS_INFO', ALL_POKEMONS_INFO);
//   renderPokemons(ALL_POKEMONS_INFO);
// };

// const search$$ = document.querySelector('#input');
// function finderPoke (pokemon) {
//     let searchPokemon$$ = []
//     for (const poke of pokemon) {
//         if(poke.name.includes(value)) {
//             searchPokemon$$.push(poke);
//         }
//     }
//     console.log(searchPokemon$$);
//     search$$.appendChild(searchPokemon$$);
//     renderPokemons(searchPokemon$$);
    
// }
// search$$.addEventListener('keypress', () => finderPoke(ALL_POKEMONS_INFO));

//? MODO DIOS = JUAN
// const search = (event) => {
//     const value = event.target.value;

//     const filtered = ALL_POKEMONS_INFO.filter(pokemon => pokemon.name.includes(value));
//     renderPokemons(filtered);
// }

// const addEventListener = () => {
//     let searchInput = document.querySelector('. search-container input');
//     searchInput.addEventListener ('input', search) ;
// }


window.onload = arrancar;

