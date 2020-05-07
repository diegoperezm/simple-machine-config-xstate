const     fs = require("fs");
const     jison = require("jison");
const    { Machine, actions, interpret, assign, send, sendParent } = require('xstate');
const     bnf = fs.readFileSync('grammar.jison', 'utf8');
const     parser = new jison.Parser(bnf);
const     differenceA = require('./utils.js');

function exec(input) {
    return parser.parse(input);
}

let z  =
`
initial:  GREEN

context:
    color: ""
    A.GREEN    time A.GREEN
 `;

let a  = exec(z);


let b = {
    context: {
    	color: ''
    },
    initial: 'A',
    states: {
    	A: {
      initial: 'GREEN',
	    states: {
	   	GREEN: {}
	   }
	  }
  }
};


console.log('a\n', a);
console.log('\n');
console.log('b\n',b);
console.log('\n');

console.log('difference:\n', differenceA(b,a));
