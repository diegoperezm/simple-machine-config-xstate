const test         = require('../../utils/utils.js');
const xstateParse  = require('../../statecharts/parser/grammarXstate.js').parse;

/**
 *             ABBREVIATIONS
 *
 *   stt<>     = state  transition  table
 *   xsp<>     = xstate parsed      machine conf
 *
 */


  const sttExtendedState =
`
 context:
       a: [] 
       b: [1] 
       c: [2 3 4] 

id: someid
*A time B
 B final 
`;

  const xspExtendedState = xstateParse(sttExtendedState);

  const  ExtendedStateObject = {
  "initial": "A",
      "id": "someid",
  "context": {
    "a": [],
    "b": [
      1
    ],
    "c": [
      [
        2,
        3,
        4
      ]
    ]
  },
  "states": {
    "A": {
      "on": {
        "time": {
          "target": "B"
        }
      }
    },
    "B": {
      "type": "final"
    }
  }
};



test('xspExtendedState and ExtendedStateObject',
      xspExtendedState,
      ExtendedStateObject);

