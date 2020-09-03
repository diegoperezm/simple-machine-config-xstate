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
*INITIAL @id
`;

//const ddpX= dagreParser(sttX);
  
const xArr = [];

//test('sttX and xArr', sttX, xArr);



