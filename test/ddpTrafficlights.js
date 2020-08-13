const test         = require('../utils/utils.js');
const dagreParser  = require('../statecharts/parser/grammarDagreD3.js').parse;

/**
 *             ABBREVIATIONS
 *   
 *   stt<>     = state  transition  table
 *   ddp<>     = dagre  parsed       
 *
 */

const sttTRAFFICLIGHTS = 
`
id: someid
 *GREEN   time YELLOW :printgreen
  YELLOW  time RED    :prinyellow
  RED     time GREEN  :printred

`;

const ddpTRAFFICLIGHTS= dagreParser(sttTRAFFICLIGHTS);

let trafficlightsArr = 
[
  [
    "INITIAL",
    "GREEN",
    "YELLOW",
    "RED"
  ],
  [
    [
      "INITIAL",
      "GREEN",
      "",
      "INITIAL-GREEN-xstate.init"
    ],
    [
      "GREEN",
      "YELLOW",
      "time",
      "GREEN-YELLOW-time"
    ],
    [
      "YELLOW",
      "RED",
      "time",
      "YELLOW-RED-time"
    ],
    [
      "RED",
      "GREEN",
      "time",
      "RED-GREEN-time"
    ]
  ]
];


test(
    'ddpTRAFFICLIGHTS and trafficlightsArr',
    ddpTRAFFICLIGHTS,
    trafficlightsArr );


