import { purr, pinna } from '@pounce-lang/core';

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

    interp = purr(pinna(pl), undefined, { debug: true });
    repl_aux();
};

const repl_aux = () => {
    let result = interp.next();

    let newStEle = document.createElement('div');
    newStEle.innerText = result.value[0].length ? unParse(result.value[0]) + " |" : "|";
    stackEle.appendChild(newStEle);

    let newPrEle = document.createElement('div');
    newPrEle.innerText = unParse(result.value[1]);
    programEle.appendChild(newPrEle);

    if (result.value[2]) {
        setTimeout(repl_aux, 0);
    }
};

function unParse(pl) {
    let ps = '';
    let spacer = '';
    for (let i in pl) {
        if (pl[i] && typeof pl[i] == "object") {
            if (Array.isArray(pl[i])) {
                ps += spacer + '[' + unParse(pl[i]) + ']';
            }
            else {
                ps += spacer + '{' + unParseKeyValuePair(pl[i]) + '}';
            }
        }
        else {
            ps += spacer + pl[i];
        }
        spacer = ' ';
    }
    return ps;
}

function unParseKeyValuePair(pl) {
    let ps = '';
    let spacer = '';
    for (let i in pl) {
        if (pl.hasOwnProperty(i)) {
            if (pl[i] && typeof pl[i] == "object") {
                if (Array.isArray(pl[i])) {
                    ps += spacer + i + ':[' + unParse(pl[i]) + ']';
                }
                else {
                    ps += spacer + i + ':{' + unParseKeyValuePair(pl[i]) + '}';
                }
            }
            else {
                ps += spacer + i + ':' + pl[i];
            }
            spacer = ' ';
        }
    }
    return ps;
}

