import repl from './pounceEnv.js';

// even though Rollup is bundling all your files together, errors and
// logs will still point to your original source modules
console.log('if you have sourcemaps enabled in your devtools, click on main.js:5 -->');

// Add event listener for programmer input
const el = document.getElementById("user-pl");
el.addEventListener("keyup", (e) => repl(e.target.value), false);
repl("0 1 [dup2 +] 5 times");