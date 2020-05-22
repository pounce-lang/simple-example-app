import repl from './pounceEnv.js';

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->');

// Add event listener for programmer input
const myPounceProgramEle = document.getElementById("user-pl");
const exampleSelectEle = document.getElementById("example");
const myDebugModeCkbxEle = document.getElementById("debug");

// 0 1 [dup2 +] 5 times
// [dup 1 - dup 0 > [[*] dip fac] [drop drop] ifte] [fac] def 5 [1 swap] apply fac 
// 5 [1 swap] [dup 1 -] [dup 0 >] [[*] dip] [drop drop] constrec
// 5 [dup 0 ==] [1 +] [dup 1 -] [*] linrec
// [0] [size 15 >] [] [uncons swap 0 = [1 [] cons cons] [0 1 [] cons cons cons] if-else concat] [] linrec size
// 9 2 8 [a b c] [a b * c - b /] apply-with
let pounceProgram = '"Pounce" "ready to" swap dup dup';
let debugMode = myDebugModeCkbxEle.checked;

myPounceProgramEle.addEventListener("keyup", (e) => {
    if (e.target.value !== pounceProgram) {
        pounceProgram = e.target.value;
        repl(pounceProgram, debugMode);
    }
}, false);

myDebugModeCkbxEle.addEventListener('change', () => {
    debugMode = myDebugModeCkbxEle.checked;
    repl(pounceProgram, debugMode);
});

exampleSelectEle.addEventListener('change', (e) => {
    pounceProgram = e.target.value;
    myPounceProgramEle.innerText = pounceProgram;
    myPounceProgramEle.value = pounceProgram;
    repl(pounceProgram, debugMode);
});


myPounceProgramEle.innerText = pounceProgram;
repl(pounceProgram, debugMode);