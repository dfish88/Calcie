const operators = {
    '+' : (a,b) => a+b,
    '–' : (a,b) => a-b,
    '×' : (a,b) => a*b,
    '÷' : (a,b) => b === 0 ? undefined : a/b
}

var replace = true;

const ui = {
    lowerDisplay : document.querySelector('.lower'),
    upperDisplay : document.querySelector('.upper'),
    digitButton : document.querySelectorAll('.digit'),
    operatorButton : document.querySelectorAll('.operator')
}

function operate(operator, a, b){
    return operators[operator](a,b);
}

function operatorClick(operator){
    let operand = ui.lowerDisplay.textContent.match(/[0-9]+/g).map( (s) => parseInt(s))[0];
    let results = operand;

    if (!replace && ui.upperDisplay.textContent){
        let a = ui.upperDisplay.textContent.match(/[0-9]+/g).map( (s) => parseInt(s))[0];
        let op = ui.upperDisplay.textContent.slice(-1);
        results = operate(op, a, operand);
        ui.lowerDisplay.textContent = results;
    }
    ui.upperDisplay.textContent = results + operator;
    replace = true
}

function digitClick(digit){
    ui.lowerDisplay.textContent = replace ? digit : ui.lowerDisplay.textContent + digit;
    replace = false;
}

function setupDigitButtons(){
    ui.digitButton.forEach( (button) =>{
        button.addEventListener('click', (e) => {
            digitClick(e.target.textContent);
        });
    });
}

function setupOperatorButtons(){
    ui.operatorButton.forEach( (button) =>{
        button.addEventListener('click', (e) => {
            operatorClick(e.target.textContent);
        });
    });

}

function setup(){
    setupDigitButtons();
    setupOperatorButtons();
}

setup();