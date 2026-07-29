document.addEventListener("DOMContentLoaded", () => {

    renderizarResumenCheckout();

    const formularioCheckout = document.getElementById("form-checkout");

    if (!formularioCheckout) return;

    formularioCheckout.addEventListener("submit", async (e) => {

        e.preventDefault();

        const carrito = obtenerCarrito();

        console.log("Carrito:", carrito);
        console.log("Cantidad:", carrito.length);

        if (carrito.length === 0) {
            alert("Tu carrito está vacío.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Debes iniciar sesión.");
            window.location.href = "login.html";
            return;
        }

        // Validar datos de tarjeta si está seleccionada
        if (document.getElementById("credit").checked) {

            const titular = document.getElementById("titular").value.trim();
            const numero = document.getElementById("numeroTarjeta").value.trim();
            const expiracion = document.getElementById("expiracion").value;
            const cvv = document.getElementById("cvv").value.trim();

            if (!titular || !numero || !expiracion || !cvv) {
                alert("Completa todos los datos de la tarjeta.");
                return;
            }

        }

        const direccion = {
            calle: document.getElementById("calle").value,
            ciudad: document.getElementById("ciudad").value,
            departamento: document.getElementById("departamento").value,
            codigo_postal: document.getElementById("codigo_postal").value,
            referencia: document.getElementById("referencia").value,
            principal: true
        };

        const id_metodo =
            document.getElementById("credit").checked ? 1 : 2;

        try {

            // Crear dirección
            const respuestaDireccion = await fetch("http://localhost:3000/api/direcciones", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(direccion)
            });

            const datosDireccion = await respuestaDireccion.json();

            if (!respuestaDireccion.ok) {
                alert(datosDireccion.mensaje);
                return;
            }

            // Crear pedido
            const respuestaPedido = await fetch("http://localhost:3000/api/pedidos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_direccion: datosDireccion.id_direccion,
                    id_metodo: id_metodo
                })
            });

            const datosPedido = await respuestaPedido.json();

            if (!respuestaPedido.ok) {
                alert(datosPedido.mensaje);
                return;
            }

            // Vaciar carrito
            if (typeof guardarCarrito === "function") {
                guardarCarrito([]);
            } else {
                localStorage.removeItem("carrito");
            }

            alert("¡Pedido realizado correctamente!");

            window.location.href = "pedido-confirmado.html";

        } catch (error) {

            console.error(error);
            alert("Ocurrió un error al procesar el pedido.");

        }

    });

    // Mostrar u ocultar los datos de la tarjeta
    const credit = document.getElementById("credit");
    const cash = document.getElementById("cash");
    const datosTarjeta = document.getElementById("datosTarjeta");

    function actualizarMetodoPago() {

        if (credit.checked) {
            datosTarjeta.style.display = "block";
        } else {
            datosTarjeta.style.display = "none";
        }

    }

    credit.addEventListener("change", actualizarMetodoPago);
    cash.addEventListener("change", actualizarMetodoPago);

    actualizarMetodoPago();

});

function renderizarResumenCheckout() {

    const carrito = obtenerCarrito();
    const listaResumen = document.getElementById("checkout-resumen-lista");
    const totalElemento = document.getElementById("checkout-total");

    if (!listaResumen) return;

    if (carrito.length === 0) {

        listaResumen.innerHTML =
            '<li class="list-group-item text-muted">No hay productos en el pedido</li>';

        if (totalElemento)
            totalElemento.innerText = "Lps 0.00";

        return;

    }

    let html = "";
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

    if (totalElemento)
        totalElemento.innerText = formatearLempiras(total);

}