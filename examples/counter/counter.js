const fs            = require('fs');
const { interpret } = require('xstate');
const actions       = require('./statecharts/actions.js');
const statechart    = require('./statecharts/statecharts.js');
const diagram       = fs.readFileSync('./statecharts/diagram.txt', 'utf8');
const counterMachine  = statechart(diagram, actions);

/*
const increment = context => context.count + 1;
const decrement = context => context.count - 1;



const counterMachine = Machine({
  initial: 'active',
  context: {
    count: 0
  },
  states: {
    active: {
      on: {
        INC: { actions: assign({ count: increment }) },
        DEC: { actions: assign({ count: decrement }) }
      }
    }
  }
});

const counterService = interpret(counterMachine)
  .onTransition(state => console.log(state.context.count))
  .start();
// => 0

counterService.send('INC');
// => 1

counterService.send('INC');
// => 2

counterService.send('DEC');
// => 1
*/


const  counterService = interpret(counterMachine).onTransition(state => {
    console.log('current state   ', state.value);
    console.log('current context ', state.context);
});



counterService.start();
counterService.send('inc');
counterService.send('inc');
counterService.send('dec');
