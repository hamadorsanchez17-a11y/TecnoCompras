// js/global.js

// 1. Obtener los datos del carrito almacenados en localStorage
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carritoTecnoCompras')) || [];
}

// 2. Guardar el carrito actualizado y refrescar el contador en pantalla
function guardarCarrito(carrito) {
    localStorage.setItem('carritoTecnoCompras', JSON.stringify(carrito));
    actualizarBadgeCarrito();
}

// 3. Sumar el total de productos y actualizar el badge del Navbar
function actualizarBadgeCarrito() {
    const carrito = obtenerCarrito();
    // Suma la cantidad acumulada de cada ítem
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    
    const badge = document.getElementById('cart-count');
    if (badge) {
        badge.textContent = totalItems;
    }
}

// 4. Formatear números a lempiras hondureños (Ej: Lps 15,000.00)
function formatearLempiras(monto) {
    return `Lps ${monto.toLocaleString('es-HN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Ejecutar automáticamente al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {
    actualizarBadgeCarrito();
});