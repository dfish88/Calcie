const operators = {
    '+' : (a,b) => a+b,
    '–' : (a,b) => a-b,
    '×' : (a,b) => a*b,
    '÷' : (a,b) => b === 0 ? undefined : a/b
}

var replace = true;
var equalsRepeat = false;

const currentCalculation ={
    a : null,
    b : null,
    op : ''
}

const ui = {
    lowerDisplay : document.querySelector('.lower'),
    upperDisplay : document.querySelector('.upper'),
    digitButton : document.querySelectorAll('.digit'),
    operatorButtons : document.querySelectorAll('.operator'),
    equalButton : document.querySelector('.equals'),
    clearButton : document.querySelector('.clear')
}

function operate(operator, a, b){
    return operators[operator](a,b);
}

function operatorClick(operator){
    if (!currentCalculation.a){
        currentCalculation.a = ui.lowerDisplay.textContent.match(/[0-9]+/g).map( (s) => parseInt(s))[0];
        currentCalculation.op = operator;
    }
    else{

        if(replace){
            currentCalculation.op = operator;
        }
        else{
            currentCalculation.b = ui.lowerDisplay.textContent.match(/[0-9]+/g).map( (s) => parseInt(s))[0];
            let results = operate(currentCalculation.op, currentCalculation.a, currentCalculation.b);
            ui.lowerDisplay.textContent = results;
            currentCalculation.a = results;
            currentCalculation.op = operator;
        }

    }
    ui.upperDisplay.textContent = currentCalculation.a + currentCalculation.op;
    replace = true
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
    ui.lowerDisplay.textContent = replace ? digit : ui.lowerDisplay.textContent + digit;
    replace = false;
}

function equalsClick(){
    if (!currentCalculation.a) return;

    if(!equalsRepeat){
        currentCalculation.a = ui.upperDisplay.textContent.match(/[0-9]+/g).map( (s) => parseInt(s))[0];
        currentCalculation.b = ui.lowerDisplay.textContent.match(/[0-9]+/g).map( (s) => parseInt(s))[0];
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
    });
}

function setup(){
    setupDigitButtons();
    setupOperatorButtons();
    setupEqualsButton();
    setupClearButton();
}

setup();