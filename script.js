const calculator = document.querySelector('.calculator')
const result = calculator.querySelector('.result')
const buttons = calculator.querySelectorAll('button:not(#power)')
const powerButton = calculator.querySelector('#power')

let firstNumber = ''
let operator = ''
let secondNumber = ''
let calculatorOn = true;

powerButton.addEventListener('click', () => {
  calculatorOn = !calculatorOn;
  if (!calculatorOn) {
    result.value = '';
    result.style.backgroundColor = '#d1d1d1';
  } 
  if (calculatorOn) {
  result.value = '';
    result.style.backgroundColor = '#fff';
  }  
});


buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (!calculatorOn) {
      return;
    } 
    if (button.textContent === 'AC') {
      // reset the calculator
      firstNumber = '';
      operator = '';
      secondNumber = '';
      result.value = '';
    } else if (button.textContent === '+/-') {
      // negate the current number
      if (result.value == '') {
        return;
      } 
      result.value = parseFloat(result.value) * -1;
      if (!operator) {
        firstNumber = result.value;
      } else {
        secondNumber = result.value;
      }
    } else if (button.textContent === '.') {
       // add a decimal point to the current number
      const lastChar = result.value.slice(-1);
      if (lastChar !== '.') {
        result.value += '.';
        if (!operator) {
          firstNumber += '.';
        } else {
          secondNumber += '.';
      }
    }
    } else if (button.textContent === 'DEL') {
      // delete the last character from the current number
      result.value = result.value.slice(0, -1);
      if (!operator) {
        firstNumber = firstNumber.slice(0, -1);
      } else {
        secondNumber = secondNumber.slice(0, -1);
      }
    } else if (button.textContent.match(/[0-9]/)) {
      // append the pressed digit to the current number
      if (!operator) {
        // Check if adding the digit would cause an overflow
        if (parseFloat(firstNumber + button.textContent) > 999999999999999) {
          result.value = 'OVERFLOW';
          return;
        }
        firstNumber += button.textContent;
        result.value += button.textContent;
      } else {
        if (parseFloat(secondNumber + button.textContent) > 999999999999999) {
          result.value = 'OVERFLOW';
          return;
        }
        secondNumber += button.textContent;
        result.value += button.textContent;
      }
    } else if (button.textContent.match(/[\+\-\x\÷]/)) {
      // set the operator
      if (firstNumber && operator && secondNumber) {
        // evaluate the expression if both numbers and an operator are present
        if (operator === '+') {
          result.value = parseFloat(firstNumber) + parseFloat(secondNumber);
        } else if (operator === '-') {
          result.value = parseFloat(firstNumber) - parseFloat(secondNumber);
        } else if (operator === 'x') {
          result.value = parseFloat(firstNumber) * parseFloat(secondNumber);
        } else if (operator === '÷') {
          if (secondNumber == '0') {
            // handle division by zero
            result.value = '-_-';
            return; 
          } else {
            result.value = parseFloat(firstNumber) / parseFloat(secondNumber);
          }
        }
        // round the result to two decimal places
        result.value = Math.round(parseFloat(result.value) * 100) / 100;
        // check if the result is too large
        if (parseFloat(result.value) > 999999999999999) {
          result.value = 'OVERFLOW';
        }
        // set the firstNumber to the result, clear the operator and secondNumber
        firstNumber = result.value;
        operator = '';
        secondNumber = '';
      }  
      operator = button.textContent;
      result.value += button.textContent;
    } else if (button.textContent === '=') {
      // evaluate expression
      if (operator === '+') {
        result.value = parseFloat(firstNumber) + parseFloat(secondNumber);
      } else if (operator === '-') {
        result.value = parseFloat(firstNumber) - parseFloat(secondNumber);
      } else if (operator === 'x') {
        result.value = parseFloat(firstNumber) * parseFloat(secondNumber);
      } else if (operator === '÷') {
        if (secondNumber == '0') {
        result.value = '-_-'
        return; 
        } else result.value = parseFloat(firstNumber) / parseFloat(secondNumber);
      }
      result.value = Math.round(parseFloat(result.value) * 100) / 100;
      if (parseFloat(result.value) > 999999999999999) {
        result.value = 'OVERFLOW';
      }
      firstNumber = result.value;
      operator = '';
      secondNumber = '';
    }
  });
});
