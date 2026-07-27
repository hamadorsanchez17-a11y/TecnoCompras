document.addEventListener('DOMContentLoaded', () => {
    // A. Lógica para catálogos (index.html y productos.html)
    const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Buscar la tarjeta contenedora (.card) del producto
            const tarjeta = boton.closest('.card');
            
            if (tarjeta) {
                const tituloElem = tarjeta.querySelector('h5');
                const titulo = tituloElem.innerText.trim();
                
                // Obtenemos solo el texto del precio aislando los nodos de texto
                // o usando cloneNode sin incluir el titulo <h5>
                const contenedorTexto = tarjeta.querySelector('.card-body .text-center');
                const clone = contenedorTexto.cloneNode(true);
                const h5EnClon = clone.querySelector('h5');
                if (h5EnClon) h5EnClon.remove(); // Eliminamos el título para dejar solo la línea del precio

                // Extraer solo números y punto decimal
                const precio = parseFloat(clone.innerText.replace(/[^0-9.]/g, '')) || 0;
                const imagen = tarjeta.querySelector('.card-img-top').getAttribute('src');

                agregarAlCarrito({
                    id: titulo, // Usamos el nombre como identificador único
                    titulo: titulo,
                    precio: precio,
                    imagen: imagen,
                    cantidad: 1
                });

                // Animación / confirmación visual en el botón
                darFeedbackBoton(boton);
            }
        });
    });

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
function agregarAlCarrito(productoNuevo) {
    let carrito = obtenerCarrito();
    const indice = carrito.findIndex(item => item.id === productoNuevo.id);

    if (indice !== -1) {
        // Si el producto ya estaba en el carrito, sumar la cantidad
        carrito[indice].cantidad += productoNuevo.cantidad;
    } else {
        // Si no estaba, agregarlo
        carrito.push(productoNuevo);
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