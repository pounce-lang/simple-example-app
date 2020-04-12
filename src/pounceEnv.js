import { purr, parse, unParse } from '@pounce-lang/core';

const stackEle = document.querySelector('#stack');
const programEle = document.querySelector('#program');
let interp;

export default function repl(pl) {
    while (stackEle.firstChild) {
        stackEle.firstChild.remove();
    }
    while (programEle.firstChild) {
        programEle.firstChild.remove();
    }

    interp = purr(parse(pl), undefined, { debug: true });
    repl_aux();
};

const repl_aux = () => {
    let result = interp.next();

    let newStEle = document.createElement('div');
    newStEle.innerText = result.value[0].length ? unParse(result.value[0]) : "/empty stack/";
    stackEle.appendChild(newStEle);

    let newPrEle = document.createElement('div');
    newPrEle.innerText = unParse(result.value[1]);
    programEle.appendChild(newPrEle);

    if (result.value[2]) {
        setTimeout(repl_aux, 0);
    }
};

