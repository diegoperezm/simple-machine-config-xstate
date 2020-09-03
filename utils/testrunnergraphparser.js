const   fs = require("fs");
const exec = require("child_process").exec;

/*
 * This is only a draft, first version etc.
 * I need to test and complete  this code
 */

exec("cd test/graphParser; for test in `ls`; do node $test; done;", (err, stdout, stderr) => {
   if(err) {
     console.log('exec error: ', err);
   } else {
    console.log(stdout);
    console.log(stderr);
   }
});
