document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener la categoría seleccionada desde la URL (ej. categorias.html?cat=celulares)
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('cat') || 'todos';

    // 2. Obtener referencias de la grilla y los botones de filtrado si existen
    const productItems = document.querySelectorAll('.producto-item');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Función para filtrar los elementos del DOM
    function filterProducts(category) {
        productItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (category === 'todos' || itemCategory === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });

        // Actualizar estado visual de los botones si los tienes en la página
        filterButtons.forEach(button => {
            const btnCategory = button.getAttribute('data-category');
            if (btnCategory === category) {
                button.classList.remove('btn-outline-dark');
                button.classList.add('btn-dark', 'active');
            } else {
                button.classList.remove('btn-dark', 'active');
                button.classList.add('btn-outline-dark');
            }
        });
    }

    // 3. Ejecutar el filtro inicial al cargar la página
    filterProducts(selectedCategory);

    // 4. Agregar eventos a los botones de filtro dentro de la página (si el usuario hace clic directo)
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const category = button.getAttribute('data-category');
            
            // Actualizar URL sin recargar la página para mantener consistencia
            const newUrl = `${window.location.pathname}?cat=${category}`;
            window.history.pushState({ path: newUrl }, '', newUrl);

            filterProducts(category);
        });
    });
});