
var path            = require('path');
var exec            = require("child_process").exec;
var gulp            = require("gulp");
var browserSync     = require("browser-sync").create();
var parallel        = gulp.parallel; 
var watcherGrammar  = gulp.watch('./statecharts/parser/*.jison');

var watcherDiagram = gulp.watch('./examples/**/statecharts/*.txt');
var isFehRunning = false;

function server() {
   browserSync
    .init({
        watch: true,
        cors: true,        
      server: "./examples/browser/calculator/calcAdditionZeroClear/"
    });
}


function surf() {
  browserSync
    .init({
      browser: ["surf"],
        watch: true,
      server: "./examples/browser/calculatorAdditionStateZero"
    });
}

function grammar() {
  watcherGrammar.on('change', (path, stats) => {
    let commands = `cd ./statecharts/parser/;` +
                    `bash update_grammar.sh ` ; 
    exec(commands, (err, stdout, stderr) => {
      if(err) {
        console.log(err);
      } else {
        console.log(stdout);
        console.log(stderr);
      }
    });
   });
}

function graph(done) {
  watcherDiagram.on('change', (path,stats) => {
    let a = path.replace(/diagram.txt/,'');
    let b = a.replace(/statecharts\//, ''); 
    let forFeh = '';

    if(isFehRunning) {
      forFeh ='cd ../../../; bash refresh.sh';
    } else {
      forFeh ='feh --image-bg black -z -. graph.png;' + 
              'cd ../../../; bash refresh.sh';
      isFehRunning = true;
    }

    let commands = `cd ./${b};` +
    'node ../../statecharts/graph.js '   +
    './statecharts/diagram.txt "dot";'  +
    'cd ./statecharts;'                 +
    'dot graph.dot -Tpng -o graph.png;' +
    `${forFeh}`;  

    exec(commands, (err, stdout, stderr) => {
      if(err) {
 console.log(err);
      } else {
 console.log(stdout);
 console.log(stderr);
      }

    });
   });
  done();
}

function graphMod(done) {
  watcherDiagram.on('change', (path,stats) => {
    let a = path.replace(/diagram.txt/,'');
    let b = a.replace(/statecharts\//, ''); 
    let forFeh = '';

    if(isFehRunning) {
      forFeh ='cd ../../../; bash refresh.sh';
    } else {
      forFeh ='feh graph.png;' + 
              'cd ../../../; bash refresh.sh';
      isFehRunning = true;
    }

    let commands = `cd ./${b};`               +
    'node ../../statecharts/graph.js '        +
    './statecharts/diagram.txt "dot";'        +
    'cd ./statecharts;'                       +
    'bash graphMod.sh;'                        +
    'dot graph.dot -Tpng -o graph.png;'       +
    `${forFeh}`;  

    exec(commands, (err, stdout, stderr) => {
      if(stderr) {
 console.log(stderr);
      } else {
 console.log(stdout);
      }
    });
   });
  done();
}

exports.start        = parallel(graph);
exports.surf         = parallel(surf);
exports.graphMod     = parallel(graphMod);
exports.server       = parallel(server);
exports.grammar      = parallel(grammar);


