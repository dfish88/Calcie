const regexDecimal = /[-]*[0-9]+[.]*[0-9]*/g;
const maxDigits = 16;
const expDigits = 8;
const roundConstant = 1000000000000;

const ui = {
    lowerDisplay : document.querySelector('.lower'),
    upperDisplay : document.querySelector('.upper'),
    digitButton : document.querySelectorAll('.digit'),
    operatorButtons : document.querySelectorAll('.operator'),
    equalButton : document.querySelector('.equals'),
    clearButton : document.querySelector('.clear'),
    deleteButton : document.querySelector('.delete'),
    decimalButton : document.querySelector('.decimal'),
    signButton : document.querySelector('.sign')
}

const operators = {
    '+' : (a,b) => a+b,
    '–' : (a,b) => a-b,
    '×' : (a,b) => a*b,
    '÷' : (a,b) => b === 0 ? undefined : a/b,
    '^' : (a,b) => Math.pow(a,b)
}

const calculation ={
    a : null,
    b : null,
    op : ''
}

const keys = {
    '0' : () => digitClick('0'),
    '1' : () =>  digitClick('1'),
    '2' : () =>  digitClick('2'),
    '3' : () =>  digitClick('3'),
    '4' : () =>  digitClick('4'),
    '5' : () =>  digitClick('5'),
    '6' : () =>  digitClick('6'),
    '7' : () =>  digitClick('7'),
    '8' : () =>  digitClick('8'),
    '9' : () =>  digitClick('9'),

    '.' : () =>  decimalClick(),

    '+' : () =>  operatorClick('+'),
    '*' : () =>  operatorClick('×'),
    '/' : () =>  operatorClick('÷'),
    '-' : () =>  operatorClick('-'),
    '^' : () =>  operatorClick('^'),

    'Enter' : () =>  equalsClick(),
    'Backspace' : () => clearClick()
}

var waitingForDigit = true; // Flag to allow operator buttons to replace current operator
var equalsRepeat = false; // Flag to allow equals button to repeat operation

/* SETUP FUNCTIONS */

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
        clearClick();
    });
}

function setupDecimalButton(){
    ui.decimalButton.addEventListener('click', () =>{
        decimalClick();
    });
}

function setupSignButton(){
    ui.signButton.addEventListener('click', () =>{
        if (ui.lowerDisplay.textContent != 0) ui.lowerDisplay.textContent =  '-' + ui.lowerDisplay.textContent;
    });
}

function setupKeys(){
    document.addEventListener('keydown', (e) => {
        let func = keys[e.key];
        if (func) func();
    });
}

function start(){
    setupDigitButtons();
    setupOperatorButtons();
    setupEqualsButton();
    setupClearButton();
    setupDecimalButton();
    setupSignButton();
    setupKeys();
}

/* HELPER FUNCTIONS FOR BUTTON CLICK LISTENERS */
function formatLargeNumber(bigNum){
    return bigNum >= roundConstant ? bigNum.toExponential(expDigits) : bigNum;
}

function operate(operator, a, b){
    return Math.round(operators[operator](a,b) * roundConstant) / roundConstant;
}

function getOperand(){
    return ui.lowerDisplay.textContent.match(regexDecimal).map( (s) => parseFloat(s))[0];
}

/* LISTENER FUNCTIONS FOR BUTTON CLICKS */

function clearClick(){
    ui.lowerDisplay.textContent = 0;
    ui.upperDisplay.textContent = '';
    calculation.a = null;
    calculation.b = null;
    calculation.op = '';
    waitingForDigit = true;
}

function decimalClick(){
    ui.lowerDisplay.textContent = ui.lowerDisplay.textContent + '.';
    waitingForDigit = false;
}

function operatorClick(operator){
    if (!calculation.a || equalsRepeat){
        calculation.a = getOperand();
        calculation.op = operator;
        equalsRepeat = false;
    }
    else{

        // Replace operator if pressed when expecting second operand
        if(waitingForDigit){
            calculation.op = operator;
        }
        else{
            calculation.b = getOperand();
            let results = operate(calculation.op, calculation.a, calculation.b);

            // Divid by 0
            if (isNaN(results)){
                clearClick();
                return;
            }

            ui.lowerDisplay.textContent = formatLargeNumber(results);
            calculation.a = results;
            calculation.op = operator;
        }

    }
    ui.upperDisplay.textContent = formatLargeNumber(calculation.a) + calculation.op;
    waitingForDigit = true
}

function digitClick(digit){
    if (equalsRepeat){
        ui.upperDisplay.textContent = '';
        ui.lowerDisplay.textContent = '';
        calculation.a = null;
        calculation.b = null;
        calculation.op = null;
        equalsRepeat = false;
    }
    ui.lowerDisplay.textContent = waitingForDigit ? digit : (ui.lowerDisplay.textContent + digit).slice(0, maxDigits);
    waitingForDigit = false;
}

function equalsClick(){
    if (!calculation.a) return;

    if(!equalsRepeat){
        calculation.b = getOperand();
        calculation.op = ui.upperDisplay.textContent.slice(-1);
        equalsRepeat = true;
    }

    let results = operate(calculation.op, calculation.a, calculation.b);
    // Divid by 0
    if (isNaN(results)){
        clearClick();
        return;
    }
    ui.upperDisplay.textContent = formatLargeNumber(calculation.a) + calculation.op + formatLargeNumber(calculation.b) + '=';
    ui.lowerDisplay.textContent = formatLargeNumber(results);
    calculation.a = results;
}

start();