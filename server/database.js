const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test");

const Pokemon = mongoose.model("Pokemons", {
    name: String,
    age: Number,
    approved: Boolean,
});

module.exports = {
    Pokemon,
};
