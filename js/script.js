// Seleccionar los elementos del personaje, bloque y contador de obstáculos
var character = document.getElementById("character");
var block = document.getElementById("block");
var obstacleCounter = document.getElementById("obstacle-counter");
var music = document.getElementById('background-music');

// Ajustar el volumen de la música
music.volume = 0.3; // Ajusta el volumen a un 30%

let obstaclesDodged = 0; 
let gameStarted = false; 

// Función para iniciar el juego
function startGame() {
    if (!gameStarted) {
        music.play().catch(error => {
            console.log('No se pudo reproducir la música:', error);
        });
        gameStarted = true; 
    }
}

// Detectar clic para hacer saltar al personaje
document.addEventListener("click", function() {
    startGame(); 
    jump(); 
});
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        startGame(); 
        jump(); 
    }
});

// Función para hacer saltar al personaje
function jump() {
    if (character.classList.contains("animate")) return; 
    character.classList.add("animate");

    setTimeout(() => {
        character.classList.remove("animate");
    }, 1000); 
}

// Verificar colisión entre el personaje y el bloque cada 10ms
var checkCollision = setInterval(() => {
    let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue("bottom"));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));

    // Condición de Game Over
    if (blockLeft < 60 && blockLeft > 40 && characterBottom <= 50) {
        alert("Game Over");
        block.style.animation = "none"; 
        music.pause(); 
        clearInterval(checkCollision);  
        setTimeout(() => location.reload(), 2000); 
    }

    // Incrementar el contador de obstáculos esquivados
    if (blockLeft < 50 && blockLeft > 44) {
        obstaclesDodged++;
        obstacleCounter.textContent = "Obstáculos esquivados: " + obstaclesDodged; 
    }
}, 10);
