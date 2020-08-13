const fs          = require('fs');
const path        = require('path');
const jison       = require('jison');
const bnf         = fs.readFileSync(
                        path.resolve(
                        __dirname,
                        './grammarXstate.jison'),
                        'utf8');

const parser      = new jison.Parser(bnf);
const execParser  = input => parser.parse(input); 

let diagram = `
id: lowercase
  *A t B
   B t A
`;		


const machineConf  = (diagram) =>  {
  const machine      = execParser(diagram);
  return machine;
};

//let machineConfObj =  machineConf(diagram2);
let machineConfObj =  machineConf(diagram);

console.log(JSON.stringify(machineConfObj,null, 2));


