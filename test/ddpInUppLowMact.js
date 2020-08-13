const test         = require('../utils/utils.js');
const dagreParser  = require('../statecharts/parser/grammarDagreD3.js').parse;

/**
 *             ABBREVIATIONS
 *   
 *   stt<>     = state  transition  table
 *   ddp<>     = dagre  parsed       
 *
 */

const sttddpInUppLowMact = 
`
id: someid
*A time :actions
`;

const ddpInUppLowMact = dagreParser(sttddpInUppLowMact);
  
const ddpInUppLowArr =
[
  [
    "INITIAL",
    "A"
  ],
  [
    [
      "INITIAL",
      "A",
      "",
      "INITIAL-A-xstate.init"
    ]
  ]
];

test('ddpInUppLowMact and ddpInUppLowArr',
     ddpInUppLowMact,
     ddpInUppLowArr
     );



