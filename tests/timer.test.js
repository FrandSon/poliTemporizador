import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

// Configuración DOM
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
  <div class="timer-display">
    <span id="seconds">00</span><span class="colon">:</span><span id="tens">00</span>
  </div>
  <button id="button-start">Start</button>
  <button id="button-stop">Stop</button>
  <button id="button-reset">Reset</button>
</body>
</html>
`);

global.document = dom.window.document;
global.window = dom.window;

// Importa el módulo
const timerModule = await import('../src/main.js');

describe('PoliTemporizador', () => {
  let appendTens, appendSeconds, buttonStart, buttonStop, buttonReset;

  beforeEach(() => {
    appendTens = document.getElementById('tens');
    appendSeconds = document.getElementById('seconds');
    buttonStart = document.getElementById('button-start');
    buttonStop = document.getElementById('button-stop');
    buttonReset = document.getElementById('button-reset');
    
    // Usa la nueva función para reiniciar
    timerModule.resetTimerState();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    timerModule.resetTimerState();
  });

  test('formato de tiempo muestra ceros iniciales', () => {
    expect(timerModule.formatTime(0)).toBe('00');
    expect(timerModule.formatTime(5)).toBe('05');
    expect(timerModule.formatTime(10)).toBe('10');
    expect(timerModule.formatTime(99)).toBe('99');
  });

  test('el botón Start inicia el cronómetro', () => {
    buttonStart.click();
    vi.advanceTimersByTime(150);
    expect(appendTens.textContent).not.toBe('00');
  });

  test('el botón Stop detiene el cronómetro', () => {
    buttonStart.click();
    vi.advanceTimersByTime(50);
    const currentValue = appendTens.textContent;
    buttonStop.click();
    vi.advanceTimersByTime(100);
    expect(appendTens.textContent).toBe(currentValue);
  });

  test('el botón Reset reinicia el cronómetro', () => {
    buttonStart.click();
    vi.advanceTimersByTime(350);
    buttonReset.click();
    expect(appendSeconds.textContent).toBe('00');
    expect(appendTens.textContent).toBe('00');
  });

  test('los atajos de teclado funcionan', () => {
    // Simula espacio (iniciar)
    const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });
    document.dispatchEvent(spaceEvent);
    vi.advanceTimersByTime(75);
    
    // Verifica que inició
    expect(appendTens.textContent).not.toBe('00');
    const currentValue = appendTens.textContent;
    
    // Simula espacio (detener)
    document.dispatchEvent(spaceEvent);
    vi.advanceTimersByTime(50);
    expect(appendTens.textContent).toBe(currentValue);
    
    // Simula R (reset)
    const rEvent = new KeyboardEvent('keydown', { code: 'KeyR' });
    document.dispatchEvent(rEvent);
    expect(appendSeconds.textContent).toBe('00');
  });
});
