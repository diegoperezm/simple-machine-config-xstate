const test         = require('../../utils/utils.js');
const xstateParse  = require('../../statecharts/parser/grammarXstate.js').parse;

/**
 *             ABBREVIATIONS
 *
 *   stt<>     = state  transition  table
 *   xsp<>     = xstate parsed      machine conf
 *
 */


  const sttLowerCaseNumber =
`
context:
  opnd1: [0]

id: someid
*A time B
 B final
`;

 const xspLowerCaseNumber = xstateParse(sttLowerCaseNumber);

 const  lowerCaseNumberObject = {

  "initial": "A",
       "id":      "someid",
  "context": {
    "opnd1": [
      0
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
       


test('xspLowerCaseNumber and lowerCaseNumberObject',
      xspLowerCaseNumber,
      lowerCaseNumberObject);




