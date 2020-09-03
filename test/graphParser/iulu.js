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
id: someid
*A t NEXT 
`
;

const ddpX= dagreParser(sttX);

const xArr =
[
    [
        'INITIAL',
        'A',
        'NEXT'
    ],
    [
      [ 'INITIAL',
        'A',
        '',
        'INITIAL-A-xstate.init' ],

      [ 'A',
        'NEXT',
        't',
        'A-NEXT-t' ]
      ]
];

      
      

test('iulu  and xArr', ddpX, xArr);



