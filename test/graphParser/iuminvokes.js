const test         = require('../../utils/utils.js');
const dagreParser  = require('../../statecharts/parser/grammarDagreD3.js').parse;

/**
 *             ABBREVIATIONS
 *   
 *   stt<>     = state  transition  table
 *   ddp<>     = dagre  parsed       
 *
 */

const sttX = 
`
invoke:
     id: q
    src: q 
 ondone: SUCCESS   
onerror: ERROR 

id: someid
*A @q
`;

const ddpX= dagreParser(sttX);


const arr = [
  [
    "INITIAL",
    "A",
    "SUCCESS",
    "ERROR"
  ],
  [
    [
      "INITIAL",
      "A",
      "",
      "INITIAL-A-xstate.init"
    ],
    [
      "A",
      "SUCCESS",
      "onDone",
      "A-SUCCESS-done.invoke.q"
    ],
    [
      "A",
      "ERROR",
      "onError",
      "A-ERROR-error.platform.q"
    ]
  ]
];





test('uminkoves and arr', ddpX, arr);



