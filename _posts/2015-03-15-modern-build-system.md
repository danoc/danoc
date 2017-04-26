---
layout: post
title: An over-engineered, modern development environment and build system
description: How to integrate Jekyll with tools like gulp and deploy in a single command using Capistrano.
date: '2015-03-15T20:50:40.000Z'
---

I'd like to share a thing or two about the build system and development environment I've configured for this blog.

What follows is a description of <s>over engineering a personal website</s> all these technologies and implementation tips.


## Overview

This blog post was written in [Markdown](http://daringfireball.net/projects/markdown/) and compiled into HTML using [Jekyll](http://jekyllrb.com/). [gulp](http://gulpjs.com/) uses custom tasks to compile [`.less` files](http://lesscss.org/) into CSS, add vendor prefixes, and minify the files.

gulp also minifies all images, installs front-end dependencies using Bower, runs `jekyll build --drafts` when a post is saved, and uses [BrowserSync](http://www.browsersync.io/) to serve the website locally.

Assets and posts are watched with gulp and changes appear instantly in the browser without refreshing the page.

This website uses [Git](http://git-scm.com/) for version control, is hosted on [GitHub](https://github.com/), and is deployed with [Capistrano](http://capistranorb.com/) onto a [DigitalOcean VPS](https://www.digitalocean.com/).

Third party packages are installed locally using [NPM](https://www.npmjs.com/), [Bundler](http://bundler.io/), and [Bower](http://bower.io/).

You can see the [view the source of this blog post](https://github.com/danoc/danoc.me/blob/master/_posts/2015-03-15-modern-build-system.md) on GitHub.


## Installing the website locally

You can install this website locally with the following commands:

```bash
$ git clone git@github.com:danoc/danoc.me.git && cd danoc.me
$ npm install
$ bundle install
$ ./node_modules/.bin/gulp
```

(These commands require Git, NPM, and Bundler to be installed beforehand.)

At this point, gulp will perform a various build tasks and open the website in a browser.

I've installed gulp globally on my machine using `npm install --global gulp` so I can run `gulp` without typing the long path in the example above.


## Using gulp, Jekyll, and BrowserSync

Compiling LESS, concatenating files, and minifying images is easy with gulp. Searching for "gulp minify css" on Google turns up [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css), an NPM package that comes with code samples.

Getting gulp to play well with Jekyll _and_ BrowserSync is a bit harder.

You can take a look at the entire [`gulpfile.js` on GitHub](https://github.com/danoc/danoc.me/blob/master/gulpfile.js), but I'll explain the interesting parts that make these technologies play well together.

### Required BrowserSync and Jekyll dependencies

I require `brower-sync` for, well, BrowserSync, and `yargs` plus `child_process` to run `jekyll build`.

```js
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var childProcess = require('child_process');
```

### Watching Jekyll files in the `default` task

Jekyll files that should trigger a rebuild when modified are stored in a variable called `jekyllPaths`.

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

You'll notice that the `browserSync` task depends on `jekyllBuild`. We use [Node.js's `child_process.spawn()` function](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options) to run `jekyll build`. If the `--type production` flag is not provided, draft posts are also published. (More about this flag on the Capistrano section.)

```js
// Build the Jekyll website
gulp.task('jekyllBuild', ['img', 'css', 'less'], function(done) {
  var args = ['build'];

  if (!isProduction) {
    args.push('--drafts');
  }

  return childProcess.spawn('jekyll', args)
    .on('close', done);
});
```

There is a similar task called `jekyllRebuild` that runs when a file in `jekyllPaths` changes. It asks Jekyll to rebuild by listing `jekyllBuild` as a dependency and forces BrowserSync to refresh once the build is complete.

You might notice that the `jekyllBuild` task depends on the `img`, `css`, and `less` tasks. I'm not going to touch on those because there are tons of existing resources online. Feel free to poke around the entire [`gulpfile.js` on GitHub](https://github.com/danoc/danoc.me/blob/master/gulpfile.js) to learn more.


## Using Bundler and NPM and Bower

This website uses three package managers: Bundler, NPM, and Bower. Bundler is used to manage Ruby gems, NPM manages Node.js programs, and Bower manages front-end frameworks and libraries.

I [currently use Bundler](https://github.com/danoc/danoc.me/blob/master/Gemfile) to install Capistrano, Jekyll and Rogue, [NPM to install](https://github.com/danoc/danoc.me/blob/master/package.json) BrowserSync, Gulp, a bunch of Gulp dependencies, and even install Bower. Currently [I only use Bower](https://github.com/danoc/danoc.me/blob/master/bower.json) to download [Normalize.css](https://github.com/necolas/normalize.css/).


## Deploying Jekyll with Capistrano

Deploys are incredibly easy and done with one command: `cap production deploy`.

Behind the scenes, Capistrano grabs the latest code from GitHub, creates a release folder, runs a few custom commands, then changes a symlink to the newest release folder if the deploy went smoothly.

[The entire `deploy.rb` file](https://github.com/danoc/danoc.me/blob/master/config/deploy.rb) looks like this:

```ruby
# config valid only for current version of Capistrano
lock '3.3.5'

set :application, 'danoc.me'
set :repo_url, 'git@github.com:danoc/danoc.me.git'

set :log_level, :info

namespace :deploy do

  before :publishing, :build do
    on roles(:all) do
      execute "cd #{release_path} && sudo bundle install"
      execute "cd #{release_path} && npm install --production --silent --no-spin"
      execute "cd #{release_path} && ./node_modules/.bin/gulp jekyllBuild --type production"
    end
  end

end
```

The first two `execute` lines install dependencies listed in the [`Gemfile`](https://github.com/danoc/danoc.me/blob/master/Gemfile) and [`package.json`](https://github.com/danoc/danoc.me/blob/master/package.json) files. The third line runs gulp, but only the `jekyllBuild` task in the [`gulpfile.js`](https://github.com/danoc/danoc.me/blob/master/gulpfile.js) which depends on the `css`, `less`, and `img` tasks. It does not watch files or launch BrowserSync as I do locally. The `--type production` flag tells gulp not to compile the draft posts.

Capistrano also requires a `production.rb` file. [Mine is one line](https://github.com/danoc/danoc.me/blob/master/config/deploy/production.rb) and looks like this:

```ruby
server 'danoc.me', user: 'daniel'
```

## Server-side configuration

Capistrano creates a release folder such as `20150301070052` in `/var/www/danoc.me/releases`, installs dependencies, and builds Jekyll. If the deploy works, it symlinks `/var/www/danoc.me/current` to the latest release.

I use Apache on my Digital Ocean VPS and point the danoc.me `DocumentRoot` to `/var/www/danoc.me/current/_site/`. This path is always the location of the Jekyll build from the most recent deploy.

Two things to note: Capistrano is able to run `sudo bundle install` without password prompts because of [passwordless sudo](http://capistranorb.com/documentation/getting-started/authentication-and-authorisation/#authorisation). Also, the `bundle` and `npm` tasks each have their own depencies and must be installed on the server.


## Files to `.gitignore`

This complex build system creates many files and directories that should be ignored in Git.

These are some of the types of files and directories I ignore:

* Complied "dist" files &mdash; This includes the `_site/` directory Jekyll generates and any CSS, JavaScript, or image files that gulp produces. This is a good practice because these compiled files clutter the repository, can lead to complicated merge conflicts, and are not necessary since we run gulp on the server.
* Dependencies &mdash; I install dependencies with NPM, Bower, and Bundler on both the client and server so there is no need to check in these dependencies.
* System and editor files such as the infamous `.DS_Store`.

[Most of my `.gitignore`](https://github.com/danoc/danoc.me/blob/master/.gitignore) comes from [gitignore.io](https://www.gitignore.io/), a website that creates customized `.gitignore` files.


## Conclusion

This system is terribly complicated and over-engineered for a blog and portfolio that get nearly no traffic.

That said, configuring a seamless build system and development environment can be a great learning experience and incredibly rewarding.

**Want to do this at a larger scale?** [Optimizely is always hiring](http://grnh.se/q6p0dk)!
