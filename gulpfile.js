
var path           = require('path');
var exec           = require("child_process").exec;
var gulp           = require("gulp");
var parallel       = gulp.parallel; 
var watcherDiagram = gulp.watch('./examples/**/statecharts/*.txt');
var isFehRunning = false;
function graph(done) {

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

    let commands = `cd ./${b};` +
    'node ../../statecharts/graph.js '   +
    './statecharts/diagram.txt "dot";'  +
    'cd ./statecharts;'                 +
    'dot graph.dot -Tpng -o graph.png;' +
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


exports.start   = parallel(graph);



