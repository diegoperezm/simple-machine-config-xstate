//  https://xstate.js.org/docs/
const {Machine, interpret} = require('xstate');
const parserXstate         = require('./js/grammarXstate.js').parser;

const createMachineConf    = input => parserXstate.parse(input);
const displayGreen         = ()    => console.log('=> green');
const displayYellow        = ()    => console.log('=> yellow');
const displayRed           = ()    => console.log('=> red ');

// CURRENTSTATE     input      NEXTSTATE   :actions
const stateTransitionTable = `
	*GREEN    time   YELLOW   :displaygreen
	 YELLOW   time   RED      :displayyellow
	 RED      time   GREEN    :displayred
`;

//  xstate expects an object 
const trafficLightsActions = {
  actions: {
     displaygreen:  displayGreen,
     displayyellow: displayYellow,
     displayred:    displayRed
  }
};

// Create a machine conf for xstate
const trafficLightsMachineConf    = createMachineConf(stateTransitionTable);

// Pass the machine conf and actions (object)  to xstate 
const trafficLightsMachine        = Machine(trafficLightsMachineConf, trafficLightsActions);

/**
 * Using xstate's interpreter to run the statechart.
 * An iterpreted, running instance of a statechart is called a service (xstate docs).
 */
const trafficLightsService        = interpret(trafficLightsMachine);

// This will be printed (console)
const trafficLightsMachineConfStr = JSON.stringify(trafficLightsMachineConf,null, 2);
console.log('\n- Machine config for xstate:\n\n',trafficLightsMachineConfStr, '\n\nOutput:\n');

// starts the interpreted machine
trafficLightsService.start(); 

// sending events
trafficLightsService.send('time');
trafficLightsService.send('time');
trafficLightsService.send('time');

