document.addEventListener('DOMContentLoaded', () => {
    const formPago = document.getElementById('form-pago');
    const inputNumero = document.getElementById('numeroTarjeta');
    const inputExpiracion = document.getElementById('expiracion');
    const inputCvv = document.getElementById('cvv');

    // 1. Formatear automáticamente el número de tarjeta (espacio cada 4 dígitos)
    if (inputNumero) {
        inputNumero.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, ''); // Eliminar todo lo que no sea dígito
            valor = valor.replace(/(.{4})/g, '$1 ').trim(); // Agregar espacio cada 4 números
            e.target.value = valor;
        });
    }

    // 2. Formatear la fecha de expiración (agrega '/' automáticamente tras 2 dígitos)
    if (inputExpiracion) {
        inputExpiracion.addEventListener('input', (e) => {
            let valor = e.target.value.replace(/\D/g, '');
            if (valor.length >= 2) {
                valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
            }
            e.target.value = valor;
        });
    }

    // 3. Permitir solo números en el CVV
    if (inputCvv) {
        inputCvv.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // 4. Manejar el envío del formulario
    if (formPago) {
        formPago.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validar que el número de tarjeta tenga al menos 16 dígitos sin contar espacios
            const numeroLimpio = inputNumero.value.replace(/\s+/g, '');
            if (numeroLimpio.length < 16) {
                alert('Por favor ingresa un número de tarjeta válido (16 dígitos).');
                return;
            }

            // Validar que el CVV tenga al menos 3 dígitos
            if (inputCvv.value.length < 3) {
                alert('Por favor ingresa un código CVV válido.');
                return;
            }

            // Vaciar el carrito tras confirmación de pago exitosa
            if (typeof guardarCarrito === 'function') {
                guardarCarrito([]);
            } else {
                localStorage.setItem('carrito', JSON.stringify([]));
            }

            // Redirigir a la página de confirmación final
            window.location.href = 'pedido-confirmado.html';
        });
    }
});