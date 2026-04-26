// =============================================
// TP5 - Ejercicio 4 y 5: Fetch + Buscador
// Prácticas Profesionalizantes II - Ing. Díaz
// =============================================

// --- Referencias al HTML ---
const contenedor      = document.querySelector("#contenedorUsuarios");
const btnCargar       = document.querySelector("#btnCargar");
const inputBusqueda   = document.querySelector("#inputBusqueda");
const mensajeBusqueda = document.querySelector("#mensajeBusqueda");

// --- Variable para guardar todos los personajes cargados ---
let todosLosPersonajes = [];


// --- Función: renderiza tarjetas en el DOM ---
const mostrarTarjetas = (personajes) => {
  if (personajes.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
    return;
  }

  contenedor.innerHTML = personajes
    .map((p) => `
      <div class="tarjeta">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>Estado: ${p.status}</p>
        <p>Especie: ${p.species}</p>
        <p>Origen: ${p.origin.name}</p>
      </div>
    `)
    .join("");
};


// --- Función async: carga todos los personajes ---
const cargarPersonajes = async () => {

  contenedor.innerHTML = "<p>Cargando...</p>";
  mensajeBusqueda.textContent = "";

  try {

    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status}`);
    }

    const data = await response.json();
    todosLosPersonajes = data.results;

    mostrarTarjetas(todosLosPersonajes);

  } catch (error) {
    contenedor.innerHTML = `
      <p class="error">❌ Ocurrió un error: ${error.message}</p>
    `;
  }
};


// --- Función: filtra localmente con .filter() ---
const buscarPersonaje = () => {

  const texto = inputBusqueda.value.toLowerCase().trim();

  // (a) Menos de 3 caracteres: mostrar mensaje informativo
  if (texto.length < 3) {
    mensajeBusqueda.textContent = "Escribí al menos 3 letras para buscar.";
    mostrarTarjetas(todosLosPersonajes);
    return;
  }

  // (b) Mostrar "Buscando..."
  mensajeBusqueda.textContent = "Buscando...";

  // (c) Filtrar localmente con .filter()
  const resultado = todosLosPersonajes.filter((p) =>
    p.name.toLowerCase().includes(texto)
  );

  // (d) Sin resultados
  if (resultado.length === 0) {
    mensajeBusqueda.textContent = "No se encontraron resultados.";
    contenedor.innerHTML = "";
    return;
  }

  // (e) Mostrar resultados
  mensajeBusqueda.textContent = "";
  mostrarTarjetas(resultado);
};


// ---- Eventos ----
btnCargar.addEventListener("click", cargarPersonajes);
inputBusqueda.addEventListener("input", buscarPersonaje);