document.addEventListener("DOMContentLoaded", async () => {

    if (!window.location.pathname.endsWith("detalle-producto.html")) {
        return;
    }

    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    if (!id) {
        window.location.href = "productos.html";
        return;
    }

    try {

        // ============================
        // CARGAR PRODUCTO
        // ============================

        const respuesta = await fetch(`http://localhost:3000/api/productos/${id}`);

        if (!respuesta.ok) {
            throw new Error("Producto no encontrado");
        }

        const producto = await respuesta.json();

        document.title = `TecnoCompras - ${producto.nombre}`;

        document.getElementById("producto-imagen").src = producto.imagen;
        document.getElementById("producto-imagen").alt = producto.nombre;

        document.getElementById("producto-sku").textContent =
            `SKU: ${producto.sku}`;

        document.getElementById("producto-nombre").textContent =
            producto.nombre;

        document.getElementById("producto-precio").textContent =
            `Lps ${Number(producto.precio).toLocaleString("es-HN", {
                minimumFractionDigits: 2
            })}`;

        document.getElementById("producto-descripcion").textContent =
            producto.descripcion;


        // ============================
        // BOTÓN AGREGAR AL CARRITO
        // ============================

        const boton = document.getElementById("btn-agregar-detalle");

        boton.onclick = function (e) {

            e.preventDefault();

            const cantidad = parseInt(
                document.getElementById("inputQuantity").value
            ) || 1;

            agregarAlCarrito({

                id: producto.id_producto,
                titulo: producto.nombre,
                precio: Number(producto.precio),
                imagen: producto.imagen,
                cantidad: cantidad

            });

            darFeedbackBoton(boton);

        };


        // ============================
        // PRODUCTOS RELACIONADOS
        // ============================

        const respuestaTodos = await fetch("http://localhost:3000/api/productos");

        const productos = await respuestaTodos.json();

        const relacionados = productos
            .filter(p => p.id_producto != producto.id_producto)
            .slice(0, 4);

        const contenedor = document.getElementById("productos-relacionados");

        contenedor.innerHTML = "";

        relacionados.forEach(p => {

            contenedor.innerHTML += `

            <div class="col mb-5">

                <div class="card h-100">

                    <img
                        class="card-img-top"
                        src="${p.imagen}"
                        alt="${p.nombre}">

                    <div class="card-body p-4">

                        <div class="text-center">

                            <h5 class="fw-bolder">

                                ${p.nombre}

                            </h5>

                            Lps ${Number(p.precio).toLocaleString("es-HN",{
                                minimumFractionDigits:2
                            })}

                        </div>

                    </div>

                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">

                        <div class="text-center">

                            <a
                                class="btn btn-outline-dark mt-auto"
                                href="detalle-producto.html?id=${p.id_producto}">

                                Ver detalle

                            </a>

                        </div>

                    </div>

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("No fue posible cargar el producto.");

        window.location.href = "productos.html";

    }

});