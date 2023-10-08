const container = document.getElementById("container");

// получить имя покемона из url
const splittedHref = location.href.split("/");
const name = splittedHref[splittedHref.length - 1];

console.log("pokemon is", name);

// сделать запрос на https://pokeapi.co/api/v2/pokemon/${pokemon.name} с именем текущего покемона
const fetchDetails = () => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(res =>
        res.json()
    );
};

fetchDetails().then(details => {
    // отобразить это на странице
    const h1 = document.createElement("h1");
    h1.innerText = details.name;
    container.appendChild(h1);

    const height = document.createElement("p");
    height.innerText = details.height;
    container.appendChild(height);

    const weight = document.createElement("p");
    weight.innerText = details.weight;
    container.appendChild(weight);

    const image = document.createElement("img");
    image.src = details.sprites.front_default;
    container.appendChild(image);
});
