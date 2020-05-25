var gulp = require("gulp");
var browserSync = require("browser-sync").create();

gulp.task("graph", function() {
  browserSync.init({ watch: true, server: "./examples/counter/graph/" });
});

