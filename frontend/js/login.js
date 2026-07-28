document.getElementById("formLogin").addEventListener("submit", async (e) => {

    e.preventDefault();

    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    try {

        const respuesta = await fetch("http://localhost:3000/api/auth/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                correo,
                password
            })

        });

        const data = await respuesta.json();

        if (!respuesta.ok) {

            alert(data.mensaje);
            return;

        }

        localStorage.setItem("token", data.token);

        alert(data.mensaje);

        // Temporalmente
        window.location.href = "index.html";

    } catch (error) {

        console.error(error);
        alert("No fue posible conectar con el servidor.");

    }

});