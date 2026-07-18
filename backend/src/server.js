const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {      
        const connection = await pool.getConnection();

        console.log("Conexión exitosa a MySQL");

        connection.release();

        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error al conectar con MySQL");
        console.error(error.message);
    }
}

startServer();
