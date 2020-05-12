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

//checks if 'mathSymbol' is a valid math operator in string format.
function isOperator(mathSymbol) {
  if (mathSymbol == '+' || mathSymbol == '-' || mathSymbol == '*' || mathSymbol == '÷' ) {
    return true;
  }
 }

function compute() {
  if (prevNum.innerText == '' && curNum.innerText == '') return; //wont allow operators showing up by themselves when no number
  
  //Captures the operator
  if (prevNum.innerText == '' && curNum.innerText !== '') {
    console.log('condition on line 44 activated');
    loadedOperator = operator;
  }
  console.log(loadedOperator);
  
  //allows operator change when number is loaded on top w other operator
  if (prevNum.innerText != '' && curNum.innerText == '' && isOperator(loadedOperator) && operator != loadedOperator) {
    console.log('condition on line 51 activated');
    loadedOperator = operator; 
    prevNum.innerText = prevNum.innerText.slice(0, -1) + loadedOperator;
    return
  }
  
  // if statement that computes a ready state
  if (prevNum.innerText !== '' && curNum.innerText !== '') {
    loadedOperator = prevNum.innerText.slice(-1);  //!!!!-----the loadedOperator needs to be loaded when curnum IS emmpty!
        console.log('condition on line 58 activated');
        
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
    console.log('condition on line 87 acivated');
    
    prevNum.innerText = `${curNum.innerText} ${operator}`;
    curNum.innerText = '';
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
  curNum.innerText = prevNum.innerText.slice(0, -1);
  prevNum.innerText = '';
  humanInput = false;
});

operatorButtons.forEach((button) => {
  button.addEventListener('click', function () {
    operator = button.innerText.toString();
    compute();
  });
});


