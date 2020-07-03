const   fs = require("fs");
const exec = require("child_process").exec;

/*
 * This is only a draft, first version etc.
 * I need to test, and complete  this code
 */

exec("cd test; for t in `ls`; do node $t; done;", (err, stdout, stderr) => {
   if(err) {
    console.log(stderr);
   }else {
    console.log(stdout);
   }
});
