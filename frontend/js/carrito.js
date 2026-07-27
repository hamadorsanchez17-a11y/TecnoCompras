// js/carrito.js

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
});

function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const contenedorTabla = document.getElementById('tabla-carrito-body');
    const contenedorSubtotal = document.getElementById('resumen-subtotal');
    const contenedorTotal = document.getElementById('resumen-total');
    
    if (!contenedorTabla) return;

    // Si el carrito no tiene productos
    if (carrito.length === 0) {
        contenedorTabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-5">
                    <h5>Tu carrito está vacío 🛒</h5>
                    <a href="productos.html" class="btn btn-outline-dark mt-3">Ir al catálogo de productos</a>
                </td>
            </tr>
        `;
        if (contenedorSubtotal) contenedorSubtotal.innerText = "Lps 0.00";
        if (contenedorTotal) contenedorTotal.innerText = "Lps 0.00";
        return;
    }

    // Construir las filas de la tabla
    let htmlFilas = '';
    let subtotalGeneral = 0;

    carrito.forEach((producto, index) => {
        const subtotalProducto = producto.precio * producto.cantidad;
        subtotalGeneral += subtotalProducto;

        htmlFilas += `
            <tr>
                <td class="align-middle">
                    <div class="d-flex align-items-center">
                        <img src="${producto.imagen}" alt="${producto.titulo}" style="width: 50px; height: 50px; object-fit: cover;" class="me-3 rounded">
                        <span>${producto.titulo}</span>
                    </div>
                </td>
                <td class="align-middle">${formatearLempiras(producto.precio)}</td>
                <td class="align-middle" style="max-width: 120px;">
                    <input type="number" min="1" class="form-control text-center input-cantidad" 
                           data-index="${index}" value="${producto.cantidad}">
                </td>
                <td class="align-middle">${formatearLempiras(subtotalProducto)}</td>
                <td class="align-middle text-center">
                    <button class="btn btn-outline-danger btn-sm btn-eliminar" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    contenedorTabla.innerHTML = htmlFilas;

    // Actualizar Totales
    if (contenedorSubtotal) contenedorSubtotal.innerText = formatearLempiras(subtotalGeneral);
    if (contenedorTotal) contenedorTotal.innerText = formatearLempiras(subtotalGeneral);

    // Asignar eventos a botones e inputs recién dibujados
    escucharEventosTabla();
}

function escucharEventosTabla() {
    // Cambiar la cantidad
    document.querySelectorAll('.input-cantidad').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.getAttribute('data-index');
            let nuevaCantidad = parseInt(e.target.value);

            if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
                nuevaCantidad = 1;
            }

            let carrito = obtenerCarrito();
            carrito[index].cantidad = nuevaCantidad;
            guardarCarrito(carrito);
            renderizarCarrito();
        });
    });

    // Eliminar un ítem
    document.querySelectorAll('.btn-eliminar').forEach(boton => {
        boton.addEventListener('click', () => {
            const index = boton.getAttribute('data-index');
            let carrito = obtenerCarrito();
            
            carrito.splice(index, 1);
            guardarCarrito(carrito);
            renderizarCarrito();
        });
    });
}