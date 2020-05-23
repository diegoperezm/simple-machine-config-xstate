const { Machine } = require('xstate');
const fs          = require('fs');
const bnf         = fs.readFileSync('../../grammar.jison', 'utf8');
const jison       = require('jison');
const parser      = new jison.Parser(bnf);

const statechart   = (a,b) =>  {
    const machine  = exec(a);
	 return Machine(machine,b);
};

function exec(input) {
   return parser.parse(input);
}



module.exports = statechart;

