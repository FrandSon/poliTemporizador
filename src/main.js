// Variables globales
let seconds = 0; 
let tens = 0; 
let interval;

// Elementos del DOM
const appendTens = document.getElementById('tens');
const appendSeconds = document.getElementById('seconds');
const buttonStart = document.getElementById('button-start');
const buttonStop = document.getElementById('button-stop');
const buttonReset = document.getElementById('button-reset');

// Función para formatear números con ceros a la izquierda
function formatTime(time) {
    return time < 10 ? '0' + time : time.toString();
}

// Función del temporizador
function startTimer() {
    tens++;
    
    if (tens > 99) {
        seconds++;
        tens = 0;
    }
    
    // Actualizar la pantalla
    appendTens.textContent = formatTime(tens);
    appendSeconds.textContent = formatTime(seconds);
}

// Event Listeners
buttonStart.addEventListener('click', function() {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
    
    // Cambiar estado visual de los botones
    buttonStart.style.opacity = '0.6';
    buttonStop.style.opacity = '1';
    buttonReset.style.opacity = '1';
});

buttonStop.addEventListener('click', function() {
    clearInterval(interval);
    
    // Cambiar estado visual de los botones
    buttonStart.style.opacity = '1';
    buttonStop.style.opacity = '0.6';
});

buttonReset.addEventListener('click', function() {
    clearInterval(interval);
    tens = 0;
    seconds = 0;
    
    // Actualizar la pantalla
    appendTens.textContent = '00';
    appendSeconds.textContent = '00';
    
    // Resetear estado visual de los botones
    buttonStart.style.opacity = '1';
    buttonStop.style.opacity = '1';
    buttonReset.style.opacity = '1';
});

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('PoliTemporizador inicializado correctamente');
    
    // Estado inicial de los botones
    buttonStop.style.opacity = '0.6';
});

// Atajos de teclado
document.addEventListener('keydown', function(event) {
    switch(event.code) {
        case 'Space':
            event.preventDefault();
            if (interval) {
                buttonStop.click();
            } else {
                buttonStart.click();
            }
            break;
        case 'KeyR':
            event.preventDefault();
            buttonReset.click();
            break;
    }
});
