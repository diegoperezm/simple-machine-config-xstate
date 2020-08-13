const test         = require('../utils/utils.js');
const dagreParser  = require('../statecharts/parser/grammarDagreD3.js').parse;

/**
 *             ABBREVIATIONS
 *   
 *   stt<>     = state  transition  table
 *   ddp<>     = dagre  parsed       
 *
 */

const sttddpInUpLowUppMentry   = 
`
id: someid
*A time B entry: a
 B time A
`;

const ddpInUppLowUppMentry    = dagreParser(sttddpInUpLowUppMentry);
  
const ddpInUppLowUppMentryArr =
[
  [
    "INITIAL",
    "A",
    "B"
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
      "B",
      "time",
      "A-B-time"
    ],
    [
      "B",
      "A",
      "time",
      "B-A-time"
    ]
  ]
];



test(
    'ddpInUppLowUppMentry and ddpInUppLowUppMentryArr',
    ddpInUppLowUppMentry ,
    ddpInUppLowUppMentryArr
    );



