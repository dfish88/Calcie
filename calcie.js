const operators = {
    '+' : (a,b) => a+b,
    '–' : (a,b) => a-b,
    '×' : (a,b) => a*b,
    '÷' : (a,b) => b === 0 ? undefined : a/b
}

const ui = {
    display : document.querySelector('.display'),
    digitButton : document.querySelectorAll('.digit'),
    operatorButton : document.querySelectorAll('.operator')
}

function operate(operator, a, b){
    return operators[operator](a,b);
}

function operatorClick(operator){
    // replace operator on screen if operators are clicked consecutively
    let justDigits = ui.display.textContent.match(/[0-9]+/)[0];
    ui.display.textContent = justDigits + operator;
}

function digitClick(digit){
    ui.display.textContent = ui.display.textContent + digit;
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