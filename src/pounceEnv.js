import { purr, pinna } from '@pounce-lang/core';

var stackEle = document.querySelector('#stack');
var programEle = document.querySelector('#program');

const interp = purr(pinna("2 dup + dup + dup + dup + dup + dup +"), undefined, {debug:true});
export default function repl() {
    let result = interp.next();
    stackEle.textContent = result.value[0];
    programEle.textContent = result.value[1];
    if (result.value[2]) {
        setTimeout(repl, 1000);
    }
};
