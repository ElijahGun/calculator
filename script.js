const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const prevNum = document.querySelector('[data-previous-operand]');
const curNum = document.querySelector('[data-current-operand]');
var operator = undefined;
var calculation = '';
var ready2Cal = false;
var humanInput = false;
var secondNumInput = false;
var loadedOperator ='';

function clear() {
  prevNum.innerText = '';
  curNum.innerText = '';
  operator = undefined;
  ready2Cal = false;
  secondNumInput = false;
  humanInput = false;
}

function deleteNum() {
  curNum.innerText = curNum.innerText.toString().slice(0, -1);
}

function appendNum(num) {
  if (num === '.' && curNum.innerText.includes('.')) return;
  curNum.innerText = curNum.innerText + num.toString();
}

function compute() {
  if (prevNum.innerText == '' && curNum.innerText == '') return; //wont allow operators showing up by themselves when no number
  
  // if statement that computes a ready state
  if (prevNum.innerText !== '' && curNum.innerText !== '') {
    loadedOperator = prevNum.innerText.slice(-1);
        
    //switch statement responsible for seeing the last operator and using it for a calculation when fields are full and new operator is pressed.
    switch (loadedOperator) {
      case '+':
        prevNum.innerText = parseFloat(prevNum.innerText) + parseFloat(curNum.innerText) + ' ' + operator.toString();
        curNum.innerText = '';
        break;
      case '-':
        prevNum.innerText = parseFloat(prevNum.innerText) - parseFloat(curNum.innerText) + ' ' + operator.toString();
        curNum.innerText = '';
        break;
      case '*':
        prevNum.innerText = parseFloat(prevNum.innerText) * parseFloat(curNum.innerText) + ' ' + operator.toString();
        curNum.innerText = '';
        break;
      case '÷':
        prevNum.innerText = parseFloat(prevNum.innerText) / parseFloat(curNum.innerText) + ' ' + operator.toString();
        curNum.innerText = '';
        break;
      default:
        break;
    }
    humanInput = true;
  }

  if (humanInput == false) {
    prevNum.innerText = `${curNum.innerText} ${operator}`;
    curNum.innerText = '';
    console.log(loadedOperator);
    }
  
}


//Event Listeners-----------------------------

numberButtons.forEach((button) => {
  button.addEventListener('click', function () {
    appendNum(button.innerText);
  });
});

allClearButton.addEventListener('click', function () {
  clear();
});

deleteButton.addEventListener('click', function () {
  deleteNum();
});

equalsButton.addEventListener('click', function () {
  compute();
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', function () {
    operator = button.innerText.toString();
    compute();
  });
});
