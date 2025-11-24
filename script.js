let display = document.getElementById('result');
let currentInput = '0';
let shouldResetDisplay = false;

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }

    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '0';
    display.value = currentInput;
}

function deleteLast() {
    if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.includes('-'))) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    display.value = currentInput;
}

function calculate() {
    try {
        // Handle divide by zero
        if (currentInput.includes('/0')) {
            if (currentInput.match(/\/0[^0-9.]/) || currentInput.endsWith('/0')) {
                display.value = "Error: Divide by Zero";
                shouldResetDisplay = true;
                return;
            }
        }

        let result = Function('"use strict"; return (' + currentInput.replace('×', '*') + ')')();
        
        // Round very long decimals
        if (!Number.isInteger(result)) {
            result = parseFloat(result.toFixed(8));
        }

        display.value = result;
        currentInput = result.toString();
        shouldResetDisplay = true;
    } catch (error) {
        display.value = "Error";
        shouldResetDisplay = true;
    }
}

// Keyboard support (Bonus feature)
document.addEventListener('keydown', function(e) {
    if (e.key >= 0 && e.key <= 9) appendToDisplay(e.key);
    if (e.key === '.') appendToDisplay('.');
    if (e.key === '+') appendToDisplay('+');
    if (e.key === '-') appendToDisplay('-');
    if (e.key === '*') appendToDisplay('*');
    if (e.key === '/') appendToDisplay('/');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
});