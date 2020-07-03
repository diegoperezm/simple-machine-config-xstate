const test   = require('../utils/utils.js');
const xstateParse  = require('../statecharts/grammarXstate.js').parse;

/**
 *             ABBREVIATIONS
 *   
 *   stt<>     = state  transition  table
 *   xsp<>     = xstate parsed      machine conf
 *
 */


  const sttTrafficlightsWithActions = 
  `
  *GREEN   time YELLOW :printgreen
   YELLOW  time RED    :printyellow
   RED     time GREEN  :printred 
  `;
  
  const xspTrafficlightsWithActions = xstateParse(sttTrafficlightsWithActions);
  
  const trafficlightsWithActionsObject = {
    "initial": "GREEN",
    "context": {},
    "states": {
      "GREEN": {
        "on": {
          "time": {
            "target": "YELLOW",
            "actions": [
              "printgreen"
            ]
          }
        }
      },
      "YELLOW": {
        "on": {
          "time": {
            "target": "RED",
            "actions": [
              "printyellow"
            ]
         }
        }
      },
      "RED": {
        "on": {
          "time": {
            "target": "GREEN",
            "actions": [
              "printred"
            ]
          }
        }
      }
    }
  };
 
test(
  'xspTrafficlightsWithActions and trafficlightsWithActionsObject',
  xspTrafficlightsWithActions,
  trafficlightsWithActionsObject);



