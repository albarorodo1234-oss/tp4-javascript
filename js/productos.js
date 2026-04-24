// =============================================
// TP5 - Ejercicio 2: Filtrado de Productos
// Prácticas Profesionalizantes II - Ing. Díaz
// =============================================

// --- Array de productos ---
const productos = [
  { id: 1, nombre: "Auriculares Bluetooth", precio: 150, categoria: "electronica", enStock: true },
  { id: 2, nombre: "Teclado Mecánico",      precio: 200, categoria: "electronica", enStock: true },
  { id: 3, nombre: "Mouse Inalámbrico",     precio: 80,  categoria: "electronica", enStock: false },
  { id: 4, nombre: "Campera de Invierno",   precio: 300, categoria: "ropa",        enStock: true },
  { id: 5, nombre: "Zapatillas Running",    precio: 450, categoria: "ropa",        enStock: true },
  { id: 6, nombre: "Remera Deportiva",      precio: 60,  categoria: "ropa",        enStock: false },
  { id: 7, nombre: "Lámpara de Escritorio", precio: 90,  categoria: "hogar",       enStock: true },
  { id: 8, nombre: "Silla Ergonómica",      precio: 800, categoria: "hogar",       enStock: true },
  { id: 9, nombre: "Cargador USB-C",        precio: 40,  categoria: "electronica", enStock: true }
];

// --- Referencias a los elementos del HTML ---
const contenedor      = document.querySelector("#contenedorProductos");
const inputBusqueda   = document.querySelector("#inputBusqueda");
const selectCategoria = document.querySelector("#selectCategoria");
const rangePrecio     = document.querySelector("#rangePrecio");
const valorPrecio     = document.querySelector("#valorPrecio");
const checkStock      = document.querySelector("#checkStock");


// --- Función principal: filtra y muestra los productos ---
const mostrarProductos = () => {

  // Leer los valores actuales de cada filtro
  const textoBusqueda = inputBusqueda.value.toLowerCase();
  const categoriaElegida = selectCategoria.value;
  const precioMaximo = Number(rangePrecio.value);
  const soloStock = checkStock.checked;

  // Aplicar todos los filtros combinados
  const productosFiltrados = productos
    .filter((p) => {
      // Filtro por nombre
      return p.nombre.toLowerCase().includes(textoBusqueda);
    })
    .filter((p) => {
      // Filtro por categoría
      if (categoriaElegida === "todas") return true;
      return p.categoria === categoriaElegida;
    })
    .filter((p) => {
      // Filtro por precio máximo
      return p.precio <= precioMaximo;
    })
    .filter((p) => {
      // Filtro por stock
      if (soloStock) return p.enStock === true;
      return true;
    });

  // Si no hay resultados, mostrar mensaje
  if (productosFiltrados.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  // Mostrar las tarjetas con map()
  contenedor.innerHTML = productosFiltrados
    .map((p) => {
      const estadoStock = p.enStock ? "✅ En stock" : "❌ Sin stock";
      return `
        <div class="tarjeta">
          <h3>${p.nombre}</h3>
          <p class="precio">$${p.precio}</p>
          <p class="categoria">${p.categoria}</p>
          <p>${estadoStock}</p>
        </div>
      `;
    })
    .join("");
};


// --- Eventos: cada filtro llama a mostrarProductos() ---
inputBusqueda.addEventListener("input", mostrarProductos);
selectCategoria.addEventListener("change", mostrarProductos);
checkStock.addEventListener("change", mostrarProductos);

rangePrecio.addEventListener("input", () => {
  valorPrecio.textContent = rangePrecio.value; // actualiza el número visible
  mostrarProductos();
});


// --- Mostrar todos los productos al cargar la página ---
mostrarProductos();