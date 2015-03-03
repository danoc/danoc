---
layout: post
title: 'An over-engineered, modern development environment and build system'
date: '2015-03-05T00:00:00.000Z'
---

I'd like to share a thing or two about the build system and development environment I've configured for this blog.

What follows is a description of <s>over engineering a personal website</s> all these technologies and implementation tips.


## Overview

This blog post was written in Markdown and compiled into HTML using Jekyll. gulp uses custom tasks to compile `.less` files into CSS, add vendor prefixes, and minify the files, and combine them into a single file.

gulp also minifies all images, installs front-end dependencies using Bower, runs `jekyll build --drafts` when a post is saved, and uses BrowserSync to serve the website locally.

Assets and posts are watched with gulp and changes appear instantly in the browser without refreshing the page.

This website uses Git for version control, is hosted on GitHub, and is deployed with Capistrano onto a DigitalOcean VPS.

Third party packages are installed locally using NPM, Bundler, and Bower.


## Installing the website locally

You can, theoretically, install the website locally with the following commands:

```bash
$ git clone git@github.com:danoc/danoc.me.git
$ npm install
$ bundle install
$ gulp
```

At this point, gulp will perform a various build tasks and open the website in a browser.


## Using gulp, Jekyll, and BrowserSync

Compiling LESS, concatenating files, and minifying images is easy with gulp. Searching for "gulp minify css" on Google turns up [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css), an NPM package that comes with code samples.

Getting gulp to play well with Jekyll _and_ BrowserSync is a bit harder.

You can take a look at the entire [`gulpfile.js` on GitHub](https://github.com/danoc/danoc.me/blob/master/gulpfile.js), but here are the interesting parts that make these technologies play well together.

### Required BrowserSync and Jekyll dependencies

I require `brower-sync` for, well, BrowserSync and `child_process` to run `jekyll build`.

```js
var browserSync = require('browser-sync');
var childProcess = require('child_process');
```

### Watching Jekyll files in the `default` task

Jekyll files that should trigger a build are stored in a variable called `jekyllPaths`.

```js
var jekyllPaths = ['index.html', '_layouts/*.html', '_posts/*', '_drafts/*'];
```

They are watched using `gulp.watch()` in the `default` task. `default` is normally the first task that runs when you execute `gulp` in the command line, but gulp runs the `browserSync`, `less`, `css`, and `img` tasks first since they are defined as dependencies.

```js
gulp.task('default', ['browserSync', 'less', 'css', 'img'], function() {
  gulp.watch(assets['src']['css'], ['css']);
  gulp.watch(assets['src']['img'], ['img']);
  gulp.watch(assets['src']['less'], ['less']);
  gulp.watch(jekyllPaths, ['jekyllRebuild']);
});
```

### Using BrowserSync in gulp

The `default` task depends on `browserSync`, which looks like this:

```js
// Start BrowserSync to view the website
gulp.task('browserSync', ['jekyllBuild'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});
```

This launches BrowserSync and sets `baseDir: _site`. This option tells BrowserSync to load the files in the `_site` directory. `_site` is where Jekyll outputs the built website.

I use `.pipe(browserSync.reload({stream:true}))` in tasks that I want to trigger a refresh in BrowserSync.

### Building Jekyll with gulp

You'll notice that the `browserSync` task depends on `jekyllBuild`. We use [Node.js's `child_process.spawn()` function](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) to run `jekyll build --drafts`.

```js
// Build the Jekyll website
gulp.task('jekyllBuild', ['img', 'css', 'less'], function(done) {
  return childProcess.spawn('jekyll', ['build', '--drafts'], {stdio: 'inherit'})
    .on('close', done);
});
```

There is a similar task called `jekyllRebuild` that runs when a file in `jekyllPaths` changes. It asks Jekyll to rebuild by listing `jekyllBuild` as a dependency and forces BrowserSync to refresh once the build is complete.

You might notice that the `jekyllBuild` task depends on the `img`, `css`, and `less` tasks. I'm not going to touch on those. Feel free to poke around the entire [`gulpfile.js` on GitHub](https://github.com/danoc/danoc.me/blob/master/gulpfile.js) to learn more.


## Package managers for package managers


## Deploys with a single command


## Server-side configuration


## Files to `.gitignore`


## Additional links and resources

* [BrowserSync configuration options](http://www.browsersync.io/docs/options/)
