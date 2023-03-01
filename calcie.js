const ui = {
    lowerDisplay : document.querySelector('.lower'),
    upperDisplay : document.querySelector('.upper'),
    digitButton : document.querySelectorAll('.digit'),
    operatorButtons : document.querySelectorAll('.operator'),
    equalButton : document.querySelector('.equals'),
    clearButton : document.querySelector('.clear'),
    decimalButton : document.querySelector('.decimal')
}

const operators = {
    '+' : (a,b) => a+b,
    '–' : (a,b) => a-b,
    '×' : (a,b) => a*b,
    '÷' : (a,b) => b === 0 ? undefined : a/b
}

const currentCalculation ={
    a : null,
    b : null,
    op : ''
}

const regexDecimal = /[0-9]+[.]*[0-9]*/g;
const maxDigits = 16;
const roundConstant = 1000000000000;

var waitingForDigit = true; // Flag to allow operator buttons to replace current operator
var equalsRepeat = false; // Flag to allow equals button to repeat operation

function operate(operator, a, b){
    return Math.round(operators[operator](a,b) * roundConstant) / roundConstant;
}

function displayUpper(){

}

function displayLower(){

}

function getOperandUpper(){
    return ui.upperDisplay.textContent.match(regexDecimal).map( (s) => parseFloat(s))[0];
}

function getOperandLower(){
    return ui.lowerDisplay.textContent.match(regexDecimal).map( (s) => parseFloat(s))[0];
}

function operatorClick(operator){
    if (!currentCalculation.a){
        currentCalculation.a = getOperandLower();
        currentCalculation.op = operator;
    }
    else{

        // Replace operator if pressed when expecting second operand
        if(waitingForDigit){
            currentCalculation.op = operator;
        }
        else{
            currentCalculation.b = getOperandLower();
            let results = operate(currentCalculation.op, currentCalculation.a, currentCalculation.b);
            ui.lowerDisplay.textContent = results;
            currentCalculation.a = results;
            currentCalculation.op = operator;
        }

    }
    ui.upperDisplay.textContent = currentCalculation.a + currentCalculation.op;
    waitingForDigit = true
}

function digitClick(digit){
    if (equalsRepeat){
        ui.upperDisplay.textContent = '';
        ui.lowerDisplay.textContent = '';
        currentCalculation.a = null;
        currentCalculation.b = null;
        currentCalculation.op = null;
        equalsRepeat = false;
    }
    ui.lowerDisplay.textContent = waitingForDigit ? digit : (ui.lowerDisplay.textContent + digit).slice(0, maxDigits);
    waitingForDigit = false;
}

function equalsClick(){
    if (!currentCalculation.a) return;

    if(!equalsRepeat){
        currentCalculation.a = getOperandUpper();
        currentCalculation.b = getOperandLower();
        currentCalculation.op = ui.upperDisplay.textContent.slice(-1);
        equalsRepeat = true;
    }

    let results = operate(currentCalculation.op, currentCalculation.a, currentCalculation.b);
    ui.upperDisplay.textContent = currentCalculation.a + currentCalculation.op + currentCalculation.b + '='
    ui.lowerDisplay.textContent = results;
    currentCalculation.a = results;
}

function setupDigitButtons(){
    ui.digitButton.forEach( (button) =>{
        button.addEventListener('click', (e) => {
            digitClick(e.target.textContent);
        });
    });
}

function setupOperatorButtons(){
    ui.operatorButtons.forEach( (button) =>{
        button.addEventListener('click', (e) => {
            operatorClick(e.target.textContent);
        });
    });

}

function setupEqualsButton(){
    ui.equalButton.addEventListener('click', (e) => {
        equalsClick();
    })
}

function setupClearButton(){
    ui.clearButton.addEventListener('click', () =>{
        ui.lowerDisplay.textContent = 0;
        ui.upperDisplay.textContent = '';
        currentCalculation.a = null;
        currentCalculation.b = null;
        currentCalculation.op = '';
        waitingForDigit = true;
    });
}

function setupDecimalButton(){
    ui.decimalButton.addEventListener('click', () =>{
        ui.lowerDisplay.textContent = ui.lowerDisplay.textContent + '.';
        waitingForDigit = false;
    });
}

function setup(){
    setupDigitButtons();
    setupOperatorButtons();
    setupEqualsButton();
    setupClearButton();
    setupDecimalButton();
}

setup();