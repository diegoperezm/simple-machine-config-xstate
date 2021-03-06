const test   = require('../utils/utils.js');
const xstateParse  = require('../statecharts/parser/grammarXstate.js').parse;

/**
 *             ABBREVIATIONS
 *
 *   stt<>     = state  transition  table
 *   xsp<>     = xstate parsed      machine conf
 *
 */


  const sttTrafficlightsExtendedState =
`
 context:
   color: "green"

id: someid
   *GREEN   time YELLOW
    YELLOW  time RED
    RED     time GREEN
`;

  const xspTrafficlightsExtendedState = xstateParse(sttTrafficlightsExtendedState);

   const  trafficlightsExtendedStateObject = {
      "initial": "GREEN",
       "id": "someid",
        "context": {
            "color": "green"
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




test('xspTrafficlightsExtendedState and trafficlightsExtendedStateObject',
      xspTrafficlightsExtendedState,
      trafficlightsExtendedStateObject);

