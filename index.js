const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const digits = document.querySelectorAll('.digit');
const functions = document.querySelectorAll('.function');

const clear = document.querySelector('.clear');

// Default Screen
let currentVal = '0';
display.innerHTML = Number(currentVal);

let a = 0;
let b = 0;
let ab = 0;
let operation = '';

// Pressing a number key or . key
function showValue (val) {
    let integers = /[0-9]/g;
    if(Number(currentVal) === 0 && integers.test(val) && !currentVal.includes('.')) {
        currentVal = val;
        return display.innerHTML = currentVal;
    } 
    if(currentVal.length >= 11) {
        return display.innerHTML = currentVal;
    }
    if(currentVal.includes('.') && val === '.') {
        return display.innerHTML = currentVal;
    }

    currentVal += val 
    display.innerHTML = currentVal;
};

// Pressing an operation key
function funcProcess(e) {

    if (operation === '') {
        if (e !== '=') {
            a = Number(currentVal.slice());
            operation = e;
            currentVal = '';
            return display.innerHTML = a;
        } else {
            return display.innerHTML = currentVal;
        }
    } else {
        b = Number(currentVal.slice());
        if (operation == '+') {
            ab = Number(a) + Number(b);
            ReadyforNext(ab, e)
            return
        } else if (operation == '-') {
            ab = Number(a) - Number(b);
            ReadyforNext(ab, e)
            return
        } else if (operation == '×') {
            ab = Number(a) * Number(b);
            ReadyforNext(ab, e)
            return
        } else if (operation == '÷') {
            if (b == '0') {
                return display.innerHTML = "Error! >:3c"
            }
            ab = Number(a) / Number(b);
            ReadyforNext(ab, e)
            return
        }
    } 
}

// Setting up stage for next operation
function ReadyforNext(ab, e) {
    if (ab.toString().length >= 11) {
        if (ab < 0 || ab > 1) {
            ab = ab.toExponential(2);
        } else {
            ab = Number.parseFloat(ab).toFixed(9);
        };
    };
    currentVal = ab.toString();
    display.innerHTML = ab;
    a = currentVal;
    if (e !== '=') {
        operation = e;
    } else {
        operation = '';
    }
    currentVal = '';
    return 
}

// addEventListener for digits and function keys
let numPressed = digits.forEach(digit => digit.addEventListener('click', function() {showValue(digit.textContent)}));
let funcPressed = functions.forEach(func => func.addEventListener('click', function() {funcProcess(func.textContent)}));


// Clear button resets all values and returns to default screen
document.querySelector('.clear').addEventListener('click', function() {
    currentVal = '0';
    a = 0;
    b = 0;
    ab = 0;
    operation = '';
    display.innerHTML = Number(currentVal);
});