//  https://xstate.js.org/docs/
const {Machine, interpret} = require('xstate');
const parserXstate         = require('./js/grammarXstate.js').parser;
const createMachineConf    = input => parserXstate.parse(input);

const printGreen           = () => console.log('=> green');
const printYellow          = () => console.log('=> yellow');
const printRed             = () => console.log('=> red');

// CURRENTSTATE input NEXTSTATE :action 
const stateTransitionTable = `
   *GREEN   time   YELLOW  :printgreen
    YELLOW  time   RED     :printyellow
    RED     time   GREEN   :printred
`;

// xstate expects an object
const trafficlightsActions = {
		actions: {
				printgreen  : printGreen,
				printyellow : printYellow,
				printred    : printRed
		}
};

// Create a machine conf for xstate
const trafficlightsMachineConf   = createMachineConf(stateTransitionTable);
// Pass the machine conf to xstate
const trafficlightsMachine       = Machine(trafficlightsMachineConf);

/**
 * Using xstate's interpreter to run the statecharts.
 * An interpreted, running instance of a statecharts is called a service (xstate docs).
 */
const trafficlightsService       = interpret(trafficlightsMachine);

// This will be printed (console)
const trafficlightsMachineConfStr = JSON.stringify(trafficlightsMachineConf,null,2);
console.log('\n- Machine conf for xstate:\n\n', trafficlightsMachineConfStr,'\n');
																					 

