// =============================================
// TP5 - Ejercicio 4: Fetch + API pública
// Prácticas Profesionalizantes II 
// =============================================

// --- Referencias al HTML ---
const contenedor = document.querySelector("#contenedorUsuarios");
const btnCargar  = document.querySelector("#btnCargar");


// --- Función async que consume la API ---
const cargarPersonajes = async () => {

  // Estado: Cargando...
  contenedor.innerHTML = "<p>Cargando...</p>";

  try {

    // 1. Hacer el fetch a la API
    const response = await fetch("https://rickandmortyapi.com/api/character");

    // 2. Verificar que la respuesta fue exitosa
    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.status}`);
    }

    // 3. Convertir la respuesta a JSON
    const data = await response.json();

    // La API devuelve los personajes dentro de data.results
    const personajes = data.results;

    // 4. Renderizar los datos como tarjetas usando map()
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

  } catch (error) {

    // 5. Si hay error, mostrar mensaje visible
    contenedor.innerHTML = `
      <p class="error">❌ Ocurrió un error: ${error.message}</p>
    `;

  }
};


// --- Evento: cargar al hacer click ---
btnCargar.addEventListener("click", cargarPersonajes);