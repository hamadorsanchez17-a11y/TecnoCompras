const express = require('express');
const app = express();

app.get("/",(req, res) => {
    res.send("Bienvenidos a la API de TecnoCompras");
});

module.exports = app;