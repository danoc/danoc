"use strict";

const gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const data = require('gulp-data');
const debug = require('gulp-debug');
const frontMatterGulp = require('gulp-front-matter');
const imagemin = require('gulp-imagemin');
const less = require('gulp-less');
const marked = require('gulp-marked');
const minifyCSS = require('gulp-minify-css');
const moment = require('moment');
const nunjucksRender = require('gulp-nunjucks-render');
const rename = require('gulp-rename');
const wrap = require('gulp-wrap');

const browserSync = require('browser-sync');
const fs = require('fs');
const frontMatter = require('front-matter');
const mergeStream = require('merge-stream');

const site = {
  name: 'Daniel O\'Connor',
  twitter: '_danoc',
  url: 'https://danoc.me/',
  email: 'daniel@danoc.me',
};

const paths = {
  src: {
    'css': ['./src/css/*.css', './node_modules/normalize.css/normalize.css'],
    'html': ['./resume/index.html'],
    'img':  './src/img/**',
    'less': './src/less/*.less',
    'posts': './_posts/*.md',
    'layouts': ['./_layouts/*.html', './index.html'],
  },
  dist: {
    'css':  './dist/css',
    'img':  './dist/img',
    'html': './dist',
  },
};

const FILENAME_DATE_LENGTH = '1970-01-01-'.length;
const DATE_FORMAT = 'DD MMM YYYY';

let generatePostURL = function(fileName) {
  if (!fileName) {
    throw Error('File name must be provided.');
  }

  fileName = fileName.substr(FILENAME_DATE_LENGTH).replace(/\.[^/.]+$/, '');

  return '/blog/' + fileName + '/';
};


let getPosts = function(file, limit) {
  var postsFiles = fs.readdirSync('_posts/');
  var postsData = [];

  limit = limit || null;

  for (var i = 0; i < postsFiles.length; i++) {
    var fileContents = fs.readFileSync('_posts/' + postsFiles[i]).toString();
    var attributes = frontMatter(fileContents).attributes;
    attributes['url'] = generatePostURL(postsFiles[i]);
    attributes['formattedDate'] = moment(attributes['date']).format(DATE_FORMAT);

    postsData.push(attributes);
  }

  return {
    site: site,
    posts: limit ? postsData.reverse().slice(0, limit) : postsData.reverse(),
  };
};


gulp.task('html', () => {
  var index = gulp.src('./index.html')
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('./dist/'));

  var resume = gulp.src('./resume/index.html')
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('./dist/resume/'));

  return mergeStream(index, resume);
});

gulp.task('css', () => {
  return gulp.src(paths['src']['css'])
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(minifyCSS())
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(paths['dist']['css']));
});

gulp.task('less', () => {
  return gulp.src(paths['src']['less'])
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
    }))
    .pipe(minifyCSS())
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(paths['dist']['css']));
});

gulp.task('img', () => {
  return gulp.src(paths['src']['img'])
    .pipe(imagemin())
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(paths['dist']['img']));
});

gulp.task('nunjucks:blog:single', () => {
  return gulp.src(paths['src']['posts'])
    .pipe(frontMatterGulp())
    .pipe(marked())
    .pipe(data((file) => {
      return {
        site: site,
        post: {
          title: file.frontMatter.title,
          deck: file.frontMatter.deck,
          date: file.frontMatter.date,
          dateFormatted: moment(file.frontMatter.date).format(DATE_FORMAT),
          url: generatePostURL(file.relative),
        },
      };
    }))
    .pipe(wrap((data) => {
      return fs.readFileSync('_layouts/post.html').toString();
    }, null, { engine: 'nunjucks' }))
    .pipe(rename((path) => {
      path.basename = generatePostURL(path.basename) + 'index';
    }))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('nunjucks:blog:index', () => {
  return gulp.src('_layouts/posts.html')
    .pipe(data((file) => {
      return getPosts(file);
    }))
    .pipe(nunjucksRender())
    .pipe(rename((path) => {
      path.basename = 'blog/index';
    }))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('nunjucks:index', () => {
  return gulp.src('./index.html')
    .pipe(data((file) => {
      return getPosts(file, 5);
    }))
    .pipe(nunjucksRender())
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('nunjucks', ['nunjucks:index', 'nunjucks:blog:single', 'nunjucks:blog:index']);

gulp.task('watch', ['default'], () => {
  gulp.watch(paths['src']['html'], ['html']);
  gulp.watch(paths['src']['css'], ['css']);
  gulp.watch(paths['src']['img'], ['img']);
  gulp.watch(paths['src']['less'], ['less']);
  gulp.watch(paths['src']['posts'], ['nunjucks']);
  gulp.watch(paths['src']['layouts'], ['nunjucks']);

  browserSync({
    server: {
      baseDir: 'dist',
    },
  });
});

gulp.task('default', ['html', 'less', 'img', 'css', 'nunjucks']);
