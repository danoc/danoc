var gulp = require('gulp');
var path = require('path');

var bower = require('gulp-bower');
var del = require('del');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

// Runs when `gulp` runs
gulp.task('default', ['less', 'css', 'img']);

// Install the bower dependencies
gulp.task('bower', ['clean'], function() {
  bower()
    .pipe(gulp.dest('lib/'))
});

// Delete the existing gulp files
gulp.task('clean', function(cb) {
  del(['public'], cb);
});

// Compile LESS and minify
gulp.task('less', ['bower'], function () {
  gulp.src('./assets/less/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./public/css'));
});

// Minify CSS files
gulp.task('css', ['bower'], function() {
  gulp.src(['./assets/css/*.css', './lib/normalize.css/normalize.css'])
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./public/css'));
});

// Minify image files
gulp.task('img', ['bower'], function() {
  gulp.src('./assets/img/**')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
    }))
    .pipe(gulp.dest('./public/img'));
});
