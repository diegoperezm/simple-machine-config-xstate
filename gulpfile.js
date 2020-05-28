var path       = require('path');
var exec       = require("child_process").exec;
var gulp       = require("gulp");
var parallel   = gulp.parallel; 
var args       = process.argv;
var watcher    = gulp.watch('./examples/**/statecharts/*.txt');


function f(done) {
	watcher.on('change', (path,stats) => {
		let a = path.replace(/diagram.txt/,'');
	  let b = a.replace(/statecharts\//, ''); 

		exec(`cd ./${b}; node trafficlight.js; cd ./statecharts; dot graph.dot -Tpng -o graph.png; cd ../../../; bash refresh.sh; echo 'done'`, (err, stdout, stderr) => {
				if(stderr) {
						console.log(stderr);
				}else{
           console.log(stdout);
				}

    });	
		});

		done();
}


exports.start   = parallel(f);



