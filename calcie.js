const add = { operation : (a,b) => a+b };
const sub = { operation : (a,b) => a-b };
const mult = { operation : (a,b) => a*b };
const div = { operation : (a,b) => b === 0 ? undefined : a/b };

const ui = {
    display : document.querySelector('.display')
}

function operate(operateObject, a, b){
    return operateObject.operation(a,b);
}

function operatorClick(operator){
    // replace operator on screen if operators are clicked consecutively
    let justDigits = ui.display.textContent.match(/[0-9]+/)[0];
    ui.display.textContent = justDigits + operator;
}

function setupDigitButtons(){
    let digitButton = document.querySelectorAll('.digit');
    let display = document.querySelector('.display');

    digitButton.forEach( (button) =>{
        button.addEventListener('click', (e) => {
            display.textContent = display.textContent + e.target.textContent;
        });
    });
}

function setupOperatorButtons(){
    let operatorButton = document.querySelectorAll('.operator');
    operatorButton.forEach( (button) =>{
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