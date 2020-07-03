const test = require('tape');
const xstateParse = require('../statecharts/grammarXstate.js').parse;

/**
 *             ABBREVIATIONS
 *   
 *   stt<>     = state  transition  table
 *   xsp<>     = xstate parsed      machine conf
 *
 */


test('xspTrafficlightsWithActions and trafficlightsWithActionsObject',
  function (t) {
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
       t.plan(1);
       t.deepEquals(
          xspTrafficlightsWithActions,
          trafficlightsWithActionsObject);
});


test('xspTrafficlightsExtendedState and trafficlightsExtendedStateObject',
  function (t) {
    const sttTrafficlightsExtendedState = 
    `
    context:
      color: "green"
    
    *GREEN   time YELLOW 
     YELLOW  time RED   
     RED     time GREEN
    `;
    
    const xspTrafficlightsExtendedState = xstateParse(sttTrafficlightsExtendedState);
    
    const  trafficlightsExtendedStateObject = {
      "initial": "GREEN",
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

    t.plan(1);
    t.deepEquals(
      xspTrafficlightsExtendedState,
			   trafficlightsExtendedStateObject	
    );
});

