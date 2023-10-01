const btn = document.getElementById("localPokemonsBtn");
const form = document.getElementById("form");

btn.addEventListener("click", () => {
    // request pokemons from our backend

    fetch("/api/pokemons");
});

form.addEventListener("submit", event => {
    event.preventDefault();
    const age = event.target.elements.age.value;
    const name = event.target.elements.name.value;
    // get, post, delete, put, patch
    fetch("/api/pokemons", {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        method: "POST",
        body: JSON.stringify({
            name,
            age,
        }),
    });
});
