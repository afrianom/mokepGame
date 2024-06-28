const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonTierra = document.getElementById("boton-tierra");
const sectionReiniciarJuego = document.getElementById("reiniciar");

const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const botonSeleccionarM = document.getElementById("boton-seleccionar-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");

const inputHipodoge = document.getElementById("hipodoge");
const inputCapipepo = document.getElementById("capipepo");
const inputRatigueya = document.getElementById("ratigueya");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const mensajeAtaquesJugador = document.getElementById(`ataques-jugador`);
const mensajeAtaquesEnemigo = document.getElementById(`ataques-enemigo`);

let ataqueJugador
let ataqueEnemigo
let resultadoBatalla
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    sectionReiniciarJuego.style.display = "none";
    sectionSeleccionarAtaque.style.display = "none";

    botonSeleccionarM.addEventListener("click", seleccionarMascota);

    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua);
    botonTierra.addEventListener("click", ataqueTierra);
 
    botonReiniciar.addEventListener("click", reiniciarJuego);    
}
    
function seleccionarMascota() {
    sectionSeleccionarMascota.style.display = "none";    
    sectionSeleccionarAtaque.style.display = "flex";
        
    let mascotaSeleccionada = false;

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge";
        mascotaSeleccionada = true;
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo";
        mascotaSeleccionada = true;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya";
        mascotaSeleccionada = true;
    }

    if (mascotaSeleccionada) {
        seleccionarMascotaEnemigo();
    } else {
        alert("No has elegido a ninguna mascota");
        sectionSeleccionarMascota.style.display = "flex";
        sectionSeleccionarAtaque.style.display = "none";
    }
}

function seleccionarMascotaEnemigo() {
    let mascotaEnemigoAleatorio = aleatorio(1, 3);

    if (mascotaEnemigoAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = "Hipodoge";
    } else if (mascotaEnemigoAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = "Capipepo";
    } else {
        spanMascotaEnemigo.innerHTML = "Ratigueya";
    }
}

function ataqueFuego() {
    ataqueJugador = "Fuego";
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = "Agua";
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = "Tierra";
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    let ataqueDelEnemigo = aleatorio(1, 3);

    if (ataqueDelEnemigo == 1) {
        ataqueEnemigo = "Fuego";
    } else if (ataqueDelEnemigo == 2) {
        ataqueEnemigo = "Agua";
    } else {
        ataqueEnemigo = "Tierra";
    }

    resultadoDeLaBatalla();
}

function resultadoDeLaBatalla() {
    if(ataqueJugador == ataqueEnemigo) {
        crearMensaje("Empate");
    } else if (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra" || ataqueJugador == "Agua" && ataqueEnemigo == "Fuego" || ataqueJugador == "Tierra" && ataqueEnemigo == "Agua") {
        crearMensaje("Ganaste🥳");
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("Perdiste😭");
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador;
    }

    revisarVidas();
}

function revisarVidas() {
    if(vidasEnemigo == 0) {
        crearMensajeFinal("Felicitaciones, ganaste🥳")
    } else if(vidasJugador == 0) {
        crearMensajeFinal("Lo siento, has perdido😭")    
    }
}

function crearMensaje(resultado) {
    // let nuevoAtaqueJugador = document.createElement(`p`);
    // let nuevoAtaqueEnemigo = document.createElement(`p`);
    
    sectionMensajes.innerHTML = resultado;
    mensajeAtaquesJugador.innerHTML = `Atacas con ${ataqueJugador}`;
    mensajeAtaquesEnemigo.innerHTML = `Atacó con ${ataqueEnemigo}`;

    // mensajeAtaquesJugador.appendChild(nuevoAtaqueJugador);
    // mensajeAtaquesEnemigo.appendChild(nuevoAtaqueEnemigo);

    // let parrafo = document.createElement("p");
    // parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ", y la mascota de tu enemigo atacó con " + ataqueEnemigo + " - " + resultado
    // sectionMensajes.appendChild(parrafo);
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = resultadoFinal;

    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;

    sectionReiniciarJuego.style.display = "block";
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);