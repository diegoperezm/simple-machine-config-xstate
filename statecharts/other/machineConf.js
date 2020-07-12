
const fs          = require('fs');
const path        = require('path');
const jison       = require('jison');
const bnf         = fs.readFileSync(
                        path.resolve(
                        __dirname,
                        './grammar.jison'),
                        'utf8');
const parser      = new jison.Parser(bnf);
const execParser  = input => parser.parse(input); 

/**
 * @param   {string} diagram - A statechart description       
 * @example 
 * let diagram = `*A time B
 *                 B final`
 * machineConf(diagram);
 * // => {"initial":"A","context":{},"states":{"A":{"on":{"time":{"target":"B"}}},"B":{"type":"final"}}} 
 * @returns {object}         - A machine conf (xstate) 
 */
const machineConf  = (diagram) =>  {
  const machine      = execParser(diagram);
  return machine;
};


module.exports = machineConf;

