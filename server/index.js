// 1. отдавать разные html страницы в зависимости от переданного пути
const express = require("express");
const app = express();
const path = require("path");
const { Pokemon } = require("./database");
var bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use("/static", express.static(path.join(__dirname, "../client")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/about.html"));
});

app.get("/api/pokemons", (req, res) => {
    Pokemon.find().then(pokemons => {
        res.send({ pokemons });
    });
});

app.post("/api/pokemons", async (request, response) => {
    const { name, age } = request.body;

    if (
        !name ||
        typeof name !== "string" ||
        !name.trim() ||
        !age ||
        isNaN(Number(age)) ||
        Number(age) > 100 ||
        Number(age) < 0
    ) {
        response.status(400).send({
            message: "Provide correct data",
        });
    }

    try {
        const pokemon = await Pokemon.find({ name: name });

        if (pokemon.length) {
            return response.status(400).send({
                message: "Pokemon already exists",
                name: name,
                hello: "world",
            });
        }

        const newPokemon = new Pokemon({
            name,
            age: Number(age),
        });

        await newPokemon.save();

        response.status(201).send({
            message: "Pokemon created",
            pokemon,
        });
    } catch (error) {}
});

app.listen(8080, () => {
    console.log("Server started at http://localhost:" + 8080);
});
