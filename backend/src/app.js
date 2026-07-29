const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const brandRoutes = require("./routes/brandRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const cartRoutes = require("./routes/cartRoutes");
const cartDetailRoutes = require("./routes/cartDetailRoutes");
const orderDetailRoutes = require("./routes/orderDetailRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderStatusRoutes = require("./routes/orderStatusRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const direccionRoutes = require("./routes/direccionRoutes");



app.use(cors());
app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/productos", productRoutes);
app.use("/api/categorias", categoryRoutes);
app.use("/api/marcas", brandRoutes);
app.use("/api/inventario", inventoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/carrito-detalle", cartDetailRoutes);
app.use("/api/pedido-detalle", orderDetailRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/order-status", orderStatusRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/direcciones", direccionRoutes);


app.get("/", (req, res) => {
    res.send("Bienvenidos a la API de TecnoCompras");
});     

module.exports = app;