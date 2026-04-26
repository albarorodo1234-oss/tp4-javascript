// =============================================
// TP5 - Ejercicio 3: To-Do App
// Prácticas Profesionalizantes II - Ing. Díaz
// =============================================

// --- Referencias al HTML ---
const inputTarea  = document.querySelector("#inputTarea");
const btnAgregar  = document.querySelector("#btnAgregar");
const listaTareas = document.querySelector("#listaTareas");
const contador    = document.querySelector("#contador");


// --- Función: actualiza el contador de pendientes ---
const actualizarContador = () => {
  const pendientes = document.querySelectorAll("li:not(.completada)").length;
  contador.textContent = `Tareas pendientes: ${pendientes}`;
};


// --- Función: agrega una nueva tarea ---
const agregarTarea = () => {

  const texto = inputTarea.value.trim();

  // Validación: no se puede agregar tarea vacía
  if (texto === "") {
    alert("¡Escribí una tarea antes de agregar!");
    return;
  }

  // Crear el elemento <li>
  const li = document.createElement("li");
  li.textContent = texto;

  // Botón eliminar
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";

  // Evento: eliminar tarea
  btnEliminar.addEventListener("click", () => {
    li.remove();
    actualizarContador();
  });

  // Evento: marcar como completada
  li.addEventListener("click", (e) => {
    // Evita que el click en "Eliminar" también marque la tarea
    if (e.target === btnEliminar) return;
    li.classList.toggle("completada");
    actualizarContador();
  });

  // Agregar el botón al <li> y el <li> a la lista
  li.appendChild(btnEliminar);
  listaTareas.appendChild(li);

  // Limpiar el input y actualizar contador
  inputTarea.value = "";
  actualizarContador();
};


// --- Eventos ---
btnAgregar.addEventListener("click", agregarTarea);

// También agregar con la tecla Enter
inputTarea.addEventListener("keydown", (e) => {
  if (e.key === "Enter") agregarTarea();
});