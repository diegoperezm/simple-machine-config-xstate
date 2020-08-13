const test         = require('../utils/utils.js');
const dagreParser  = require('../statecharts/parser/grammarDagreD3.js').parse;

/**
 *             ABBREVIATIONS
 *   
 *   stt<>     = state  transition  table
 *   ddp<>     = dagre  parsed       
 *
 */


const sttddpMentryMactionsMexit = 
`
id: someid
*A time C entry: a :action exit: b 
 C time A
`;

const ddpMentryMactionsMexit = dagreParser(sttddpMentryMactionsMexit);
  
const ddpMentryMactionsMexitArr =
[
  [
    "INITIAL",
    "A",
    "C"
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
      "C",
      "time",
      "A-C-time"
    ],
    [
      "C",
      "A",
      "time",
      "C-A-time"
    ]
  ]
];



test( 'ddpMentryMactionsMexit and ddpMentryMactionsMexitArr',
      ddpMentryMactionsMexit,
      ddpMentryMactionsMexitArr
    );



