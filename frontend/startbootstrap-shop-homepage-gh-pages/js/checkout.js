document.addEventListener('DOMContentLoaded', () => {
    renderizarResumenCheckout();

    const formularioCheckout = document.getElementById('form-checkout');
    if (formularioCheckout) {
        formularioCheckout.addEventListener('submit', (e) => {
            e.preventDefault();

            const carrito = obtenerCarrito();
            if (carrito.length === 0) {
                alert('Tu carrito está vacío. Agrega productos antes de realizar la compra.');
                window.location.href = 'productos.html';
                return;
            }

            // Redirigir a la página para ingresar la tarjeta de crédito/débito
            window.location.href = 'formulariopago.html';
        });
    }
});

function renderizarResumenCheckout() {
    const carrito = obtenerCarrito();
    const listaResumen = document.getElementById('checkout-resumen-lista');
    const totalElemento = document.getElementById('checkout-total');

    if (!listaResumen) return;

    if (carrito.length === 0) {
        listaResumen.innerHTML = '<li class="list-group-item text-muted">No hay productos en el pedido</li>';
        if (totalElemento) totalElemento.innerText = 'Lps 0.00';
        return;
    }

    let html = '';
    let total = 0;

    carrito.forEach(prod => {
        const subtotal = prod.precio * prod.cantidad;
        total += subtotal;

        html += `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${prod.titulo}</h6>
                    <small class="text-muted">Cantidad: ${prod.cantidad}</small>
                </div>
                <span class="text-muted">${formatearLempiras(subtotal)}</span>
            </li>
        `;
    });

    listaResumen.innerHTML = html;
    if (totalElemento) totalElemento.innerText = formatearLempiras(total);
}