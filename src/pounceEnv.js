import { interpreter, parse, unParse } from '@pounce-lang/core';

const stackEle = document.querySelector('#stack');
const programEle = document.querySelector('#program');
let interp;

// create an interpreter to run the Pounce program
export default function repl(pounceProgram, logLevel = 0) {
    cleanStart(stackEle);
    cleanStart(programEle);
    interp = interpreter(pounceProgram, { logLevel });
    window.requestAnimationFrame(step);
};

const STACK_STR_MAX = 54;
const PROG_STR_MAX = 57;

const step = () => {
    let result = interp.next();
    if (!result || !result.value) {
        return;
    }
    let newStEle = document.createElement('div');
    const stackText = result.value.stack.length ? unParse(result.value.stack) : "/empty stack/";
    newStEle.innerHTML = stackText.length > STACK_STR_MAX ? 
    `<dfn><abbr title="${stackText.substr(0, stackText.length-STACK_STR_MAX+3)}">...</abbr></dfn>${stackText.substr((STACK_STR_MAX-3) * -1)}`: stackText;
    stackEle.appendChild(newStEle);

    let newPrEle = document.createElement('div');
    const progText = unParse(result.value.prog);

    newPrEle.innerHTML = progText.length > PROG_STR_MAX ? 
    `${progText.substr(0, PROG_STR_MAX-3)}<dfn><abbr title="${progText.substr((progText.length-PROG_STR_MAX+3) * -1)}">...</abbr></dfn>`: progText;

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