document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("login-form");

    formulario.addEventListener("submit", async (e) => {

        e.preventDefault();

        const correo = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!correo || !password) {
            alert("Debe completar todos los campos.");
            return;
        }

        try {

            const respuesta = await login(correo, password);

            if (respuesta.token) {

                localStorage.setItem("token", respuesta.token);

                window.location.href = "index.html";

            } else {

                alert(respuesta.mensaje || "Correo o contraseña incorrectos.");

            }

        } catch (error) {

            console.error(error);
            alert("Error al conectar con el servidor.");

        }

    });

});