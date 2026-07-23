const express = require("express");
const cors = require("cors");

const app = express();

const categoryRoutes = require("./routes/categoryRoutes");

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/productos", require("./routes/productRoutes"));
app.use("/api/categorias", categoryRoutes);

app.get("/", (req, res) => {
    res.send("Bienvenidos a la API de TecnoCompras");
});

module.exports = app;