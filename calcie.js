const add = { operation : (a,b) => a+b };
const sub = { operation : (a,b) => a-b };
const mult = { operation : (a,b) => a*b };
const div = { operation : (a,b) => b === 0 ? undefined : a/b };

function operate(operateObject, a, b){
    return operateObject.operation(a,b);
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

function setup(){
    setupDigitButtons();
}

setup();