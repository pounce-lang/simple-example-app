import { purr, parse, unParse } from '@pounce-lang/core';

const stackEle = document.querySelector('#stack');
const programEle = document.querySelector('#program');
let interp;

// create an interpreter to run the Pounce program
export default function repl(pounceProgram, debug = true) {
    cleanStart(stackEle);
    cleanStart(programEle);

    interp = purr(parse(pounceProgram), undefined, { debug });
    window.requestAnimationFrame(step);
};

const step = () => {
    let result = interp.next();

    let newStEle = document.createElement('div');
    newStEle.innerText = result.value[0].length ? unParse(result.value[0]) : "/empty stack/";
    stackEle.appendChild(newStEle);

    let newPrEle = document.createElement('div');
    newPrEle.innerText = unParse(result.value[1]);
    programEle.appendChild(newPrEle);

    if (result.value[2]) {
        window.requestAnimationFrame(step);
    }
};

const cleanStart = domEle => {
    while (domEle.firstChild) {
        domEle.firstChild.remove();
    }
}