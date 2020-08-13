const test   = require('../utils/utils.js');
const xstateParse  = require('../statecharts/parser/grammarXstate.js').parse;

/**
 *             ABBREVIATIONS
 *   
 *   stt<>     = state  transition  table
 *   xsp<>     = xstate parsed      machine conf
 *
 */

const sttConvertToFCtxInvokeWithActions = 
`
context:
  celsius: ""
  result:  "" 

 invoke:
     id: getinput
    src: getinput
 ondone: CALCF            :setctxcelsius
onerror: ERROR

 invoke:
     id: calcf
    src: calcf 
 ondone: DISPLAYRESULT     :setctxresult
onerror: ERROR

 invoke:
     id: displayresult 
    src: displayresult
 ondone: IDLE              :setctxcelsiusstr :setctxresultstr
onerror: ERROR

id: someid
*IDLE          calculate        READINPUT

 READINPUT     @getinput       

 CALCF         @calcf        

 DISPLAYRESULT @displayresult   
 
 ERROR 

`;


const xspConvertToFCtxInvokeWithActions = xstateParse(sttConvertToFCtxInvokeWithActions);
  
const ConvertToFCtxInvokeWithActionsObject = {
    "initial": "IDLE",
    "id":      "someid",
    "context": {
          "celsius": "",
          "result":  ""
    },
    "states": {
      "IDLE": {
        "on": {
            "calculate": {
              "target": "READINPUT",
            }
          } 
        },
       "READINPUT": {
         "invoke": {
           "id": "getinput",
           "src":"getinput",
           "onDone": {
             "target": "CALCF",
             "actions": ["setctxcelsius"] 
           },
           "onError": {
             "target": "ERROR"
           }
         }
       },
       "CALCF": {
         "invoke": {
           "id": "calcf",
           "src": "calcf",
           "onDone": {
             "target": "DISPLAYRESULT",
             "actions": ["setctxresult"] 
           },
           "onError": {
             "target": "ERROR"
           }
         }
        },
      "ERROR":           {},
      "DISPLAYRESULT":   {
          "invoke": {
           "id": "displayresult",
           "src":"displayresult",
           "onDone": {
             "target": "IDLE",
               "actions": ["setctxcelsiusstr",
                           "setctxresultstr"] 
           },
           "onError": {
             "target": "ERROR"
           }
         }
        },
      }
    };


test(
  'xspConvertToFCtxInvokeWithActions and ConvertToFCtxInvokeWithActionsObject',
  xspConvertToFCtxInvokeWithActions,
  ConvertToFCtxInvokeWithActionsObject);

/*
console.log('---',
  JSON
    .stringify(
      xspConvertToFCtxInvokeWithActions,
      null,
      2)
);
*/
