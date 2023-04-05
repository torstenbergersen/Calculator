const calculator = document.querySelector('.calculator')
const result = calculator.querySelector('.result')
const buttons = calculator.querySelectorAll('button')

let firstNumber = ''
let operator = ''
let secondNumber = ''

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent === 'Clear') {
      firstNumber = '';
      operator = '';
      secondNumber = '';
      result.value = '';
    } else if (button.textContent === '+/-') {
      result.value = parseFloat(result.value) * -1;
      if (!operator) {
        firstNumber = result.value;
      } else {
        secondNumber = result.value;
      }
    } else if (button.textContent === '.') {
      if (!result.value.includes('.')) {
        result.value += '.';
        if (!operator) {
          firstNumber += '.';
        } else {
          secondNumber += '.';
        }
      }
    } else if (button.textContent === 'del') {
      result.value = result.value.slice(0, -1);
      if (!operator) {
        firstNumber = firstNumber.slice(0, -1);
      } else {
        secondNumber = secondNumber.slice(0, -1);
      }
    } else if (button.textContent.match(/[0-9]/)) {
      if (!operator) {
        firstNumber += button.textContent;
        result.value += button.textContent;
      } else {
        secondNumber += button.textContent;
        result.value += button.textContent;
      }
    } else if (button.textContent.match(/[\+\-\*\/]/)) {
      operator = button.textContent;
      result.value += button.textContent;
    } else if (button.textContent === '=') {
      if (operator === '+') {
        result.value = parseFloat(firstNumber) + parseFloat(secondNumber);
      } else if (operator === '-') {
        result.value = parseFloat(firstNumber) - parseFloat(secondNumber);
      } else if (operator === '*') {
        result.value = parseFloat(firstNumber) * parseFloat(secondNumber);
      } else if (operator === '/') {
        if (secondNumber == '0') {
        result.value = '-_-'
        } else result.value = parseFloat(firstNumber) / parseFloat(secondNumber);
      }
      result.value = Math.round(parseFloat(result.value) * 100) / 100;
      firstNumber = result.value;
      operator = '';
      secondNumber = '';
    }
  });
});
