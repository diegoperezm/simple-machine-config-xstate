const test         = require('../utils/utils.js');
const dagreParser  = require('../statecharts/parser/grammarDagreD3.js').parse;

/**
 *             ABBREVIATIONS
 *   
 *   stt<>     = state  transition  table
 *   ddp<>     = dagre  parsed       
 *
 */

const sttCtxInvokeWithActs = 
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


*IDLE          calculate        READINPUT

 READINPUT     @getinput       

 CALCF         @calcf        

 DISPLAYRESULT @displayresult   
 
 ERROR 
`;

const ddpCtxInvokeWithActs = dagreParser(sttCtxInvokeWithActs);
  
const ctxInvokeWithActsArr =
[
  [
    "INITIAL",
    "IDLE",
    "READINPUT",
    "CALCF",
    "DISPLAYRESULT",
    "ERROR"
  ],
  [
    [
      "INITIAL",
      "IDLE",
      "",
      "INITIAL-IDLE-xstate.init"
    ],
    [
      "IDLE",
      "READINPUT",
      "calculate",
      "IDLE-READINPUT-calculate"
    ],
    [
      "READINPUT",
      "CALCF",
      "onDone",
      "READINPUT-CALCF-done.invoke.getinput"
    ],
    [
      "READINPUT",
      "ERROR",
      "onError",
      "READINPUT-ERROR-error.platform.getinput"
    ],
    [
      "CALCF",
      "DISPLAYRESULT",
      "onDone",
      "CALCF-DISPLAYRESULT-done.invoke.calcf"
    ],
    [
      "CALCF",
      "ERROR",
      "onError",
      "CALCF-ERROR-error.platform.calcf"
    ],
    [
      "DISPLAYRESULT",
      "IDLE",
      "onDone",
      "DISPLAYRESULT-IDLE-done.invoke.displayresult"
    ],
    [
      "DISPLAYRESULT",
      "ERROR",
      "onError",
      "DISPLAYRESULT-ERROR-error.platform.displayresult"
    ]
  ]
];

test(
    'ddpCtxInvkWithActs and ctxInvokeWithActsArr ',
     ddpCtxInvokeWithActs,  
     ctxInvokeWithActsArr 
    );





