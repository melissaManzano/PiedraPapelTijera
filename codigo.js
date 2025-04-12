// Función que verifica si el usuario es mayor de edad según su fecha de nacimiento
function mayorEdad(nacimiento) {
    // Separamos la fecha ingresada en formato DD/MM/AAAA
    let fecha = nacimiento.split("/");
    if (fecha.length !== 3) return false;

    // Convertimos cada parte en número
    let dia = parseInt(fecha[0]);
    let mes = parseInt(fecha[1]);
    let añoUsuario = parseInt(fecha[2]);

    // Verificamos que todos sean números válidos
    if (isNaN(dia) || isNaN(mes) || isNaN(añoUsuario)) return false;

    // Obtenemos la fecha actual
    let fechaActual = new Date();
    let añoActual = fechaActual.getFullYear();
    let mesActual = fechaActual.getMonth() + 1;
    let diaActual = fechaActual.getDate();

    // Calculamos la edad del usuario
    let edad = añoActual - añoUsuario;

    // Ajustamos la edad si aún no ha cumplido años este año
    if (mes > mesActual || (mes == mesActual && dia > diaActual)) {
        edad--;
    }

    // Retornamos si es mayor o igual a 18 años
    return edad >= 18;
}

// Variables globales para llevar el conteo de triunfos y derrotas
let triunfos = 0;
let perdidas = 0;
let nombre = "";

// Función que inicia el juego luego de validar nombre y fecha
function iniciarJuego() {
    // Obtenemos el valor ingresado por el usuario
    nombre = document.getElementById("nombre").value;
    let nacimiento = document.getElementById("nacimiento").value;

    // Verificamos que los campos no estén vacíos
    if (nombre.trim() === "" || nacimiento.trim() === "") {
        alert("Por favor, completa ambos campos.");
        return;
    }

    // Verificamos si es mayor de edad
    if (mayorEdad(nacimiento)) {
        // Mostramos el contenedor del juego y ocultamos el formulario
        document.getElementById("registro").style.display = "none";
        document.getElementById("juego").style.display = "block";
        // Mostramos un saludo personalizado
        document.getElementById("saludo").textContent = "¡Hola, " + nombre + "! Elige una opción:";
        // Inicializamos el contador
        actualizarContador();
    } else {
        alert("No puedes jugar, eres menor de edad.");
    }
}

// Función para generar un número aleatorio entre un mínimo y máximo
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Función que devuelve el nombre de la elección basada en el número
function eleccion(opcion) {
    if (opcion == 1) return "Piedra 🪨";
    if (opcion == 2) return "Papel 📄";
    if (opcion == 3) return "Tijera ✂️";
    return "Elección inválida";
}

// Función principal que se ejecuta al elegir una opción del juego
function jugar(jugador) {
    // La PC elige un número aleatorio entre 1 y 3
    let pc = aleatorio(1, 3);

    // Mostramos las elecciones
    let mensaje = "Tú elegiste: " + eleccion(jugador) + "<br>La PC eligió: " + eleccion(pc) + "<br>";

    // Lógica del juego: empate, gana jugador, gana PC
    if (pc === jugador) {
        mensaje += "¡Empate!";
    } else if (
        (jugador === 1 && pc === 3) ||
        (jugador === 2 && pc === 1) ||
        (jugador === 3 && pc === 2)
    ) {
        triunfos++;
        mensaje += "¡Ganaste esta ronda!";
    } else {
        perdidas++;
        mensaje += "Perdiste esta ronda.";
    }

    // Mostramos el resultado
    document.getElementById("resultado").innerHTML = mensaje;
    actualizarContador();

    // Verificamos si alguien llegó a 3 partidas ganadas
    if (triunfos === 3 || perdidas === 3) {
        let final = (triunfos === 3) 
            ? "¡Felicidades " + nombre + ", ganaste el juego! 🎉" 
            : "Lo siento " + nombre + ", perdiste el juego 😢";
        document.getElementById("resultado").innerHTML += "<br><strong>" + final + "</strong>";
        desactivarBotones();
    }
}

// Función que actualiza el contador de triunfos y derrotas en pantalla
function actualizarContador() {
    document.getElementById("contador").textContent = `Triunfos: ${triunfos} | Derrotas: ${perdidas}`;
}

// Función que desactiva los botones de juego al finalizar
function desactivarBotones() {
    let botones = document.querySelectorAll("button[onclick^='jugar']");
    botones.forEach(btn => btn.disabled = true);
}
