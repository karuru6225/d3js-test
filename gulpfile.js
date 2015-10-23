var connect = require("gulp-connect");
var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require('gulp-plumber');

gulp.task("server", function(){
	connect.server({
		root: [__dirname + '/pub'],
		port: 8000,
		livereload: true
	});
});

gulp.task("reload", function(){
	gulp.src(['./*.html','pub/js/**/*.js'])
		.pipe(connect.reload())
});

gulp.task("sass", function(){
	gulp.src("./scss/*.scss")
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest("./pub/css"))
		.pipe(connect.reload())
});

gulp.task("default",['server'], function(){
	gulp.watch(["pub/js/**/*.js","**/*.html"],['reload']);
	gulp.watch("scss/**/*.scss",["sass"]);
});
