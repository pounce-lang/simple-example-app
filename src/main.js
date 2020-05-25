import repl from './pounceEnv.js';

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->');

// Add event listener for programmer input
const myPounceProgramEle = document.getElementById("user-pl");
const exampleSelectEle = document.getElementById("example");
const myLogLevelSelectEle = document.getElementById("logLevel");

let pounceProgram = '"Pounce" "ready to" swap dup dup';
let logLevel = 0;

myPounceProgramEle.addEventListener("keyup", (e) => {
    if (e.target.value !== pounceProgram) {
        pounceProgram = e.target.value;
        repl(pounceProgram, logLevel);
    }
}, false);

myLogLevelSelectEle.addEventListener('change', (e) => {
    logLevel = parseInt(e.target.value, 10);
    repl(pounceProgram, logLevel);
});

exampleSelectEle.addEventListener('change', (e) => {
    pounceProgram = e.target.value;
    myPounceProgramEle.innerText = pounceProgram;
    myPounceProgramEle.value = pounceProgram;
    repl(pounceProgram, logLevel);
});


myPounceProgramEle.innerText = pounceProgram;
repl(pounceProgram, logLevel);