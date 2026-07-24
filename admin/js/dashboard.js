document.addEventListener("DOMContentLoaded", () => {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const logout = document.getElementById("logout");

    if (logout) {

        logout.addEventListener("click", (e) => {

            e.preventDefault();

            localStorage.removeItem("token");

            window.location.href = "login.html";

        });

    }

});

document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const logout = document.getElementById("logout");

    if (logout) {

        logout.addEventListener("click", (e) => {

            e.preventDefault();

            localStorage.removeItem("token");

            window.location.href = "login.html";

        });

    }

    await cargarDashboard();

});

async function cargarDashboard() {

    try {

        const productos = await obtenerProductos();
        const categorias = await obtenerCategorias();
        const inventario = await obtenerInventario();
        const pedidos = await obtenerPedidos();

        document.getElementById("totalProductos").textContent = productos.length;
        document.getElementById("totalCategorias").textContent = categorias.length;
        document.getElementById("totalInventario").textContent = inventario.length;
        document.getElementById("totalPedidos").textContent = pedidos.length;

    } catch (error) {

        console.error(error);

    }

}