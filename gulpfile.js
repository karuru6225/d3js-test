var connect = require('gulp-connect');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');

gulp.task('server', function(){
	connect.server({
		root: [__dirname + '/pub'],
		port: 8000,
		livereload: true
	});
});

gulp.task('reload', function(){
	gulp.src(['./*.html', './pub/js/**/*.js'])
		.pipe(connect.reload())
});

gulp.task('sass', function(){
	gulp.src('./scss/*.scss')
		.pipe(plumber())
		//.pipe(sourcemaps.init())
		.pipe(sass({outputStyle:'compressed'}))
		//.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./pub/css'))
		.pipe(connect.reload())
});

gulp.task('uglify', function(){
	gulp.src(['./pub/js/**/*.js','!./pub/js/min/**/*.js','!./pub/js/vendor/**/*.js'])
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(rename({extname:'.min.js'}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./pub/js/min'))
		.pipe(connect.reload())
});

gulp.task('default',['server'], function(){
	gulp.watch('./pub/**/*.html', { interval: 500 }, ['reload']);
	gulp.watch('./scss/**/*.scss', { interval: 500 }, ['sass']);
	gulp.watch([
			'./pub/js/**/*.js',
			'!./pub/js/min/**/*.js',
			'!./pub/js/vendor/**/*.js'
		],
		{ interval: 500 }, ['uglify']);
});
