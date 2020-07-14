const     isEqual   = require('lodash.isequal');
const     transform = require('lodash.transform');
const     isObject  = require('lodash.isobject');

/*
 * This is only a draft, first version etc.
 * I need to test, and complete  this code
 * 
 */

/*
 * Colors reference
 * https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color 
	*/

const Reset = "\x1b[0m";
const Bright = "\x1b[1m";
const Dim = "\x1b[2m";
const Underscore = "\x1b[4m";
const Blink = "\x1b[5m";
const Reverse = "\x1b[7m";
const Hidden = "\x1b[8m";

const FgBlack = "\x1b[30m";
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const FgBlue = "\x1b[34m";
const FgMagenta = "\x1b[35m";
const FgCyan = "\x1b[36m";
const FgWhite = "\x1b[37m";

const BgBlack = "\x1b[40m";
const BgRed = "\x1b[41m";
const BgGreen = "\x1b[42m";
const BgYellow = "\x1b[43m";
const BgBlue = "\x1b[44m";
const BgMagenta = "\x1b[45m";
const BgCyan = "\x1b[46m";
const BgWhite = "\x1b[47m";
 

function test(testDescription, parsed, expected) {
    if(Array.isArray(parsed)){

      if(!isEqual(parsed, expected)) {
         console.log(FgYellow,'  ',testDescription);
         console.log(FgRed,'\n     [FAIL] Should be equivalent,', '\n     the (parsed) state transition table is different: ' );
    console
     .log(
       '\n',
         console.log('\nparsed:\n'), 
         console.log(JSON.stringify(parsed,null,2)), 
         console.log('\nexpected:\n'), 
         console.log(JSON.stringify(expected,null,2)), 
       '\n',
     ); 
         } else {
           console.log(FgGreen);
           console.log('   ',testDescription);
           console.log(FgCyan,'\n     [PASS]  Should be equivalent\n');
        }
    } else {
    
 let   diff=  difference(parsed, expected); 

 if(!isEmpty(diff)) {
    console.log(FgYellow,'  ',testDescription);
    console.log(FgRed,'\n     [FAIL] Should be deeply equivalent,', '\n     the (parsed) state transition table is different: ' );
    console
     .log(
       '\n',
       JSON.stringify(diff,null,2),
       '\n',
     ); 

 } else {
    console.log(FgGreen);
    console.log('   ',testDescription);
    console.log(FgCyan,'\n     [PASS]  Should be deeply equivalent\n');
  }
 }
};




/**
 * https://gist.github.com/Yimiprod/7ee176597fef230d1451 
 * Yimmiprod
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
function difference(object, base) {
  function changes(object, base) {
    return transform(object, function(result, value, key) {
     if (!isEqual(value, base[key])) {
        result[key] = (
	isObject(value) &&
        isObject(base[key]))
        ? changes(value, base[key])
        : value;
     }
   });
  }
    return changes(object, base);
}

/*
	* https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
 */
function isEmpty(obj) {

  for(var prop in obj) {
    if(obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}




module.exports = test;
