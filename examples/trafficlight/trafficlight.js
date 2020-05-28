const fs          = require('fs');
const path        = require('path');
const {interpret} = require('xstate');
const statecharts = require('../../statecharts/index.js'); 
const actions     = require('./statecharts/actions.js');
const options     = {outputType: "dot"};
const diagram     = fs.readFileSync(path.resolve(__dirname, './statecharts/diagram.txt'),'utf8'); 

const trafficLightMachine = statecharts(diagram,actions,options);
const trafficLightService = interpret(trafficLightMachine).onTransition(state=> console.log(state.value));

trafficLightService.start();
