var palabras = [
    ["Huelva", "Sevilla", "Cordoba", "Cadiz", "Jaen", "Granada", "Malaga", "Almeria"], 
    ["Futbol", "Baloncesto", "Beisbol", "Golf", "Padel", "Billar"], 
    ["Coche", "Motocicleta", "Avion", "Barco", "Seat Panda"],
    ["Brainfuck", "Malbolge", "Piet", "Ook", "Whitespace"]
], estado = false, palabra = "", mascara = "";

window.onload = () => {
    cambiarEstadoTeclado();
};

function empezarJuego() {
    estado = true;
    document.getElementById("empezar").setAttribute("disabled", null);
    document.getElementById("imagen").src = "assets/img/ahorca.png";

    let cat = document.getElementById("cat").selectedIndex;
    let masc = document.getElementById("mascara");
    masc.removeAttribute("style");

    let valorEscogido = parseInt(Math.random() * palabras[cat].length);

    palabra = palabras[cat][valorEscogido];
    mascara = "";

    for (letra of palabra) {
        if (letra === " ") {
            mascara += " ";
        } else {
            mascara += "_";
        }
    }

    masc.innerText = mascara;

    cambiarEstadoTeclado();
}

function intentaLetra(letraEscogida) {
    if (estado) {
        letraEscogida.className = "disabled";
        let letraAProbar = letraEscogida.innerText, posProbada = 0, coincidencias = [], fallo = true;

        for (letra of palabra) {
            if (letra.toLowerCase() === letraAProbar) {
                coincidencias.push([letra, posProbada]); 
                fallo = false;
            }
            posProbada++;
        }

        if (fallo) {
            siguienteImagen();
        } else {
            actualizaMascara(coincidencias);
        }
        compruebaEstado();
    }
}

function siguienteImagen() {
    let imagen = document.getElementById("imagen");

    if (imagen.src.endsWith("ahorca.png")) {
        imagen.src = "assets/img/ahorca_p1.png";
    } else {
        let pos = +imagen.src.charAt(imagen.src.indexOf(".") - 1);
        pos++;
        imagen.src = "assets/img/ahorca_p" + pos + ".png";
    }
}

function compruebaEstado() {
    let imagen = document.getElementById("imagen");

    if (!imagen.src.endsWith("ahorca.png")) {
        let pos = +imagen.src.charAt(imagen.src.indexOf(".") - 1);
        if (pos === 6) {
            terminaJuego(false);
        }
    } else if (mascara === palabra) {
        terminaJuego(true);
    }
}

function terminaJuego(bandera) {
    let mascara = document.getElementById("mascara");
    
    if (bandera) {
        mascara.innerText = "¡Has ganado! ¡" + palabra + " es la palabra oculta!";
        mascara.style = "color: green;";        
    } else {
        mascara.innerText = "¡Has perdido! La palabra oculta era " + palabra + "!";
        mascara.style = "color: red";
    }
    
    estado = false;
    document.getElementById("empezar").removeAttribute("disabled");
    cambiarEstadoTeclado();
}

function actualizaMascara(coincidencias) {
    for (coincidencia of coincidencias) {
        mascara = setCharAt(mascara, coincidencia[1], coincidencia[0]);
    }

    let msc = document.getElementById("mascara");

    msc.innerText = mascara;
}

function cambiarEstadoTeclado() {
    let teclado = estado ? "active" : "disabled";

    let filasTeclado = document.getElementsByClassName("fila");

    for (fila of filasTeclado) {
        for (tecla of fila.children) {
            tecla.className = teclado;
        }
    }
}

function setCharAt(string, indice, caracter) {
    if(indice > string.length-1) return string;
    return string.substr(0,indice) + caracter + string.substr(indice+1);
}