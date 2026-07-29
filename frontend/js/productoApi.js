let productosOriginales = [];
let contenedor = null;

document.addEventListener("DOMContentLoaded", async () => {

    contenedor = document.getElementById("product-grid");

    if (!contenedor) return;

    try {

        const respuesta = await fetch("http://localhost:3000/api/productos/catalogo");
        productosOriginales = await respuesta.json();

        const esIndex = window.location.pathname.endsWith("index.html");

        const listaInicial = esIndex
            ? productosOriginales.slice(0, 4)
            : productosOriginales;

        mostrarProductos(listaInicial);

        // =========================
        // ELEMENTOS DE FILTRO
        // =========================
        const inputBuscar = document.getElementById("buscarProducto");
        const filtroCategoria = document.getElementById("filtroCategoria");
        const ordenar = document.getElementById("ordenarPrecio");
        const btnLimpiar = document.getElementById("btnLimpiar");

        // =========================
        // BUSCADOR
        // =========================
        if (inputBuscar) {

            inputBuscar.addEventListener("input", aplicarFiltros);

        }

        // =========================
        // CATEGORÍA
        // =========================
        if (filtroCategoria) {

            filtroCategoria.addEventListener("change", aplicarFiltros);

        }

        // =========================
        // ORDENAR
        // =========================
        if (ordenar) {

            ordenar.addEventListener("change", aplicarFiltros);

        }

        // =========================
        // LIMPIAR
        // =========================
        if (btnLimpiar) {

            btnLimpiar.addEventListener("click", () => {
            
                if (inputBuscar) inputBuscar.value = "";
            
                if (filtroCategoria)
                    filtroCategoria.value = "";
            
                if (ordenar)
                    ordenar.value = "";
            
                mostrarProductos(productosOriginales);

            });
        
        }   

    } catch (error) {

        console.error(error);

    }

});

function aplicarFiltros() {

    let lista = [...productosOriginales];

    const inputBuscar = document.getElementById("buscarProducto");
    const filtroCategoria = document.getElementById("filtroCategoria");
    const ordenar = document.getElementById("ordenarPrecio");

    // Buscar
    if (inputBuscar && inputBuscar.value.trim() !== "") {

        const texto = inputBuscar.value.toLowerCase();

        lista = lista.filter(producto =>
            producto.nombre.toLowerCase().includes(texto)
        );

    }

    // Categoría
        if (filtroCategoria && filtroCategoria.value !== "") {

            const normalizar = (texto) =>
                texto
                    .toString()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase()
                    .trim();

            const categoriaSeleccionada = normalizar(filtroCategoria.value);

            lista = lista.filter(producto =>
                normalizar(producto.categoria) === categoriaSeleccionada
            );
        
        }    

    // Ordenar
    if (ordenar) {

        if (ordenar.value === "asc") {

            lista.sort((a, b) => a.precio - b.precio);

        } else if (ordenar.value === "desc") {

            lista.sort((a, b) => b.precio - a.precio);

        }

    }

    mostrarProductos(lista);

}

function mostrarProductos(listaProductos) {

    contenedor.innerHTML = "";

    listaProductos.forEach(producto => {

        contenedor.innerHTML += `

            <div class="col mb-5">

                <div class="card h-100">

                    <img
                        class="card-img-top"
                        src="http://localhost:3000${producto.imagen}"
                        alt="${producto.nombre}">

                    <div class="card-body p-4">

                        <div class="text-center">

                            <h5 class="fw-bolder">

                                ${producto.nombre}

                            </h5>

                            L ${Number(producto.precio).toLocaleString("es-HN",{
                                minimumFractionDigits:2
                            })}

                        </div>

                    </div>

                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">

                        <div class="d-grid gap-2">

                            <a
                                class="btn btn-outline-primary"
                                href="detalle-producto.html?id=${producto.id_producto}">

                                Ver detalle

                            </a>

                            <a
                                class="btn btn-outline-dark btn-agregar-carrito"
                                data-id="${producto.id_producto}"
                                href="#">

                                Agregar al carrito

                            </a>

                        </div>

                    </div>

                </div>

            </div>

        `;

    });

    activarBotones();

}

function activarBotones() {

    const botones = document.querySelectorAll(".btn-agregar-carrito");

    botones.forEach(boton => {

        boton.addEventListener("click", (e) => {

            e.preventDefault();

            const tarjeta = boton.closest(".card");

            const titulo = tarjeta.querySelector("h5").innerText;

            const precio = parseFloat(
                tarjeta.querySelector(".text-center").innerText.replace(/[^0-9.]/g, "")
            );

            const imagen = tarjeta.querySelector("img").src;

            agregarAlCarrito({

                id: boton.dataset.id,
                titulo,
                precio,
                imagen,
                cantidad: 1

            });

            darFeedbackBoton(boton);

        });

    });

}