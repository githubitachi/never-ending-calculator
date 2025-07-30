let current = '';
let prev = '';
let operator = '';
let resultDisplayed = false;

const display = document.getElementById('display');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const decimalBtn = document.querySelector('.decimal');
const clearBtn = document.querySelector('[data-action="clear"]');
const backspaceBtn = document.querySelector('[data-action="backspace"]');
const equalsBtn = document.getElementById('equals');

function updateDisplay(value) {
  display.textContent = value;
}

function clearAll() {
  current = '';
  prev = '';
  operator = '';
  updateDisplay('0');
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Nice try!";
  }
  return a / b;
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return b;
  }
}

numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (resultDisplayed) {
      current = '';
      resultDisplayed = false;
    }
    current += button.textContent;
    updateDisplay(current);
  });
});

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    if (current === '' && prev !== '') {
      operator = button.dataset.operator;
      return;
    }
    if (prev !== '') {
      prev = operate(operator, prev, current);
    } else {
      prev = current;
    }
    operator = button.dataset.operator;
    current = '';
    updateDisplay(prev);
  });
});

decimalBtn.addEventListener('click', () => {
  if (!current.includes('.')) {
    current += '.';
    updateDisplay(current);
  }
});

equalsBtn.addEventListener('click', () => {
  if (current === '' || operator === '') return;
  const result = operate(operator, prev, current);
  updateDisplay(isNaN(result) ? result : Math.round(result * 100000) / 100000);
  current = result.toString();
  prev = '';
  operator = '';
  resultDisplayed = true;
});

clearBtn.addEventListener('click', clearAll);

backspaceBtn.addEventListener('click', () => {
  current = current.slice(0, -1);
  updateDisplay(current || '0');
});

// Keyboard support
document.addEventListener('keydown', e => {
  if (!isNaN(e.key)) {
    current += e.key;
    updateDisplay(current);
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    operatorBtns.forEach(btn => {
      if (btn.dataset.operator === e.key) btn.click();
    });
  } else if (e.key === 'Enter') {
    equalsBtn.click();
  } else if (e.key === 'Backspace') {
    backspaceBtn.click();
  } else if (e.key === '.') {
    decimalBtn.click();
  } else if (e.key.toLowerCase() === 'c') {
    clearBtn.click();
  }
});
