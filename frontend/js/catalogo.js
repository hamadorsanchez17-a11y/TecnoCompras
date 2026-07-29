document.addEventListener('DOMContentLoaded', () => {


    // B. Lógica para la vista de detalle de producto (detalle-producto.html)
    const btnAgregarDetalle = document.getElementById('btn-agregar-detalle');
    if (btnAgregarDetalle) {
        btnAgregarDetalle.addEventListener('click', (e) => {
            e.preventDefault();

            const titulo = document.querySelector('h1.display-5').innerText.trim();
            
            // Buscar el elemento donde está el precio excluyendo precios tachados/viejos si los hay
            const elementoPrecio = document.querySelector('.fs-5.mb-5') || document.body;
            const clone = elementoPrecio.cloneNode(true);
            
            // Si hay un precio anterior tachado (<span class="text-decoration-line-through">), lo ignoramos
            const precioViejo = clone.querySelector('.text-decoration-line-through');
            if (precioViejo) precioViejo.remove();

            const precio = parseFloat(clone.innerText.replace(/[^0-9.]/g, '')) || 0;
            const imagen = document.querySelector('.card-img-top')?.getAttribute('src') || '';
            
            const inputCantidad = document.getElementById('inputQuantity');
            const cantidad = inputCantidad ? parseInt(inputCantidad.value) || 1 : 1;

            agregarAlCarrito({
                id: titulo,
                titulo: titulo,
                precio: precio,
                imagen: imagen,
                cantidad: cantidad
            });

            darFeedbackBoton(btnAgregarDetalle);
        });
    }
});

// Función para insertar o incrementar la cantidad de un producto
async function agregarAlCarrito(productoNuevo) {
    let carrito = obtenerCarrito();
    const indice = carrito.findIndex(item => item.id === productoNuevo.id);

    if (indice !== -1) {
        // Si el producto ya estaba en el carrito, sumar la cantidad
        carrito[indice].cantidad += productoNuevo.cantidad;
    } else {
        // Si no estaba, agregarlo
        carrito.push(productoNuevo);
    }

    const token = localStorage.getItem("token");

    if (token) {
        try {
            await fetch("http://localhost:3000/api/cart/add-product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_producto: Number(productoNuevo.id),
                    cantidad: productoNuevo.cantidad,
                    precio: productoNuevo.precio
                })
            });
        } catch (error) {
            console.error("Error al guardar el carrito en el servidor:", error);
        }
    }

    guardarCarrito(carrito);
}

// Cambia de color y texto el botón momentáneamente al dar clic
function darFeedbackBoton(boton) {
    const textoOriginal = boton.innerHTML;
    boton.innerText = "¡Agregado!";
    boton.classList.replace('btn-dark', 'btn-success');
    
    setTimeout(() => {
        boton.innerHTML = textoOriginal;
        boton.classList.replace('btn-success', 'btn-dark');
    }, 1200);
}