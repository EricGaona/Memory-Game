$(document).ready(function () {

    $("#cronometro").addClass("green");
});

const arrayMemoria = ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5", "6", "6"];

var valor_memoria = [];
var memoria_carta_ids = [];
var virada_carta = 0;

// Funcion tiempo en segundos

var seg = 25;
var timer

function restar() {
    timer = setInterval(function () {
        seg = seg - 1;
        //                
        if (seg >= 0) {
            $("#cronometro").html(seg);
        } else {
            alert("Sorry You Lost. Start Again");
            clearInterval(timer);
            virada_carta = 0;
            nuevaTabla();
            $("#borde").show();
            $("#cronometro").html("25");
            $("#cronometro").removeClass("red");
            $("#cronometro").addClass("green");
            seg = 25;
        }
        if (seg >= 6 && seg <= 15) {
            $("#cronometro").removeClass("green");
            $("#cronometro").addClass("yellow");
        } else if (seg >= 0 && seg <= 5) {
            $("#cronometro").removeClass("yellow");
            $("#cronometro").addClass("red");
        }

    }, 1000);

}


$('#start').on("click", function () {
    if (seg === 25) {
        $("#cronometro").addClass("green");
        $("#borde").hide();
        restar();
    }
});

// Metodo Fisher-Yates para mezclar un array
Array.prototype.memoriaCartaEmbarajar = function () {
    var i = this.length;
    var indiceAleatorio;
    var valorTemporal;
    while (--i > 0) {
        indiceAleatorio = Math.floor(Math.random() * (i + 1));
        valorTemporal = this[indiceAleatorio];
        this[indiceAleatorio] = this[i];
        this[i] = valorTemporal;
    };
};

// Funcion para crear un nuevo tablero
function nuevaTabla() {
    var output = "";
    arrayMemoria.memoriaCartaEmbarajar();

    for (var i = 0; i < arrayMemoria.length; i++) {
        output += '<div id="carta_' + i + '" onclick="virarCartaMemoria(this,\'' + arrayMemoria[i] + '\')"></div>';
    }
    document.getElementById('table_memoria').innerHTML = output;

    valor_memoria = [];
    memoria_carta_ids = [];
    var virada_carta = 0;

}

// Funcion del Juego
function virarCartaMemoria(carta, valor) {

    if (carta.innerHTML == "" && valor_memoria.length < 2) {
        carta.style.background = '#fff';
        carta.innerHTML = valor;
        // Codigo a ejecutar al dar vuelta la primera carta
        if (valor_memoria.length === 0) {
            valor_memoria.push(valor);
            memoria_carta_ids.push(carta.id);
            // Codiga a ejecuatra al dar vueta la seganda carta    
        } else if (valor_memoria.length === 1) {
            valor_memoria.push(valor);
            memoria_carta_ids.push(carta.id);
            if (valor_memoria[0] === valor_memoria[1]) {
                virada_carta += 2;
                // despejando los dos Arrays
                valor_memoria = [];
                memoria_carta_ids = [];
                // chekea si la mesa entera esta despejada
                if (virada_carta === arrayMemoria.length) {
                    // XXXXXXXX      AQUI TENGO QUE PARAR EL RELOJ     XXXXXXXX

                    setTimeout(function () {
                        alert("Congratulations You Won !!!. Play Again");
                        clearInterval(timer);
                        document.getElementById('table_memoria').innerHTML = "";
                        seg = 25;
                        $("#borde").show();
                        $("#cronometro").html("25");
                        $("#cronometro").removeClass("yellow");
                        $("#cronometro").removeClass("red");
                        $("#cronometro").addClass("green");
                        valor_memoria = [];
                        memoria_carta_ids = [];
                        virada_carta = 0;
                        nuevaTabla();

                    }, 100);


                }
            } else {
                function virarAtras() {
                    // las dos cartas se van a virar
                    var carta_1 = document.getElementById(memoria_carta_ids[0]);
                    var carta_2 = document.getElementById(memoria_carta_ids[1]);
                    carta_1.style.background = '#169B62';
                    carta_1.innerHTML = "";
                    carta_2.style.background = '#169B62';
                    carta_2.innerHTML = "";
                    // despejando los dos Arrays
                    valor_memoria = [];
                    memoria_carta_ids = [];
                }
                setTimeout(virarAtras, 700);
            }
        }
    }
}

nuevaTabla();