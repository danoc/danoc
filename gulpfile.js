var gulp = require('gulp');

var args = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');
var browserSync = require('browser-sync');
var childProcess = require('child_process');
var del = require('del');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');

var isProduction = args.type === 'production';

var assets = {
  src: {
    'css': ['./src/css/*.css', './lib/normalize.css/normalize.css'],
    'img':  './src/img/**',
    'less': './src/less/*.less'
  },
  dist: {
    'css':  './_site/public/css',
    'img':  './_site/public/img',
    'less': './_site/public/less'
  }
};

var jekyllPaths = ['index.html', '_layouts/*.html', '_posts/*', '_drafts/*'];


/*=========================*/
/*=== Gulp Default Task ===*/
/*=========================*/

// Runs when `gulp` runs
gulp.task('default', ['browserSync', 'less', 'css', 'img'], function() {
  gulp.watch(assets['src']['css'], ['css']);
  gulp.watch(assets['src']['img'], ['img']);
  gulp.watch(assets['src']['less'], ['less']);
  gulp.watch(jekyllPaths, ['jekyllRebuild']);
});


/*==========================*/
/*=== Package Management ===*/
/*==========================*/

// Install the bower dependencies
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('lib/'))
});


/*==============*/
/*=== Assets ===*/
/*==============*/

// Delete the existing gulp files
gulp.task('clean', function(cb) {
  return del(['_site'], cb);
});

// Compile LESS and minify
gulp.task('less', ['bower'], function(event) {
  return gulp.src(assets['src']['less'])
    .pipe(less().on('error', function(state) {
      console.error(state);
      browserSync.notify(state.message, 3000);
      this.end();
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(assets['dist']['css']));
});

// Minify CSS files
gulp.task('css', ['bower'], function(event) {
  return gulp.src(assets['src']['css'])
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(assets['dist']['css']));
});

// Minify image files
gulp.task('img', ['bower'], function(event) {
  return gulp.src(assets['src']['img'])
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
    }))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest(assets['dist']['img']));
});


/*===================*/
/*=== browserSync ===*/
/*===================*/

// Start BrowserSync to view the website
gulp.task('browserSync', ['jekyllBuild'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});


/*==============*/
/*=== Jekyll ===*/
/*==============*/

// Build the Jekyll website
gulp.task('jekyllBuild', ['img', 'css', 'less'], function(done) {
  var args = ['build'];

  if (!isProduction) {
    args.push('--drafts');
  }

  return childProcess.exec('bundle exec jekyll', args)
    .on('close', done)
    .on('error', function(e) {
      console.log(e);
    });
});

// Rebuild the Jekyll website
gulp.task('jekyllRebuild', ['jekyllBuild'], function() {
  browserSync.reload();
});
