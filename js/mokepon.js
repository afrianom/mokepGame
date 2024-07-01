const sectionReiniciarJuego = document.getElementById("reiniciar");

const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const botonSeleccionarM = document.getElementById("boton-seleccionar-mascota");
const botonReiniciar = document.getElementById("boton-reiniciar");
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");

const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");

const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const mensajeAtaquesJugador = document.getElementById(`ataques-jugador`);
const mensajeAtaquesEnemigo = document.getElementById(`ataques-enemigo`);
const contenedorTarjetas = document.getElementById('contenedor-tarjetas');
const botonesContainer = document.getElementById('contenedor-ataques');

let botonFuego
let botonAgua
let botonTierra
let mokepones = [];
let ataqueJugador
let ataqueEnemigo
let resultadoBatalla
let inputHipodoge
let inputCapipepo
let inputRatigueya
let opcionMokepones
let mokeponJugador
let ataquesMokepon
let botonesAtaque = [];
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
    constructor(nombre, minuscula, foto, vida) {
      this.nombre = nombre;
      this.minuscula = minuscula;
      this.foto = foto;
      this.vida = vida;
      this.ataques = [];
    }
}

let hipodoge = new Mokepon('Hipodoge', 'hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5);
let capipepo = new Mokepon('Capipepo', 'capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5);
let ratigueya = new Mokepon('Ratigueya', 'ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5);

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-tierra'},
)

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
    sectionReiniciarJuego.style.display = "none";
    sectionSeleccionarAtaque.style.display = "none";

    mokepones.forEach((animalitos) => {
        opcionMokepones = `
        <input type="radio" name="mascota" id=${animalitos.nombre}>
        <label for=${animalitos.nombre} class="tarjetas-mokepon">
            <p>${animalitos.nombre}</p>
            <img src=${animalitos.foto} alt=${animalitos.nombre} >
        </label>`

        contenedorTarjetas.innerHTML += opcionMokepones;

    })

    inputHipodoge = document.getElementById("Hipodoge");
    inputCapipepo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");
    
    botonSeleccionarM.addEventListener("click", seleccionarMascota);
 
    botonReiniciar.addEventListener("click", reiniciarJuego);    
}
    
function seleccionarMascota() {
    sectionSeleccionarMascota.style.display = "none";    
    sectionSeleccionarAtaque.style.display = "flex";
        
    let mascotaSeleccionada = false;

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id;
        mascotaSeleccionada = true;
        mokeponJugador = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id;
        mascotaSeleccionada = true;
        mokeponJugador = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id;
        mascotaSeleccionada = true;
        mokeponJugador = inputRatigueya.id;
    }

    if (mascotaSeleccionada) {
        seleccionarMascotaEnemigo();
        extraerAtaques(mokeponJugador);
    } else {
        alert("No has elegido a ninguna mascota");
        sectionSeleccionarMascota.style.display = "flex";
        sectionSeleccionarAtaque.style.display = "none";
    }
}

function extraerAtaques(param) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if(param === mokepones[i].nombre) {
            ataques = mokepones[i].ataques;
        }
    }
    mostratAtaques(ataques);
}

function seleccionarMascotaEnemigo() {
    let mascotaEnemigoAleatorio = aleatorio(0, mokepones.length - 1);
    
    spanMascotaEnemigo.innerHTML = mokepones[mascotaEnemigoAleatorio].nombre;
    secuenciaAtaque()
}

function mostratAtaques(param) {
    param.forEach((animalitos) => {
        ataquesMokepon = `
        <button id=${animalitos.id} class="botones-ataque BAtaque">${animalitos.nombre}</button>`
        botonesContainer.innerHTML += ataquesMokepon;
    })

    botonFuego = document.getElementById("boton-fuego");
    botonAgua = document.getElementById("boton-agua");
    botonTierra = document.getElementById("boton-tierra");
    botonesAtaque = document.querySelectorAll('.BAtaque');

    botonFuego.addEventListener("click", ataqueFuego)
    botonAgua.addEventListener("click", ataqueAgua);
    botonTierra.addEventListener("click", ataqueTierra);
}

function secuenciaAtaque() {
    botonesAtaque.forEach((boton) => {
        boton.addEventListener('click', (e)=>{
            console.log(e);
        })
    })
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