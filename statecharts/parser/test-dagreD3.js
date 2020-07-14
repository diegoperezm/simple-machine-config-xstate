const fs          = require('fs');
const path        = require('path');
const jison       = require('jison');
const bnf         = fs.readFileSync(
                        path.resolve(
                        __dirname,
                        './grammarDagreD3.jison'),
                        'utf8');

const parser      = new jison.Parser(bnf);
const execParser  = input => parser.parse(input); 

let diagram =
`
context:
          data: []
        oprnd1: []
      operator: []
        oprnd2: []

 *START           number       OPND1              :setctxdata :setctxoprnd1    exit: displaydata

  OPND1           number       OPND1              :setctxdata :setctxoprnd1    exit: displaydata
  OPND1           operator     OPRTRENTERED       :setctxdata :setctxoperator  exit: displaydata

  OPRTRENTERED    number       OPND2              :setctxdata :setctxoprnd2    exit: displaydata 

  OPND2           number       OPND2              :setctxdata :setctxoprnd2    exit: displaydata
  OPND2           equals       RESULT             :calculate  :displaydata

  RESULT         

`;

const machineConf  = (diagram) =>  {
  const machine      = execParser(diagram);
  return machine;
};

let machineConfObj =  machineConf(diagram);

console.log(JSON.stringify(machineConfObj,null, 2));

/*
  `
*GREEN   time  YELLOW :printgreen 
 YELLOW  time  RED    :printyellow 
 RED     time GREEN  :printred 

`;



*/
