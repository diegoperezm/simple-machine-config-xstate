const { Machine } = require('xstate');
const smcat       = require("state-machine-cat");
const fs          = require('fs');
const path        = require('path');
const jison       = require('jison');
const bnfConf     = fs.readFileSync(path.resolve(__dirname,'./grammar.jison'),'utf8');
const bnfGraph    = fs.readFileSync(path.resolve(__dirname,'graph.jison'),'utf8');
const parserConf  = new jison.Parser(bnfConf);
const parserGraph = new jison.Parser(bnfGraph);
const execConf    = input => parserConf.parse(input); 
const execGraph   = input => parserGraph.parse(input); 

/*
state machine cat Options: (not tested)
outputType <type>       svg|dot|smcat|json|ast|scxml|scjson (default: "svg")
inputType <type>        smcat|scxml|json (default: "smcat")
engine <type>           dot|circo|fdp|neato|osage|twopi (default: "dot")
direction <dir>         top-down|bottom-top|left-right|right-left (default: "top-down")
outputTo <file>         File to write to. use - for stdout.
dotGraphAttrs <string>  graph attributes to pass to the dot render engine
dotNodeAttrs <string>   node attributes to pass to the dot render engine
dotEdgeAttrs <string>   edge attributes to pass to the dot render engine
*/

const statecharts  = (diagram,actions,options) =>  {
    const diagramDone    = execGraph(diagram); 
    const machine        = execConf(diagram);
    const defaultOptions = (options === undefined) ? {outputType: "svg",} : options;

    try {
      const lSVGInAString = smcat.render(diagramDone, defaultOptions );
      fs.writeFileSync('./statecharts/graph.svg', lSVGInAString, 'utf8');
      }
    catch (pError) {
     console.error(pError);
    }

	 return Machine(machine,actions);
};



module.exports = statecharts;

