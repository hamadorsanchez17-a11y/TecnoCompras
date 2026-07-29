async function login(email, password) {

    const response = await fetch(`${API_URL}/auth/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            correo: email,
            password: password
        })

    });

    return await response.json();

}

function getToken() {
    return localStorage.getItem("token");
}

async function obtenerProductos() {

    const response = await fetch(`${API_URL}/productos`);

    return await response.json();

}

async function obtenerProducto(id) {

    const response = await fetch(`${API_URL}/productos/${id}`);

    return await response.json();

}

async function crearProducto(producto) {

    const response = await fetch(`${API_URL}/productos`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`

        },

        body: JSON.stringify(producto)

    });

    return await response.json();

}

async function actualizarProducto(id, producto) {

    const response = await fetch(`${API_URL}/productos/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`

        },

        body: JSON.stringify(producto)

    });

    return await response.json();

}
async function eliminarProducto(id) {

    const response = await fetch(`${API_URL}/productos/${id}`, {

        method: "DELETE",

        headers: {

            "Authorization": `Bearer ${getToken()}`

        }

    });

    return await response.json();

}

async function subirImagenProducto(id, archivo) {

    const formData = new FormData();

    formData.append("imagen", archivo);

    const response = await fetch(`${API_URL}/productos/${id}/imagen`, {

        method: "POST",

        headers: {
            "Authorization": `Bearer ${getToken()}`
        },

        body: formData

    });

    return await response.json();

}

// ===============================
// CATEGORÍAS
// ===============================

async function obtenerCategorias() {

    const response = await fetch(`${API_URL}/categorias`);

    return await response.json();

}

async function obtenerCategoria(id) {

    const response = await fetch(`${API_URL}/categorias/${id}`);

    return await response.json();

}

async function crearCategoria(categoria) {

    const response = await fetch(`${API_URL}/categorias`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`

        },

        body: JSON.stringify(categoria)

    });

    return await response.json();

}

async function actualizarCategoria(id, categoria) {

    const response = await fetch(`${API_URL}/categorias/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`

        },

        body: JSON.stringify(categoria)

    });

    return await response.json();

}

async function eliminarCategoria(id) {

    const response = await fetch(`${API_URL}/categorias/${id}`, {

        method: "DELETE",

        headers: {

            "Authorization": `Bearer ${getToken()}`

        }

    });

    return await response.json();

}

// ===============================
// MARCAS
// ===============================

async function obtenerMarcas() {

    const response = await fetch(`${API_URL}/marcas`);

    return await response.json();

}

async function obtenerMarca(id) {

    const response = await fetch(`${API_URL}/marcas/${id}`);

    return await response.json();

}

async function crearMarca(marca) {

    const response = await fetch(`${API_URL}/marcas`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`

        },

        body: JSON.stringify(marca)

    });

    return await response.json();

}

async function actualizarMarca(id, marca) {

    const response = await fetch(`${API_URL}/marcas/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`

        },

        body: JSON.stringify(marca)

    });

    return await response.json();

}

async function eliminarMarca(id) {

    const response = await fetch(`${API_URL}/marcas/${id}`, {

        method: "DELETE",

        headers: {

            "Authorization": `Bearer ${getToken()}`

        }

    });

    return await response.json();

}

// ===============================
// PEDIDOS
// ===============================

async function obtenerPedidos() {

    const response = await fetch(`${API_URL}/pedidos`);

    return await response.json();

}

async function obtenerPedido(id) {

    const response = await fetch(`${API_URL}/pedidos/${id}`);

    return await response.json();

}

async function crearPedido(pedido) {

    const response = await fetch(`${API_URL}/pedidos`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`

        },

        body: JSON.stringify(pedido)

    });

    return await response.json();

}

async function actualizarPedido(id, pedido) {

    const response = await fetch(`${API_URL}/pedidos/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`

        },

        body: JSON.stringify(pedido)

    });

    return await response.json();

}

async function eliminarPedido(id) {

    const response = await fetch(`${API_URL}/pedidos/${id}`, {

        method: "DELETE",

        headers: {

            "Authorization": `Bearer ${getToken()}`

        }

    });

    return await response.json();

}

// ===============================
// INVENTARIO
// ===============================

async function obtenerInventario() {

    const response = await fetch(`${API_URL}/inventario`);

    return await response.json();

}

async function obtenerInventarioPorId(id) {

    const response = await fetch(`${API_URL}/inventario/${id}`);

    return await response.json();

}

async function crearInventario(inventario) {

    const response = await fetch(`${API_URL}/inventario`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`

        },

        body: JSON.stringify(inventario)

    });

    return await response.json();

}

async function actualizarInventario(id, inventario) {

    const response = await fetch(`${API_URL}/inventario/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`

        },

        body: JSON.stringify(inventario)

    });

    return await response.json();

}

async function eliminarInventario(id) {

    const response = await fetch(`${API_URL}/inventario/${id}`, {

        method: "DELETE",

        headers: {

            "Authorization": `Bearer ${getToken()}`

        }

    });

    return await response.json();

}

// ===============================
// PEDIDOS
// ===============================
async function obtenerPedidos() {
    const response = await fetch(`${API_URL}/pedidos/admin`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
    
    const data = await response.json();
    console.log(data);
    return data.pedidos;
}

async function obtenerPedidoPorId(id) {
    const response = await fetch(`${API_URL}/pedidos/${id}`, {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    const data = await response.json();
    return data;
}

async function actualizarPedido(id, pedido) {

    const response = await fetch(`${API_URL}/pedidos/${id}/estado`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`

        },

        body: JSON.stringify(pedido)

    });

    return await response.json();

}

// ===============================
// ESTADOS DE PEDIDO
// ===============================

async function obtenerEstadosPedido() {

    const response = await fetch(`${API_URL}/order-status`);

    return await response.json();

}