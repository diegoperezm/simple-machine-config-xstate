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

const statecharts  = (diagram, actions, options ={outputType: "svg"}) =>  {
    const diagramDone    = execGraph(diagram); 
    const machine        = execConf(diagram);
		let fileExtension;
    let lSVGInAString; 

    try {
    switch (options.outputType) {
     case "dot":
 			 fileExtension = 'dot';
       lSVGInAString = smcat.render(diagramDone, options);
       break;
		case "smcat":
 			 fileExtension = 'smcat';
       lSVGInAString = smcat.render(diagramDone, options);
       break;
		case "json":
    	 fileExtension = 'json';
			 lSVGInAString = JSON.stringify(smcat.render(diagramDone, options));
       break;
		case "ast":
	     fileExtension  = 'ast';
			 lSVGInAString = JSON.stringify(smcat.render(diagramDone, options));
       break;
		case "scxml":
	     fileExtension  = 'scxml';
       lSVGInAString = smcat.render(diagramDone, options);
       break;
		case	"scjson":
	     fileExtension  = 'scjson';
			 lSVGInAString = JSON.stringify(smcat.render(diagramDone, options));
       break;
		case "svg":
			 fileExtension  =  'svg';
       lSVGInAString = smcat.render(diagramDone, options);
       break;
		default:
			 fileExtension  =  'svg';
       lSVGInAString = smcat.render(diagramDone, options);
       break;
      }
        let pathString = `./graph.${fileExtension}`;
				fs.writeFileSync(path.resolve(pathString), lSVGInAString, 'utf8');
    }
    catch (pError) {
     console.error(pError);
    }

	 //return Machine(machine,actions);
		return (machine);
};



module.exports = statecharts;

