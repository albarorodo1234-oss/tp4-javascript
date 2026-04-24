//Crear un archivo js/ejercicios.js con los siguientes ejercicios resueltos (cada uno como
//una función con const + arrow function): 

// =============================================
// TP5 - Ejercicio 1: Funciones con Arrays ES6+
// Prácticas Profesionalizantes II - Ing. Díaz
// =============================================

// Array de prueba - alumnos con nombre y nota
const alumnos = [
  { nombre: "Ana", nota: 8 },
  { nombre: "Luis", nota: 4 },
  { nombre: "María", nota: 7 },
  { nombre: "Carlos", nota: 5 },
  { nombre: "Lucía", nota: 9 },
  { nombre: "Pedro", nota: 3 }
];

// Array de notas para el promedio
const notas = [8, 4, 7, 5, 9, 3];


// --------------------------------------------------
// (a) calcularPromedio: recibe un array de números
//     y retorna el promedio usando reduce()
// --------------------------------------------------
const calcularPromedio = (notas) => {
  const suma = notas.reduce((acumulador, nota) => acumulador + nota, 0);
  return suma / notas.length;
};

console.log("--- Promedio ---");
console.log(calcularPromedio(notas)); // 6


// --------------------------------------------------
// (b) filtrarAprobados: recibe array de objetos
//     {nombre, nota} y retorna solo nota >= 6
// --------------------------------------------------
const filtrarAprobados = (alumnos) => {
  return alumnos.filter((alumno) => alumno.nota >= 6);
};

console.log("--- Aprobados ---");
console.log(filtrarAprobados(alumnos));
// Ana (8), María (7), Lucía (9)


// --------------------------------------------------
// (c) formatearAlumnos: retorna array de strings
//     "Nombre: X - Nota: Y" usando map()
// --------------------------------------------------
const formatearAlumnos = (alumnos) => {
  return alumnos.map((alumno) => `Nombre: ${alumno.nombre} - Nota: ${alumno.nota}`);
};

console.log("--- Alumnos formateados ---");
console.log(formatearAlumnos(alumnos));
// ["Nombre: Ana - Nota: 8", "Nombre: Luis - Nota: 4", ...]


// --------------------------------------------------
// (d) buscarAlumno: usa find() para buscar por nombre
// --------------------------------------------------
const buscarAlumno = (alumnos, nombre) => {
  return alumnos.find((alumno) => alumno.nombre === nombre);
};

console.log("--- Buscar alumno ---");
console.log(buscarAlumno(alumnos, "María")); // { nombre: "María", nota: 7 }
console.log(buscarAlumno(alumnos, "Juan"));  // undefined (no existe)