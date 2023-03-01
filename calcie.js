const operators = {
    '+' : (a,b) => a+b,
    '–' : (a,b) => a-b,
    '×' : (a,b) => a*b,
    '÷' : (a,b) => b === 0 ? undefined : a/b
}

var replace = true;
var equals = false;

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
    equalButton : document.querySelector('.equals')
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
    if (equals){
        ui.upperDisplay.textContent = '';
        ui.lowerDisplay.textContent = '';
        equals = false;
        currentCalculation.a = null;
        currentCalculation.b = null;
        currentCalculation.op = null;
    }
    ui.lowerDisplay.textContent = replace ? digit : ui.lowerDisplay.textContent + digit;
    replace = false;
}

function equalsClick(){
    if(!equals){
        currentCalculation.a = ui.upperDisplay.textContent.match(/[0-9]+/g).map( (s) => parseInt(s))[0];
        currentCalculation.b = ui.lowerDisplay.textContent.match(/[0-9]+/g).map( (s) => parseInt(s))[0];
        currentCalculation.op = ui.upperDisplay.textContent.slice(-1);
    }

    let results = operate(currentCalculation.op, currentCalculation.a, currentCalculation.b);
    ui.upperDisplay.textContent = currentCalculation.a + currentCalculation.op + currentCalculation.b + '='
    ui.lowerDisplay.textContent = results;
    currentCalculation.a = results;
    equals = true;
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

function setup(){
    setupDigitButtons();
    setupOperatorButtons();
    setupEqualsButton();
}

setup();