let ataqueJugador
let ataqueEnemigo
let resultadoBatalla
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    let sectionReiniciarJuego = document.getElementById("reiniciar");
    sectionReiniciarJuego.style.display = "none";

    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = "none";

    let botonSeleccionarM = document.getElementById("boton-seleccionar-mascota");
    botonSeleccionarM.addEventListener("click", seleccionarMascota);

    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.addEventListener("click", ataqueFuego)
    let botonAgua = document.getElementById("boton-agua");
    botonAgua.addEventListener("click", ataqueAgua);
    let botonTierra = document.getElementById("boton-tierra");
    botonTierra.addEventListener("click", ataqueTierra);

    let botonReiniciar = document.getElementById("boton-reiniciar");
    botonReiniciar.addEventListener("click", reiniciarJuego);    
}
    
function seleccionarMascota() {
    let sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
    sectionSeleccionarMascota.style.display = "none";

    let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    sectionSeleccionarAtaque.style.display = "flex";
        
    let inputHipodoge = document.getElementById("hipodoge");
    let inputCapipepo = document.getElementById("capipepo");
    let inputRatigueya = document.getElementById("ratigueya");
    let spanMascotaJugador = document.getElementById("mascota-jugador");
    
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge";
        seleccionarMascotaEnemigo()
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo";
        seleccionarMascotaEnemigo()
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya";
        seleccionarMascotaEnemigo()
    } else {
        alert("No has elegido a ninguna mascota")
    }
}

function seleccionarMascotaEnemigo() {
    let mascotaEnemigoAleatorio = aleatorio(1, 3);
    let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

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
    crearMensaje();
    revisarVidas();
}

function resultadoDeLaBatalla() {
    let spanVidasJugador = document.getElementById("vidas-jugador");
    let spanVidasEnemigo = document.getElementById("vidas-enemigo");

    if(ataqueJugador == ataqueEnemigo) {
        resultadoBatalla = "Empate";
    } else if (ataqueJugador == "Fuego" && ataqueEnemigo == "Tierra" || ataqueJugador == "Agua" && ataqueEnemigo == "Fuego" || ataqueJugador == "Tierra" && ataqueEnemigo == "Agua") {
        resultadoBatalla = "Ganaste🥳";
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        resultadoBatalla = "Perdiste😭";
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador;
    }

}

function revisarVidas() {
    if(vidasEnemigo == 0) {
        crearMensajeFinal("Felicitaciones, ganaste🥳")
        let sectionReiniciarJuego = document.getElementById("reiniciar");
        sectionReiniciarJuego.style.display = "block";
    } else if(vidasJugador == 0) {
        crearMensajeFinal("Lo siento, has perdido😭")
        let sectionReiniciarJuego = document.getElementById("reiniciar");
        sectionReiniciarJuego.style.display = "block";
    }
}

function crearMensaje() {
    let sectionMensajes = document.getElementById("mensajes");
    let parrafo = document.createElement("p");
    parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ", y la mascota de tu enemigo atacó con " + ataqueEnemigo + " - " + resultadoBatalla
    sectionMensajes.appendChild(parrafo);
}

function crearMensajeFinal(resultadoFinal) {
    let sectionMensajes = document.getElementById("mensajes");
    let parrafo = document.createElement("p");
    parrafo.innerHTML = resultadoFinal;
    sectionMensajes.appendChild(parrafo);

    let botonFuego = document.getElementById("boton-fuego");
    botonFuego.disabled = true;
    let botonAgua = document.getElementById("boton-agua");
    botonAgua.disabled = true;
    let botonTierra = document.getElementById("boton-tierra");
    botonTierra.disabled = true;
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);