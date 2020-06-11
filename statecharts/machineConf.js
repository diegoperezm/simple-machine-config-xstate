
const fs          = require('fs');
const path        = require('path');
const jison       = require('jison');
const bnf         = fs.readFileSync(
                        path.resolve(__dirname,'./grammar.jison'),
                        'utf8');
const parser      = new jison.Parser(bnf);
const execParser  = input => parser.parse(input); 

const machineConf  = (diagram) =>  {
  const machine      = execParser(diagram);
  return machine;
};



module.exports = machineConf;

