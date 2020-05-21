const fs            = require('fs');
const { interpret } = require('xstate');
const actions       = require('./actions.js');
const statechart    = require('./statecharts.js');
const diagram       = fs.readFileSync('diagram.txt', 'utf8');
const trafficLight  = statechart(diagram, actions);

const  trafficLightService = interpret(trafficLight).onTransition(state => {
    console.log('current state   ', state.value);
    console.log('current context ', state.context);
});


trafficLightService.start();
trafficLightService.send('time');
trafficLightService.send('time');
trafficLightService.send('time');
