const pokedex$$ = document.querySelector('#pokedex');
let string= ''
const ALL_POKEMONS_INFO = []; // Cuando una variable se declara en scope global para ser usada por otros, se hace en mayúsculas.

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

fetch("https://pokeapi.co/api/v2/pokemon/?limit=151").then((res) => res.json())
.then((resultsPoke) => {

    const namesPokemons = resultsPoke.results
    const button$$ = document.querySelector(".button");

    button$$.addEventListener("click", search(namesPokemons));

    const filter$$ = document.querySelector(".filtroTipos");
    const images$$ = document.querySelectorAll("img");

    for (const imagenTipo of images$$) {

        let tipo = imagenTipo.className;
        imagenTipo.addEventListener("click", () => filter$$(tipo, pokemons));
    }
});

let firstInput;
const search = (pokemons) => {
    const input$$ = document.querySelector("input");
    const pokeRemove$$ = document.querySelectorAll(".card");

    for (let i = 0; i < pokeRemove$$.length; i++) {
        const compareName$$ = pokeRemove$$[i].querySelector("h1");
        if (input$$.value.toLowerCase() != compareName$$.textContent) { 
            pokeRemove$$[i].remove();
        } else if (inputAnterior != input$$.value.toLowerCase()){
            divEliminable$$[i].style = ("background-color: gold; width: 200px; height: 300px; margin-bottom: 70px");
        }  
    }
    firstInput = input$$.value.toLowerCase();
    namesPokemons(pokemons, firstInput);
};

function renderPokemons(pokemons) {
    pokemons.forEach(function(poke) {
      const li$$ = document.createElement('li');
      li$$.classList.add('card');
    
      const img$$ = document.createElement('img');
      img$$.src = poke.sprites.front_default;
      img$$.alt = poke.name;
    
      const p$$ = document.createElement('p');
      p$$.classList.add('card-title');
      p$$.textContent = poke.name;
    
      const div$$ = document.createElement('div');
      div$$.classList.add('card-subtitle');
      div$$.textContent = poke.types[0].type.name;

      li$$.appendChild(p$$);
      li$$.appendChild(img$$);
      li$$.appendChild(div$$);
    
      pokedex$$.appendChild(li$$);
    });

}

async function arrancar() {

  const allPokemons = await getAllPokemons();
  for(const pokemon of allPokemons) { 
    const pokemonInfo = await getOnePokemon(pokemon.url);
    ALL_POKEMONS_INFO.push(pokemonInfo);
  };

  console.log('ALL_POKEMONS_INFO', ALL_POKEMONS_INFO);
  renderPokemons(ALL_POKEMONS_INFO);
};

window.onload = arrancar;

