document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('formRegistro');
    const passInput = document.getElementById('password');
    const confirmPassInput = document.getElementById('confirm_password');

    formRegistro.addEventListener('submit', function (event) {
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

        // Si la validación es correcta, redirige a login.html
        if (esValido) {
            window.location.href = 'login.html';
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