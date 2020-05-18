import { interpreter, parse, unParse } from '@pounce-lang/core';

const stackEle = document.querySelector('#stack');
const programEle = document.querySelector('#program');
let interp;

// create an interpreter to run the Pounce program
export default function repl(pounceProgram, debug = true) {
    cleanStart(stackEle);
    cleanStart(programEle);

    interp = interpreter(parse(pounceProgram), undefined, { debug });
    window.requestAnimationFrame(step);
};

const step = () => {
    let result = interp.next();

    let newStEle = document.createElement('div');
    newStEle.innerText = result.value.stack.length ? unParse(result.value.stack) : "/empty stack/";
    stackEle.appendChild(newStEle);

    let newPrEle = document.createElement('div');
    newPrEle.innerText = unParse(result.value.prog);
    programEle.appendChild(newPrEle);

    if (result.value.active) {
        window.requestAnimationFrame(step);
    }
};

const cleanStart = domEle => {
    while (domEle.firstChild) {
        domEle.firstChild.remove();
    }
}