const test   = require('../utils/utils.js');
const xstateParse  = require('../statecharts/parser/grammarXstate.js').parse;

/**
 *             ABBREVIATIONS
 *   
 *   stt<>     = state  transition  table
 *   xsp<>     = xstate parsed      machine conf
 *
 */

  const sttSimpleInvoke = 
  `
 invoke:
     id: someid
    src: somefunc
 ondone: SUCCESS
onerror: ERROR

  *A @someid
   B time SUCCESS
  `;

  const xspSimpleInvoke = xstateParse(sttSimpleInvoke);
  
  const simpleInvokeObject =
{
  "initial": "A",
  "context": {},
  "states": {
    "A": {
      "invoke": {
        "id": "someid",
        "src": "somefunc",
        "onDone": {
          "target": "SUCCESS"
        },
        "onError": {
          "target": "ERROR"
        }
      }
    },
   "B": {
       "on": {
           "time": {
               target: "SUCCESS"
           }
       }
   }
  }
};

//console.log(JSON.stringify(xspSimpleInvoke,null,2));
test(
  'xspSimpleInvoke and simpleInvokeObject',
  xspSimpleInvoke,
  simpleInvokeObject);



