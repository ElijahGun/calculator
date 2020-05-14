const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const prevNum = document.querySelector('[data-previous-operand]');
const curNum = document.querySelector('[data-current-operand]');

var operator = undefined;
var humanInput = false;
var loadedOperator ='';

function clear() {
  prevNum.innerText = '';
  curNum.innerText = '';
  operator = undefined;
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
  if (mathSymbol == '+' || mathSymbol == '-' || mathSymbol == '*' || mathSymbol == '÷' || mathSymbol == '/') {
    return true;
  }
 }

 //checks if 'parameter' is a valid . or number.
 function isNumber(x) {
   switch (x) {
     case '1':
       return true;
       break;
     case '2':
       return true;
     case '3':
       return true;
      case '4':
        return true;
      case '5':
        return true;
      case '6':
        return true;
      case '7':
        return true;
      case '8':
        return true;
      case '9':
        return true;
      case '0':
        return true;
      case '.':
        return true;
     default:
       return false;
       break;
   }
 }

function compute() {
  if (prevNum.innerText == '' && curNum.innerText == '') return; //wont allow operators showing up by themselves when no number
  
  //Captures the operator
  if (prevNum.innerText == '' && curNum.innerText !== '') {
    loadedOperator = operator;
    console.log('1 executed');

  }
  
  //allows operator change when number is loaded on top w other operator
  if (prevNum.innerText != '' && curNum.innerText == '' && isOperator(loadedOperator) && operator != loadedOperator) {
    loadedOperator = operator; 
    prevNum.innerText = prevNum.innerText.slice(0, -1) + loadedOperator;
    console.log('line 2 executed');
    return // else if statement below fixes bug when operator pressed twice
  } else if (prevNum.innerText != '' && curNum.innerText == '' && isOperator(loadedOperator) && operator == loadedOperator) {
    humanInput = true;
  }
  
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
      case '/':
        prevNum.innerText = parseFloat(prevNum.innerText) / parseFloat(curNum.innerText) + ' ' + operator.toString();
        curNum.innerText = '';      default:
        break;
    }
    humanInput = true;
    console.log('line 4 executed');
    
  }

  if (humanInput == false) {
    prevNum.innerText = `${curNum.innerText} ${operator}`;
    curNum.innerText = '';   
    console.log('line 5 executed');
     
    }
  
}


//Event Listeners-----------------------------

numberButtons.forEach((button) => {
  button.addEventListener('click', function () {
    appendNum(button.innerText);
  });
});

//event listener for keyboard entry
addEventListener('keydown', function (e) {
  var keyPress = e.key;
  console.log(keyPress.toString());
  if (isOperator(keyPress)) {
    operator = keyPress.toString();
    compute();
  } else if (isNumber(keyPress)) {
    appendNum(keyPress);
  } else if (keyPress == 'Delete') {
    deleteNum();
  } else if (keyPress == 'Backspace') {
    clear()
  } else if (keyPress == 'Enter') {
    compute();
    curNum.innerText = prevNum.innerText.slice(0, -1);
    prevNum.innerText = '';
    humanInput = false;
  }
  
})

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


