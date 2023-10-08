const pokemonsContainer = document.getElementById('container');
const prevBtn = document.getElementById('previousBtn');
const nextBtn = document.getElementById('nextBtn');

let offset = 0;
const limit = 20;

prevBtn.addEventListener('click', prevFunction);
nextBtn.addEventListener('click', nextPokemons);

function eraseContainer() {
  pokemonsContainer.innerHTML = "";
}

function loadPokemons(offset, limit) {
  return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`).then((response) => 
    response.json()
  );
}

function renderList (pokemons) {
  const container = document.createElement('ul');
   
    pokemons.forEach((pokemon) => {
      const pokemonList = document.createElement("li")
      const pokemonHero = document.createElement('a');

      const pokemonDetailsUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`;
      
      fetch(pokemonDetailsUrl).then((response) => response.json())
      .then((data) => {
        pokemonHero.href = `https://pokeapi.co/api/v2/pokemon/${data.weight}`;
        pokemonHero.textContent = `${pokemon.name}`;
        pokemonList.appendChild(pokemonHero)
        container.appendChild(pokemonList); 
      });
    
    });
  pokemonsContainer.appendChild(container);
}

function setButtonsEnabled(hasNext, hasPrev) {
  nextBtn.disabled = !hasNext
  prevBtn.disabled = !hasPrev
}

function loadPokemonsAndRenderList(offset, limit) {
  loadPokemons(offset, limit)
  .then((data) => {
    eraseContainer();
    setButtonsEnabled(data.next, data.previous)
    renderList(data.results)
  })  
}

function prevFunction() {
  offset -= limit;

  loadPokemonsAndRenderList(offset, limit)
}

function nextPokemons() {
  offset += limit;

  loadPokemonsAndRenderList(offset, limit)
}

window.onload = function () {
  loadPokemonsAndRenderList(offset, limit)
}


