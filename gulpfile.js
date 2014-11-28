var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('default', function() {});

var bower = require('gulp-bower');

gulp.task('bower', function() {
  return bower()
  .pipe(gulp.dest('lib/'))
});

gulp.task('less', function () {
  gulp.src('./assets/less/*.less')
  .pipe(less({
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .pipe(gulp.dest('./public/css'));
});
