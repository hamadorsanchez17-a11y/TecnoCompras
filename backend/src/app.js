const express = require("express");
const cors = require("cors");

const app = express();

const categoryRoutes = require("./routes/categoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/productos", require("./routes/productRoutes"));
app.use("/api/categorias", categoryRoutes);
app.use("/api/marcas", brandRoutes);
app.use("/api/inventario", inventoryRoutes);
app.use("/api/carritos", cartRoutes);

app.get("/", (req, res) => {
    res.send("Bienvenidos a la API de TecnoCompras");
});

module.exports = app;