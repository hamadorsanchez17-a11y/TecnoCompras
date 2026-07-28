document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("product-grid");

    if (!contenedor) return;

    try {
        const respuesta = await fetch("http://localhost:3000/api/productos/catalogo");
        const productos = await respuesta.json();

        contenedor.innerHTML = "";

        const esIndex = window.location.pathname.endsWith("index.html");

        const productosMostrar = esIndex
            ? productos.slice(0, 4)
            : productos;
            
        productosMostrar.forEach(producto => {

            contenedor.innerHTML += `
                <div class="col mb-5">
                    <div class="card h-100">

                        <img class="card-img-top"
                             src="http://localhost:3000${producto.imagen}"
                             alt="${producto.nombre}">

                        <div class="card-body p-4">
                            <div class="text-center">

                                <h5 class="fw-bolder">
                                    ${producto.nombre}
                                </h5>

                                L ${Number(producto.precio).toLocaleString('es-HN',{
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

    } catch (error) {
        console.error(error);
    }
});


function activarBotones(){

    const botones = document.querySelectorAll(".btn-agregar-carrito");

    botones.forEach(boton=>{

        boton.addEventListener("click",(e)=>{

            e.preventDefault();

            const tarjeta = boton.closest(".card");

            const titulo = tarjeta.querySelector("h5").innerText;

            const precio = parseFloat(
                tarjeta.querySelector(".text-center").innerText.replace(/[^0-9.]/g,"")
            );

            const imagen = tarjeta.querySelector("img").src;

            agregarAlCarrito({

                id: boton.dataset.id,
                titulo,
                precio,
                imagen,
                cantidad:1

            });

            darFeedbackBoton(boton);

        });

    });

}