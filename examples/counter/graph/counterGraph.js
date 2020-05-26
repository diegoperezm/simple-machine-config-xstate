const fs      = require('fs');
const path    = require("path");
const bnf     = fs.readFileSync(path.resolve(__dirname,'../../../graph.jison'),'utf8');
const jison   = require('jison');
const parser  = new jison.Parser(bnf);
const exec    = input => parser.parse(input); 
const diagramFile = fs.readFileSync(path.resolve(__dirname, '../statecharts/diagram.txt'), 'utf8');
const diagram = exec(diagramFile); 
const smcat   = require("state-machine-cat");

try {
  const lSVGInAString = smcat.render(diagram, {outputType: "svg",});

	let doc = `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><title>Diagram</title></head><body><div style="width:100%;text-align:center"><div style="display:inline-block">${lSVGInAString}</div></div></body></html>`;

		fs.writeFileSync(path.resolve(__dirname,'index.html'), doc, 'utf8');

}

catch (pError) {
       console.error(pError);
}



