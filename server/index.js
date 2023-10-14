// 1. отдавать разные html страницы в зависимости от переданного пути
const express = require("express");
const app = express();
const path = require("path");

app.use("/static", express.static(path.join(__dirname, "../client/")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.get("/pokemons", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/pokemons.html"));
});

app.get("/post-page/:id", function (req, res) {
  const {id} = req.params;
  console.log("received request for post:", id)
  res.sendFile(path.join(__dirname, "../client/post-page.html"));
});

app.get("/pokemons/:pokemon", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pokemon-page.html"));
});

app.get("/posts", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/posts.html"));
});

app.listen(8080, () => {
    console.log("Server started at http://localhost:" + 8080);
});
