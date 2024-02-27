let colorSeleccionado;
let coloresDisponibles = ["green", "blue", "red", "yellow", "orange", "pink", "saddlebrown", "black", "blueviolet", "grey"];

let coloresParaSeleccion = coloresDisponibles.slice();

$(()=>{
    
    crearCuerpo();     
    $("#btnEscuchar").on("click",()=>{
        comenzar();
    });
    
    $("#btnRepetir").on("click",()=>{
        location.href=location.href;
    });

});

function comenzar() {        
    seleccionarYEliminarColorAleatorio();    
}

function mostrarColores() {
    let colores = document.querySelectorAll(".green, .blue, .red, .yellow, .orange, .pink, .saddlebrown, .black, .blueviolet, .grey");
    colores.forEach(function(color) {
        color.style.display = "block";
    });
}

function crearCuerpo() {
    let contenedor = document.querySelector(".juego");

    let contenedorColores = document.createElement("div");
    contenedorColores.className = "circle-container";
    let colores = ["green", "blue", "red", "yellow", "orange", "pink", "saddlebrown", "black", "blueviolet", "grey"]; 

    for (let i = 0; i < 10; i++) {
        let circle = document.createElement("div"); 
        circle.className = colores[i]; 
        circle.classList.add("colores");
        circle.style.cursor = "pointer";
        circle.style.borderRadius = "50%";
        circle.style.width = "140px";
        circle.style.height = "140px";
        circle.style.backgroundColor = colores[i];

        circle.addEventListener("click", function() {            
            borrarColor(colores[i], this); 
        });

        contenedorColores.appendChild(circle);
    }
    contenedor.appendChild(contenedorColores);
}

function obtenerIndiceAleatorio(array) {
    return Math.floor(Math.random() * array.length);
}


function seleccionarYEliminarColorAleatorio() {
    if (coloresParaSeleccion.length === 0) {
        alert("Ya se han seleccionado todos los colores.");
        return;
    }else{

        if(colorSeleccionado){
            let audioElement = document.getElementById(colorSeleccionado + "Audio");
            audioElement.play(); 
        }else{
            let indiceAleatorio = obtenerIndiceAleatorio(coloresParaSeleccion);
            colorSeleccionado = coloresParaSeleccion[indiceAleatorio]; 
            let audioElement = document.getElementById(colorSeleccionado + "Audio");
            audioElement.play(); 
            coloresParaSeleccion.splice(indiceAleatorio, 1);
        }
    }

    
}

function borrarColor(color, elemento) {
    if (color === colorSeleccionado) {
        if (elemento) {
            elemento.style.display = "none"; 
                colorSeleccionado="";
            if (coloresParaSeleccion.length === 0) {
                $("#btnEscuchar").hide();
                Swal.fire({
                    title: "Felicidades",
                    text: "Identificastes todos los colores.",
                    icon: "success"
                  });             
            }            
        }
    }else{
        Swal.fire({
            title: "Color incorrecto",
            text: "Escoje el color correcto.",
            icon: "error"
          });
    }
}
