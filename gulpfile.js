
var gulp = require('gulp'),
	gutil = require('gulp-util')
	concat = require('gulp-concat'),
	compass = require('gulp-compass'),
	browserify = require('gulp-browserify'),
	path = require('path'),
	connect = require('gulp-connect'),
	uglify = require('gulp-uglify'),
	pump = require('pump');

var jsSources = [
  'javascript/scrolloverflow.min.js',
  'javascript/jquery.fullPage.js'
];

gulp.task('log', function(){ 
	gutil.log('Workflows are awesome');
});

gulp.task('js',function(){
	gulp.src(jsSources)
		.pipe(concat('script.js'))
		.pipe(browserify)
		.pipe(gulp.dest('builds/development/js'))              
});

gulp.task('compass',function(){
	gulp.src('css/sass/styles.scss')
		.pipe(compass({
			config_file: 'css/config.rb',
			css: 'css/stylesheets',
			sass: 'css/sass'
		}))
		.on('error', gutil.log)
		.pipe(gulp.dest('css/stylesheets'))
		.pipe(connect.reload())
});

gulp.task('watch', function(){
	gulp.watch('css/sass/*', ['compass']);
	gulp.watch(['index.html'], ['html']);
});


gulp.task('html', function () {
  gulp.src('*.html')
    .pipe(connect.reload());
});


gulp.task('connect', function(){
	connect.server({
		livereload: true,
		root: '../portfolio',
		debug: true
	})
})

gulp.task('compress', function () {
	return gulp.src(jsSources)
	.pipe(uglify())
	.pipe(concat('uglyjavascript.js'))
	.pipe(gulp.dest('./'))
});

gulp.task('default', ['connect', 'watch'])