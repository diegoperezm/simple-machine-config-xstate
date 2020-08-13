const test   = require('../utils/utils.js');
const xstateParse  = require('../statecharts/parser/grammarXstate.js').parse;

/**
 *             ABBREVIATIONS
 *
 *   stt<>     = state  transition  table
 *   xsp<>     = xstate parsed      machine conf
 *
 */


  const sttTrafficlightsExtendedStateWithNumber =
`
 context:
   color: 0 

id: someid
   *GREEN   time YELLOW
    YELLOW  time RED
    RED     time GREEN
`;

  const xspTrafficlightsExtendedStateWithNumber = xstateParse(sttTrafficlightsExtendedStateWithNumber);

   const  trafficlightsExtendedStateWithNumberObject = {
      "initial": "GREEN",
           "id": "someid",
        "context": {
            "color": 0 
        },
      "states": {
        "GREEN": {
          "on": {
            "time": {
              "target": "YELLOW",
            }
          }
        },
        "YELLOW": {
          "on": {
            "time": {
              "target": "RED",
           }
          }
        },
        "RED": {
          "on": {
            "time": {
              "target": "GREEN",
            }
          }
        }
      }
    };




test('xspTrafficlightsExtendedStateWithNumber and trafficlightsExtendedStateWithNumberObject',
      xspTrafficlightsExtendedStateWithNumber,
      trafficlightsExtendedStateWithNumberObject);

