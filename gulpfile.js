var path          = require('path');
var exec          = require("child_process").exec;
var gulp          = require("gulp");
var parallel      = gulp.parallel; 
var browserSync   = require("browser-sync").create();
var reload        = browserSync.reload;

const watcher = gulp.watch('./examples/**/statecharts/*.txt');

function f(done) {
 return watcher.on('change', function(path, stats) {
      let a     = path.replace(/examples\//,'' ); 
      let b     = a.replace(/statecharts\//,'' ); 
      let c     = b.replace(/\/.*/,'' );
   	  let pathL = `./examples/${c}/graph/*.js`;
				
       exec(`node ${pathL};  `, (error, stdout, stderr) => {
         if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
          if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
          }
          console.log(`stdout: ${stdout}`);
          console.log(`done:     done`);
      });
    done();
  });
}


function serve(done)  {
		browserSync.init({
				watch: true,
        server: './examples/currentExample/' 
    });
		done();
};		

exports.default = parallel(f, serve);



