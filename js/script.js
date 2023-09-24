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

function loadPokemons() {
  return fetch('https://pokeapi.co/api/v2/pokemon').then((response) => 
    response.json()
  );
}

function prevFunction() {
  offset = offset - limit;
  
  if (offset === 0) {
    prevBtn.disabled = true;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`).then((response) => response.json())
  .then((data) => {
    eraseContainer();
    const pokemons = data.results;

    pokemons.forEach((pokemon) => {
      const container = document.createElement('div');
      const pokemonName = document.createElement('li');
      pokemonName.innerText = pokemon.name;
      container.appendChild(pokemonName);
      pokemonsContainer.appendChild(container);
    });
  })  
}

function nextPokemons() {
  offset = offset + limit;

  if (offset!==0) {
    prevBtn.disabled = false;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`).then((response) => response.json())
  .then((data) => {
    eraseContainer();
    const pokemons = data.results;

    pokemons.forEach((pokemon) => {
      const container = document.createElement('div');
      const pokemonName = document.createElement('li');
      pokemonName.innerText = pokemon.name;
      container.appendChild(pokemonName);
      pokemonsContainer.appendChild(container);
    });
  })  
}


loadPokemons().then(data => {
  const pokemons = data.results;

  pokemons.forEach(pokemon => {

    const container = document.createElement('div');
  
    const pokemonName = document.createElement('li');
    pokemonName.innerText = pokemon.name;

    container.appendChild(pokemonName);
    pokemonsContainer.appendChild(container);
  })
})


