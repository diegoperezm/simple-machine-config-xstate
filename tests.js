const     fs = require("fs");
const     jison = require("jison");
const    { Machine, actions, interpret, assign, send, sendParent } = require('xstate');
const     bnf = fs.readFileSync('grammar.jison', 'utf8');
const     parser = new jison.Parser(bnf);
const     differenceA = require('./utils.js');

function exec(input) {
    return parser.parse(input);
}

// :assign(color red) :assign(color blue) 

let z  =
`
initial:  A.GREEN   B.YELLOW C
context: 
   color: "red"

   A.GREEN     time    YELLOW  :display
   B           click    B      :display  :get
   B           clock    D      :display 

 `;


/*
GREEN     time    YELLOW  :assign
YELLOW    time    RED 
RED       time    GREEN   :display 
*/ 

//let y = exec(z); 

let q = {
    initial: 'A',
    context: {
    	color: ''
    },
    states: {
    	A: {
      initial: 'GREEN',
	    states: {
	   			GREEN: {
							id: '1',
							on:{
									time: {
											target: '#2'
									}
							}

					}, // green
	   			YELLOW: {
							id: '2',
							on:{
									time: {
											target: '#3'
									}
							}

					}, // yellow
	   			RED: {
							id: '3',
							on:{
									time: {
											target: '#1'
									}
							}

					}, // yellow
	   }
	  }
  }
};



let a  = exec(z);

//const b = Machine(q);
//console.log(b);
//console.log(b.config.states.A.states.GREEN);



/*

console.log(b.config);

const service = interpret(b).onTransition(s => console.log(s.value));
service.start();
service.send('time');
service.send('time');
service.send('time');

console.log('a\n', a);
console.log('\n');
console.log('b\n',b);
console.log('\n');

console.log('difference:\n', differenceA(b,a));
*/
