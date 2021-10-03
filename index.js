const nums = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.ops')
const dot = document.querySelector('.dot');
const numDel = document.querySelector('.del');
const equals = document.querySelector('.equals');
const reset = document.querySelector('.reset');
const resultNum = document.querySelector('.result-num');

let num = null;
let arrOp = []; //array for operations
let total = null;

//iterating through the nodelist of numbers to make them clickable and show them on display
for (let i = 0; i < nums.length; i++) {
    resultNum.textContent = 0;
    num = resultNum.textContent;

    nums[i].addEventListener('click', () => {
        num = nums[i].textContent;
        resultNum.textContent = num
        arrOp.push(num)
        resultNum.textContent = arrOp.join('');
    })
}

dot.addEventListener('click', () => {
    if (arrOp[arrOp.length - 1] === num ) {
        console.log('dot')
        arrOp.push(dot.textContent)
    }
    resultNum.textContent = arrOp.length > 0 ? arrOp.join('') : 0;
})

//outputting result by showing it on display and pushing the total in the array to make other operations
function outputResult() {
    resultNum.textContent = eval(resultNum.textContent)
    total = eval(resultNum.textContent)
    resultNum.textContent = String(total).includes(dot.textContent) ? total.toFixed(2) : total
    if (total) {
        arrOp = []
        arrOp.push(String(total))
    }
}

//iterating through the nodelist of operators and show them on display
for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', () => {
        const op = operators[i].textContent

        //avoid having multiple operators one after the other

        if ((!arrOp.includes(op) && arrOp.length === 0) || (!arrOp.includes(op) && arrOp[arrOp.length - 1] === num || !arrOp.includes(op) && arrOp[arrOp.length - 1].includes(total)) || (arrOp.includes(op) && arrOp[arrOp.length - 1] === num)) {
            arrOp.push(op)
        }
        resultNum.textContent = arrOp.join('')
    })
}

function resetResult() {
    arrOp = []
    resultNum.textContent = 0
}

//delete nums starting from the last one and show the array on display if it is > 0, otherwise show 0
function deleteNum() {
    arrOp.splice(-1, 1);
    resultNum.textContent = (arrOp.length > 0 ? arrOp.join('') : 0)
}

equals.addEventListener('click', outputResult)
reset.addEventListener('click', resetResult)
numDel.addEventListener('click', deleteNum)