document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');
    const passInput = document.getElementById('password');
    const confirmPassInput = document.getElementById('confirm_password');

    formRegistro.addEventListener('submit', async function (event) {
        // Detiene el envío predeterminado a PHP
        event.preventDefault();

        let esValido = true;

        // 1. Validar longitud mínima de la contraseña (mínimo 6 caracteres)
        if (passInput.value.length < 6) {
            passInput.classList.add('is-invalid');
            esValido = false;
        } else {
            passInput.classList.remove('is-invalid');
        }

        // 2. Validar que las contraseñas coincidan
        if (passInput.value !== confirmPassInput.value || confirmPassInput.value === '') {
            confirmPassInput.classList.add('is-invalid');
            esValido = false;
        } else {
            confirmPassInput.classList.remove('is-invalid');
        }

        if (esValido) {

    try {

        const respuesta = await fetch(
                    "http://localhost:3000/api/auth/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            nombre: document.getElementById("nombre").value,
                            apellido: document.getElementById("apellido").value,
                            correo: document.getElementById("correo").value,
                            password: document.getElementById("password").value,
                            telefono: document.getElementById("telefono").value
                        })
                    }
                );
            
                const data = await respuesta.json();
            
                if (!respuesta.ok) {
                    alert(data.mensaje);
                    return;
                }
            
                alert(data.mensaje);
                window.location.href = "login.html";
            
            } catch (error) {
            
                console.error(error);
                alert("No se pudo conectar con el servidor.");
            
            }
        
        }
    });

    // Limpiar alertas de error en tiempo real mientras el usuario escribe
    passInput.addEventListener('input', () => {
        if (passInput.value.length >= 6) {
            passInput.classList.remove('is-invalid');
        }
    });

    confirmPassInput.addEventListener('input', () => {
        if (passInput.value === confirmPassInput.value) {
            confirmPassInput.classList.remove('is-invalid');
        }
    });
});