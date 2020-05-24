import repl from './pounceEnv.js';

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->');

// Add event listener for programmer input
const myPounceProgramEle = document.getElementById("user-pl");
const exampleSelectEle = document.getElementById("example");
const myDebugModeCkbxEle = document.getElementById("debug");

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