/*
state machine cat Options: (not tested)
outputType <type>      svg|dot|smcat|json|ast|scxml|scjson (default: "svg")
inputType <type>       smcat|scxml|json (default: "smcat")
engine <type>          dot|circo|fdp|neato|osage|twopi (default: "dot")
direction <dir>        top-down|bottom-top|left-right|right-left (default: "top-down")
outputTo <file>        File to write to. use - for stdout.
dotGraphAttrs <string> graph attributes to pass to the dot render engine
dotNodeAttrs <string>  node attributes to pass to the dot render engine
dotEdgeAttrs <string>  edge attributes to pass to the dot render engine
*/

const smcat       = require("state-machine-cat");
const fs          = require('fs');
const path        = require('path');
const jison       = require('jison');
const bnfGraph    = fs.readFileSync(
                      path.resolve(__dirname,'graph.jison'),
                      'utf8');
const parserGraph = new jison.Parser(bnfGraph);
const execGraph   = input => parserGraph.parse(input);
const diagram     = fs.readFileSync(
	                   	process.argv[2],
                   		'utf8');
const options = process.argv[3]; 

/**
  * @description            - Side effect: write a file
  * @param {string} diagram - A statechart description       
  * @param {string} options - Set output type of the file (sm-cat)
  * 
  */
const graph  = (diagram, options ="svg") =>  {
    const diagramDone    = execGraph(diagram); 
    let fileExtension;
    let lSVGInAString; 
    let optionsType = {outputType: options }
    try {
    switch (options) {
     case "dot":
       fileExtension = 'dot';
       lSVGInAString = smcat.render(diagramDone, optionsType);
       break;
     case "smcat":
       fileExtension = 'smcat';
       lSVGInAString = smcat.render(diagramDone, optionsType);
       break;
     case "json":
       fileExtension = 'json';
       lSVGInAString = JSON.stringify(smcat.render(diagramDone, optionsType));
       break;
     case "ast":
       fileExtension  = 'ast';
       lSVGInAString = JSON.stringify(smcat.render(diagramDone, optionsType));
       break;
     case "scxml":
       fileExtension  = 'scxml';
       lSVGInAString = smcat.render(diagramDone, optionsType);
       break;
     case "scjson":
       fileExtension  = 'scjson';
       lSVGInAString = JSON.stringify(smcat.render(diagramDone, optionsType));
       break;
     case "svg":
       fileExtension  =  'svg';
       lSVGInAString = smcat.render(diagramDone, optionsType);
       break;
     default:
       fileExtension  =  'svg';
       lSVGInAString = smcat.render(diagramDone, optionsType);
       break;
      }

     fs.writeFileSync(
      `./statecharts/graph.${fileExtension}`,
       lSVGInAString,
       'utf8');
     }
    catch (pError) {
     console.error(pError);
    }
};


graph(diagram, options);


